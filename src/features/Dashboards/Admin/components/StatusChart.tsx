import { Button } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

const StatusChart = () => {
  const [series] = React.useState([14, 23, 21, 17]);

  const [options] = React.useState({
    chart: {
      type: "polarArea" as const,
    },
    labels: series.map((value, index) => {
      const labelNames = ["Total", "Online", "Active", "Inactive"];
      return `${labelNames[index]}: ${value}`;
    }),
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      y: {
        formatter: (val: number, { seriesIndex }: { seriesIndex: number }) => {
          const labelNames = ["Total", "Online", "Active", "Inactive"];
          return `${labelNames[seriesIndex]}: ${val}`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 50,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  return (
    <div className="w-[30rem] border p-5">
      <div id="chart">
        <ReactApexChart options={options} series={series} type="polarArea" />
      </div>
      <Button
        sx={{
          mt: 2,
          width: "100%",
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
        }}
      >
        Detail
      </Button>
    </div>
  );
};

export default StatusChart;
