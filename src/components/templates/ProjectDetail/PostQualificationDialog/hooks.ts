import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { PostQualificationProps } from ".";

interface HookProps
  extends Pick<
    PostQualificationProps,
    "handleClose" | "projectId" | "status"
  > {}

const schema = yup.object().shape({
  result: yup.string().required(),
  remakrs: yup.string().required(),
});

interface FormValues {
  result: string;
  remarks: string;
}

export const useHooks = ({ handleClose, projectId, status }: HookProps) => {
  const session = useSession();

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { control, reset, getValues } = formMethods;

  const handleResetAndClose = () => {
    reset();
    handleClose();
  };

  const updateProjectPhase = async () => {
    const remarks = getValues("remarks");
    const result = getValues("result");

    await axios
      .put(`/api/project/${projectId}`, {
        remarks,
        result,
        status,
        projectId,
        userId: session.data?.user.id,
      })
      .then(() => {
        handleResetAndClose();
        mutate(`/project/${projectId}`);
      });
  };

  return {
    control,
    formMethods,
    handleResetAndClose,
    onSubmit: updateProjectPhase,
  };
};
