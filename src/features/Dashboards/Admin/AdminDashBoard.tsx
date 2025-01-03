import { HealthBar } from "./components/HealthBar";
import StatusChart from "./components/StatusChart";
import { Card } from "./components/Card";
import total from "../../../assets/transaction (1).png";
import success from "../../../assets/checked.png";
import failed from "../../../assets/delete.png";

export const AdminDashBoard = () => {
  return (
    <div>
      <div className="w-full grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          header="Ledger balance"
          currency="ETB"
          amount={2500.0}
          icon={total}
          desc="ETB 900.00 ready for payout"
          style="bg-primary"
        />
        <Card
          header="Daily Revenue"
          currency="ETB"
          amount={1500.0}
          icon={success}
          desc="From 5 Sales"
          style="bg-secondary"
        />
        <Card
          header="Total Revenue"
          currency="ETB"
          amount={750090.0}
          icon={failed}
          desc="120 sales made totally"
          style="bg-sky-950"
        />
      </div>
      <div className="flex justify-start items-center gap-10 my-10">
        <HealthBar />
        <StatusChart />
      </div>
    </div>
  );
};
