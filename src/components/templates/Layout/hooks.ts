import { useSession, signOut } from "next-auth/react";

export const useHooks = () => {
  const { data: user, status } = useSession();

  return {
    user,
    signOut,
    status,
  };
};
