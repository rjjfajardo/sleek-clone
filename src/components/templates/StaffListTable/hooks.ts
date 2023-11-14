import { User } from "@prisma/client";
import useSWR from "swr";

export interface UserWithProjectAssignee extends User {
  projectAssignee: {
    id: string;
  }[];
}

export const useHooks = () => {
  const { data }: { data?: UserWithProjectAssignee[] } = useSWR("/user");

  const users = data?.length ? data : [];

  return {
    users,
  };
};
