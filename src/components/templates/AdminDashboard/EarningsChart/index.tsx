import { BarChart } from "@mui/x-charts";
import { useHooks } from "./hooks";

const EarningChart = ({ seriesData }: { seriesData: number[] }) => {
  const { xLabels } = useHooks();

  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: xLabels,
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: seriesData,
        },
      ]}
      sx={{
        width: "100%",
        height: "400px",
        ".css-1vuxth3-MuiBarElement-root": {
          fill: "#246bfd",
        },
      }}
    />
  );
};

export default EarningChart;
