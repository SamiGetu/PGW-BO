import { HealthBar } from "./components/HealthBar";
import { Card } from "./components/Card";
import user from "../../../assets/user.png";
import role from "../../../assets/Role.png";
import uptime from "../../../assets/uptime.png";

export const AdminDashBoard = () => {
  return (
    <div>
      <div className="w-full grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card header="User" amount={10000} icon={user} style="bg-primary" />
        <Card header="Role" amount={1500.0} icon={role} style="bg-sky-950" />
        <Card header="Uptime " amount={120} icon={uptime} style="bg-sky-950" />
      </div>
      <div className="flex md:flex-row flex-col justify-start items-start gap-10 my-10">
        <HealthBar />
      </div>
    </div>
  );
};
