import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

// interface SessionI
//   extends Pick<
//     Session,
//     | "role"
//     | "contactNumber"
//     | "createdAt"
//     | "deletedAt"
//     | "dob"
//     | "email"
//     | "expires"
//     | "fullName"
//   > {}

export const useHooks = () => {
  const session = useSession();

  return {
    session,
  };
};
