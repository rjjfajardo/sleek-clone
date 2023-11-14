import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { mutate } from "swr";

import { useSession } from "next-auth/react";

export const useHooks = ({ projectId }: { projectId: string }) => {
  const session = useSession();

  const schema = yup.object().shape({
    text: yup.string().required(),
  });
  const { control, handleSubmit, getValues, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitComment = async () => {
    const text = getValues("text");

    await axios
      .post("/api/comment", {
        userId: session.data?.user.id,
        text,
        projectId,
      })
      .then(() => {
        mutate(`/project/${projectId}`);
        reset();
      });
  };

  return {
    control,
    session,
    onSubmit: handleSubmit(handleSubmitComment),
  };
};
