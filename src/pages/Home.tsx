import { AdminDashBoard } from "../features/Dashboards/Admin/AdminDashBoard";
import { FinanceDashboard } from "../features/Dashboards/Finance/FinanceDashboard";
import useAuth from "../Hooks/useAuth";
import Dashboard404 from "./Dashboard404";

export const Dashboard = () => {
  const userData = useAuth().getUserData();
  console.log("userData", userData);

  const roles = userData.roles;

  const Component = () => {
    if (roles.includes("ADMIN")) {
      return <AdminDashBoard />;
    }
    if (roles.includes("Finance officer")) {
      return <FinanceDashboard />;
    }
    return <Dashboard404 />;
  };

  return (
    <div>
      <Component />
    </div>
  );
};
