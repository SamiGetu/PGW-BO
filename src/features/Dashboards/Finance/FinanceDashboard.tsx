import { Card } from "./components/Card";
import merchants from "../../../assets/merchant.png";
import unsettled from "../../../assets/transaction (3).png";
import commission from "../../../assets/commission.png";
import transaction from "../../../assets/transaction (1).png";
import { useNavigate } from "react-router-dom";
import LiveTransaction from "./components/Table/LiveTransaction";

export const FinanceDashboard = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Merchants ",
      amount: 10000,
      style: "bg-primary",
      currency: "",
      icon: merchants,
      path: "/merchants",
    },
    {
      title: "Unsettled transactions",
      amount: 4,
      style: "bg-sky-950",
      icon: unsettled,
      path: "/transaction",
    },
    {
      title: "Commission",
      amount: 15,
      style: "bg-sky-950",
      icon: commission,
      path: "",
    },
    {
      title: "Transactions",
      amount: 15,
      style: "bg-sky-950",
      icon: transaction,
      path: "/transaction",
    },
  ];
  return (
    <div>
      <div className="flex justify-start items-center gap-5">
        {cards.map((card, index) => (
          <Card
            onClick={() => {
              navigate(card.path);
            }}
            key={index}
            amount={card.amount}
            desc={card.title}
            style={card.style}
            icon={card.icon}
          />
        ))}
      </div>
      <div className="my-10">
        {" "}
        <LiveTransaction />
      </div>
    </div>
  );
};
