import { getSession, useSession } from "next-auth/react";

import useSWR from "swr";

export interface AssignProjectWithAssignee {
  user: {
    fullName: string;
  };
  project: {
    id: number;
    title: string;
    priority: string;
    referenceNumber: string;
    status: string;
    projectAssignee: {
      user: {
        fullName: string;
      };
    }[];
  };
}

export const useHooks = () => {
  const { data: projects }: { data: AssignProjectWithAssignee[] | undefined } =
    useSWR("/project-assignee");
  const { data: user, status } = useSession();

  return {
    user,
    status,
    projects,
    getSession,
  };
};
