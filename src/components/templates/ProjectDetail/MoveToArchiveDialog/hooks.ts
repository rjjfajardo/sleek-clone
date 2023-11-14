import axios from "axios";
import { useSession } from "next-auth/react";
import { mutate } from "swr";
import { MoveToArchiveProps } from ".";
import { useRouter } from "next/router";

interface HookProps
  extends Pick<MoveToArchiveProps, "handleClose" | "projectId"> {}

export const useHooks = ({ handleClose, projectId }: HookProps) => {
  const router = useRouter();
  const handleResetAndClose = () => {
    handleClose();
  };

  const moveProjectToArchive = async () => {
    await axios.delete(`/api/project/${projectId}`).then(() => {
      handleResetAndClose();
      router.push("/projects");
    });
  };

  return {
    handleResetAndClose,
    onSubmit: moveProjectToArchive,
  };
};
