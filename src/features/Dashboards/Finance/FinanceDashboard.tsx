import { Card } from "./components/Card";
import merchants from "../../../assets/merchant.png";
import kyc from "../../../assets/face-recognize.png";
import applicant from "../../../assets/form.png";

export const FinanceDashboard = () => {
  const cards = [
    {
      title: "Merchants ",
      amount: 290,
      style: "bg-primary",
      currency: "",
      icon: merchants,
    },
    {
      title: "KYC pending",
      amount: 4,
      style: "bg-blue-950",
      icon: kyc,
    },
    {
      title: "Applicants",
      amount: 15,
      style: "bg-sky-950",
      icon: applicant,
      applicant: "(Daily)",
    },
  ];
  return (
    <div className="my-20">
      <div className="flex justify-start items-center gap-10">
        {cards.map((card, index) => (
          <Card
            key={index}
            amount={card.amount}
            desc={card.title}
            style={card.style}
            icon={card.icon}
            applicant={card.applicant}
          />
        ))}
      </div>
    </div>
  );
};
