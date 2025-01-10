import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const HealthBar = () => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(50);
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="border p-5">
      <div className="relative flex items-center justify-center rounded-2xl">
        <CircularProgress
          variant="determinate"
          size={300}
          value={progress}
          sx={{
            color: "secondary",
            border: "1px solid #D1D5DB",
            borderRadius: "50%",
          }}
          thickness={5}
        />
        <div className="absolute flex flex-col items-center text-neutral-800">
          <span className="text-xl font-bold">System Health</span>
          <span className="text-2xl font-semibold">{progress}%</span>
        </div>
      </div>
      <Button
        sx={{
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
