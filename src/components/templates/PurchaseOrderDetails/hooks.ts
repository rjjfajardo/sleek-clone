import { useSnackbar } from "@/hooks/useSnackbar";
import axios from "@/lib/axios";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Project, PurchaseOrder, PurchaseOrderMedia } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useSWR, { mutate } from "swr";

interface FormValues extends Partial<PurchaseOrder> {}

interface PurchaseOrderI extends FormValues {
  project: Project;
  purchaseOrderMedia: PurchaseOrderMedia[];
}

const schema = yup.object().shape({
  purchaseOrderNumber: yup.string().required(),
  status: yup.string().required(),
  deliveredAt: yup.string().required(),
});

export interface FileUploadI {
  fileName: string | undefined;
  fileUrl: string | undefined;
}
[];

export const useHooks = () => {
  const router = useRouter();

  const { purchaseOrderId } = router.query;

  const { data: order }: { data: PurchaseOrderI | undefined } = useSWR(
    `/order-management/${purchaseOrderId}`
  );

  const [files, setFiles] = useState<FileUploadI[]>([]);
  const [fileToPreview, setFileToPreview] = useState<FileUploadI | undefined>();
  const [uploadFileProgress, setUploadFileProgess] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { setSnackbarProps } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      deliveredAt: new Date(),
    },
  });

  useEffect(() => {
    reset({
      purchaseOrderNumber: order?.purchaseOrderNumber || "",
      status: order?.status,
    });

    if (order?.purchaseOrderMedia.length) {
      setFiles(
        order?.purchaseOrderMedia.map((file) => ({
          fileName: file.fileName,
          fileUrl: file.fileUrl,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const watchStatus = useWatch({ control, name: "status" });

  const editPurchaseOrder = async (values: FormValues) => {
    console.log(values);
    try {
      await axios({
        method: "PUT",
        url: `/api/order-management/${purchaseOrderId}`,
        data: {
          values,
          files,
        },
      }).then((res) => {
        setSnackbarProps({
          open: true,
          message: "Update was successful",
          severity: "success",
        });
        mutate(`order-management/${purchaseOrderId}`);
      });
    } catch (e) {
      setSnackbarProps({
        open: true,
        message: "Failed to update",
        severity: "error",
      });
      console.error(e);
    }
  };

  return {
    order,
    control,
    onSubmit: handleSubmit(editPurchaseOrder),
    setFiles,
    files,
    isDirty,
    fileToPreview,
    setFileToPreview,
    uploadFileProgress,
    setUploadFileProgess,
    isUploading,
    setIsUploading,
    watchStatus,
  };
};
