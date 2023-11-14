import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export const useHooks = () => {
  const router = useRouter();
  const session = useSession();
  const { control } = useForm();

  return {
    control,
    session,
    router,
  };
};
