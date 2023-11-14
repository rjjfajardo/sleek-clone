import { useRouter } from "next/router";

export const useHooks = () => {
  const router = useRouter();

  const projectId = String(router.query.projectId);

  return {
    projectId,
  };
};
