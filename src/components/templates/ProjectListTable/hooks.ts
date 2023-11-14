import useSWR from "swr";
import { useRouter } from "next/router";
import { ProjectListTableProps } from ".";

interface useHooksProps extends Pick<ProjectListTableProps, "searchValue"> {}

export type FindAllProject = {
  id: string;
  title: string;
  //   procuringEntity: string;
  referenceNumber: string;
  //   areaOfDelivery: string;
  approvedBudgetContract: number;
  //   procurementMode: string;
  //   contractDuration: string;
  priority: string;
  projectAssignee: {
    user: {
      userId: string;
      fullName: string;
      image: string;
    };
  }[];
};

export const useHooks = ({ searchValue }: useHooksProps) => {
  const router = useRouter();
  const { data }: { data: FindAllProject[] | undefined } = useSWR(
    searchValue ? `/project${searchValue}` : "/project"
  );

  return { rows: data, router };
};
