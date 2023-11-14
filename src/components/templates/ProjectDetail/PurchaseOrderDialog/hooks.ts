import { useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { PurchaseOrderProps } from ".";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface HookProps
  extends Pick<PurchaseOrderProps, "handleClose" | "status" | "projectId"> {}

const schema = yup.object().shape({
  purchaseOrderNumber: yup.string().required(),
});

export const useHooks = ({ handleClose, projectId, status }: HookProps) => {
  const [file, setFile] = useState<{
    fileName: string | undefined;
    fileUrl: string | undefined;
  }>();

  const { control, reset, getValues } = useForm<{
    purchaseOrderNumber: string;
  }>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleResetAndClose = () => {
    reset();
    handleClose();
  };

  const session = useSession();

  const updateProjectPhase = async () => {
    const purchaseOrderNumber = getValues("purchaseOrderNumber");

    await axios
      .put(`/api/project/${projectId}`, {
        status,
        projectId,
        userId: session.data?.user.id,
        file: file,
        purchaseOrderNumber,
      })
      .then(() => {
        handleResetAndClose();
        mutate(`/project/${projectId}`);
      });
  };

  return {
    control,
    handleResetAndClose,
    file,
    setFile,
    onSubmit: updateProjectPhase,
  };
};
