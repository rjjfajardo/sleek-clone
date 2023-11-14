import { PurchaseOrder } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

export interface PurchaseOrders extends PurchaseOrder {}

export const useHooks = () => {
  const router = useRouter();
  const { data, isLoading }: { data?: PurchaseOrders[]; isLoading: boolean } =
    useSWR("/order-management");

  const orders = data?.length ? data : [];

  return {
    orders,
    router,
    isLoading,
  };
};
