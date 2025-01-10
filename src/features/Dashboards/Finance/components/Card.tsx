import { Button } from "@mui/material";

interface CardProps {
  amount: number;
  desc: string;
  icon: string;
  style: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  amount,
  icon,
  desc,
  style,
  onClick,
}) => {
  return (
    <div
      className={`w-full h-auto lg:h-[12rem] shadow-xl ${style} text-white border p-6 md:p-8 rounded-xl flex items-center justify-between gap-6 lg:gap-10 relative`}
    >
      <div className="space-y-2 w-full">
        <div className="flex items-center gap-2">
          <p className="text-4xl font-bold">{amount}</p>
        </div>
        <p className="text-xl font-medium">{desc}</p>
      </div>
      <div className="border rounded-full p-5">
        <img src={icon} alt="" className="w-20 object-cover" />
      </div>
      <Button
        sx={{
          position: "absolute",
          bottom: "5px",
          right: "1rem",
          color: "white",
          ":hover": {
            color: "gray",
          },
        }}
        onClick={onClick}
      >
        Detail
      </Button>
    </div>
  );
};
