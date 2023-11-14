import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Metrics, Project } from "@prisma/client";
import { format } from "date-fns";
import { useForm, useWatch } from "react-hook-form";
import useSWR from "swr";

const schema = yup.object().shape({
  dateFilter: yup.string().optional(),
});

interface FormValues {
  dateFilter?: string;
}

interface MetricsProps {
  metrics: Metrics[];
  projects: Project[];
}

export const useHooks = () => {
  const { control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      dateFilter: format(new Date(), "yyyy"),
    },
  });

  const xLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const watchDateFilter = useWatch({ control, name: "dateFilter" });

  const {
    data,
    isLoading,
  }: { data: MetricsProps | undefined; isLoading: boolean } = useSWR(
    `/dashboard?earningsFilter=${watchDateFilter}`
  );

  const seriesData = xLabels.map((label) => {
    const matchingData = data?.metrics.filter((item) => item.month === label);

    if (matchingData && matchingData.length > 0) {
      return matchingData.reduce(
        (total, item) => total + Number(item.totalEarnings),
        0
      );
    } else {
      return 0;
    }
  });

  const totalEarnings =
    data?.metrics.reduce(
      (total, item) => total + Number(item.totalEarnings),
      0
    ) || 0;

  return {
    seriesData,
    control,
    getRandomColor,
    isLoading,
    totalEarnings,
    data,
  };
};
