interface CardProps {
  header: string;
  currency: string;
  amount: number;
  desc: string;
  icon: string;
  style: string;
}

export const Card: React.FC<CardProps> = ({
  header,
  currency,
  amount,
  icon,
  desc,
  style,
}) => {
  return (
    <div
      className={`w-full h-auto lg:h-[12rem] shadow-xl ${style} text-white border p-6 md:p-8 rounded-xl flex items-center justify-between gap-6 lg:gap-10`}
    >
      <div className="space-y-2 w-full">
        <h1 className="text-lg font-medium">{header}</h1>
        <div className="flex items-center gap-2">
          <p className=" text-4xl font-extrabold">{currency}</p>
          <p className="text-2xl font-bold">
            {amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <p className="text-md font-medium">{desc}</p>
      </div>
      <div>
        <img src={icon} alt="" className="w-20 object-cover" />
      </div>
    </div>
  );
};
