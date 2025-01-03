interface CardProps {
  amount: number;
  desc: string;
  icon: string;
  style: string;
  applicant: string;
}

export const Card: React.FC<CardProps> = ({
  amount,
  icon,
  desc,
  style,
  applicant,
}) => {
  return (
    <div
      className={`w-full h-auto lg:h-[12rem] shadow-xl ${style} text-white border p-6 md:p-8 rounded-xl flex items-center justify-between gap-6 lg:gap-10`}
    >
      <div className="space-y-2 w-full">
        <div className="flex items-center gap-2">
          <p className="text-4xl font-bold">
            {amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <p className="text-xl font-medium">
          {desc} <span className="text-sm">{applicant}</span>
        </p>
      </div>
      <div className="border rounded-full p-5">
        <img src={icon} alt="" className="w-20 object-cover" />
      </div>
    </div>
  );
};
