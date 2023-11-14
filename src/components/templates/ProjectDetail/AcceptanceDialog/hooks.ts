import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AcceptanceProps } from ".";
import { useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import { useSession } from "next-auth/react";

interface HookProps
  extends Pick<AcceptanceProps, "handleClose" | "status" | "projectId"> {}

const schema = yup.object().shape({
  // status: yup.string().required(),
  dateOfSignature: yup.string().required(),
});

export const useHooks = ({ handleClose, projectId, status }: HookProps) => {
  const [file, setFile] = useState<{
    fileName: string | undefined;
    fileUrl: string | undefined;
  }>();
  const { control, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const session = useSession();

  const handleResetAndClose = () => {
    reset();
    handleClose();
  };

  const updateProjectPhase = async () => {
    await axios
      .put(`/api/project/${projectId}`, {
        status,
        projectId,
        userId: session.data?.user.id,
        file: file,
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
