import { AdminDashBoard } from "../features/Dashboards/Admin/AdminDashBoard";
import { FinanceDashboard } from "../features/Dashboards/Finance/FinanceDashboard";
import ManagerialDashboard from "../features/Dashboards/Managerial/ManagerialDashboard";
import useAuth from "../Hooks/useAuth";

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
    return <ManagerialDashboard />;
  };

  return (
    <div>
      <Component />
    </div>
  );
};
