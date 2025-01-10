interface CardProps {
  header: string;
  amount: number;
  icon: string;
  style: string;
}

export const Card: React.FC<CardProps> = ({ header, amount, icon, style }) => {
  return (
    <div
      className={`w-full h-auto lg:h-[12rem] shadow-xl ${style} text-white border p-6 md:p-8 rounded-xl flex items-center justify-between gap-6 lg:gap-10`}
    >
      <div className="space-y-2 w-full">
        <h1 className="text-2xl font-medium">{header}</h1>
        <div className="flex items-center gap-2">
          <p className="text-4xl font-bold">{amount}</p>
        </div>
      </div>
      <div>
        <img src={icon} alt="" className="w-20 object-cover" />
      </div>
    </div>
  );
};
