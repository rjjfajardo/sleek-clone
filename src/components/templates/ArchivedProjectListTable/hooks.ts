import useSWR from "swr";
import { useRouter } from "next/router";

export type FindAllProject = {
  id: string;
  title: string;
  //   procuringEntity: string;
  referenceNumber: string;
  //   areaOfDelivery: string;
  approvedBudgetContract: number;
  //   procurementMode: string;
  //   contractDuration: string;
  deletedAt: Date;
  priority: string;
  projectAssignee: {
    user: {
      userId: string;
      fullName: string;
      image: string;
    };
  }[];
};

export const useHooks = () => {
  const router = useRouter();
  const { data }: { data: FindAllProject[] | undefined } =
    useSWR("/project/archive");

  return { rows: data, router };
};
