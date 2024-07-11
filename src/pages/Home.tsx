import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Divider, Grid, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

export default function Home() {
  const dataset = [
    [59, 57, 86, 21, "Jan"],
    [50, 52, 78, 28, "Fev"],
    [47, 53, 106, 41, "Mar"],
    [54, 56, 92, 73, "Apr"],
    [57, 69, 92, 99, "May"],
    [60, 63, 103, 144, "June"],
    [59, 60, 105, 319, "July"],
    [65, 60, 106, 249, "Aug"],
    [51, 51, 95, 131, "Sept"],
    [60, 65, 97, 55, "Oct"],
    [67, 64, 76, 48, "Nov"],
    [61, 70, 103, 25, "Dec"],
  ].map(([london, paris, newYork, seoul, month]) => ({
    london,
    paris,
    newYork,
    seoul,
    month,
  }));

  const valueFormatter = (value: number | null) => `${value}mm`;

  const chartSetting = {
    series: [{ dataKey: "seoul", label: "Users", valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="h-screen -z-50">
      <Typography variant="h4" sx={{ fontWeight: "bold", my: 4, zIndex: -1 }}>
        Dashboard
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BarChart
            colors={["#F58634", "#3E4095", "#F58634"]}
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={isXs ? 300 : isSm ? 400 : isMd ? 450 : 500}
            height={isXs ? 200 : isSm ? 250 : isMd ? 280 : 300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChart
            colors={["#F58634", "#3E4095", "#F58634"]}
            dataset={dataset}
            {...chartSetting}
            width={isXs ? 300 : isSm ? 400 : isMd ? 450 : 500}
            height={isXs ? 200 : isSm ? 250 : isMd ? 280 : 300}
            slotProps={{
              bar: {
                clipPath: `inset(0px round 10px 10px 0px 0px)`,
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
