import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Project } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

export interface FormValues extends Project {}

const schema = yup.object().shape({
  title: yup.string().required(),
  procuringEntity: yup.string().required(),
  referenceNumber: yup.string().required(),
  areaOfDelivery: yup.string().required(),
  approvedBudgetContract: yup.number().required(),
  procurementMode: yup.string().required(),
  contractDuration: yup.string().required(),
  priority: yup.string().required(),
});

interface UserFindAll {
  userId: string;
  fullName: string;
}

export const useHooks = ({
  projectId,
  setEditing,
}: {
  projectId: string;
  setEditing: () => void;
}) => {
  const session = useSession();
  const { data: project }: { data: Project | undefined } = useSWR(
    `/project/${projectId}`
  );

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Project>({
    defaultValues: {
      title: project?.title,
      procuringEntity: project?.procuringEntity,
      referenceNumber: project?.referenceNumber,
      areaOfDelivery: project?.areaOfDelivery,
      approvedBudgetContract: project?.approvedBudgetContract,
      contractDuration: project?.contractDuration,
      procurementMode: project?.procurementMode,
      priority: project?.priority,
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onSubmit",
  });

  const updateProject = async (data: FormValues) => {
    await axios
      .put(`/api/project/${projectId}`, {
        ...data,
        userId: session.data?.user.id,
      })
      .then(() => {
        mutate(`/project/${projectId}`);
        reset();
        setEditing();
      });
  };

  return {
    control,
    onSubmit: handleSubmit(updateProject),
  };
};
