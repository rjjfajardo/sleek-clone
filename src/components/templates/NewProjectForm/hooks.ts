import { useForm, useWatch } from "react-hook-form";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import type { FileWithPath } from "react-dropzone";
import { Project, ProjectAssignee, User } from "@prisma/client";
import { useRouter } from "next/router";
import { File } from "buffer";

const schema = yup.object().shape({
  title: yup.string().required(),
  procuringEntity: yup.string().required(),
  referenceNumber: yup.string().required(),
  areaOfDelivery: yup.string().required(),
  approvedBudgetContract: yup.number().required(),
  procurementMode: yup.string().required(),
  contractDuration: yup.string().required(),
  priority: yup.string().required(),
  assignee: yup.array().of(yup.string().required("Assignee/s is required")),
});

interface FileType {
  file: string;
  fileType: string;
}

export const useHooks = () => {
  const router = useRouter();
  const session = useSession();
  const { data: users }: { data?: User[] } = useSWR("/user");
  const [files, setFiles] = useState<FileType[]>([]);
  const [uploading, setUploading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<Project & { assignee: ProjectAssignee[] }>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onSubmit",
  });

  const createProject = async (
    data: Project & { assignee: ProjectAssignee[] }
  ) => {
    await axios
      .post("/api/project", {
        ...data,
        assignee: [...data.assignee, session.data?.user.id],
        files,
        userId: session.data?.user.id,
      })
      .then((res) => {
        console.log(res);
        reset();
        router.push("/projects");
      });
  };

  return {
    control,
    onSubmit: handleSubmit(createProject),
    errors,
    files,
    users,
  };
};
