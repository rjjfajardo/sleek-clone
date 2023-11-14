import { PurchaseOrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";

export interface FindOneProject {
  title: string;
  procuringEntity: string;
  referenceNumber: string;
  areaOfDelivery: string;
  approvedBudgetContract: number;
  procurementMode: string;
  contractDuration: string;
  priority: string;
  status: string;
  updatedAt: Date;
  postQualificationResult: {
    result: string;
    dq_remarks: string;
  };
  media: {
    fileName: string;
    fileUrl: string;
    origin: string;
  }[];
  comment: {
    user: {
      fullName: string;
    };
    createdAt: string;
    text: string;
  }[];
  activityLog: {
    user: {
      fullName: string;
    };
    after: {
      values: {
        message: string;
        info?: string;
      }[];
    };
    createdAt: string;
  }[];
  purchaseOrder: {
    status: PurchaseOrderStatus;
    id: string;
    deliveredAt: Date;
  };
}

export const useHooks = (projectId: string) => {
  const session = useSession();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openMoveToArchiveDialog, setOpenMoveToArchiveDialog] =
    useState<boolean>(false);
  const {
    data,
    isLoading,
  }: { data: FindOneProject | undefined; isLoading: boolean } = useSWR(
    `/project/${projectId}`
  );

  const handeClose = () => {
    setOpenMoveToArchiveDialog(false);
  };

  const statuses = [
    "Purchase Order",
    "Notice To Proceed",
    "Post Qualification",
    "Acceptance",
    "Collection of Receipt",
  ];

  return {
    session,
    data,
    isEditing,
    setIsEditing,
    isLoading,
    handeClose,
    openMoveToArchiveDialog,
    setOpenMoveToArchiveDialog,
    statuses,
  };
};
