import { Route, Routes } from "react-router-dom";
import User from "../pages/User";
import { Layout } from "../layouts/Layout";
import { LogIn } from "../pages/LogIn";
import Page404 from "../pages/Page404";
import Settings from "../pages/Settings";
import Role from "../pages/Role";
import Tasks from "../pages/Tasks";
import PrivateRoute from "./PrivateRoute";
import { RedirectAuthUsers } from "./RedirectAuthUsers";
import ComponentsManagement from "../pages/ComponentsManagement ";
import { Merchants } from "../pages/Merchants";
import { MerchantDetail } from "../features/Merchants/components/MerchantDetail";
import MerchantPdf from "../pages/MerchantPdf";
import { Transaction } from "../pages/Transaction";
import { Withdraw } from "../pages/Withdraw";
import { TransactionDetail } from "../features/Transaction/components/TransactionDetail";
import WithdrawDetail from "../features/Withdraw/components/WithdrawDetail";
import WithdrawalsPayment from "../pages/WithdrawalsPayment";
import { WithdrawalsPaymentDetail } from "../features/withdrawalsPayment/components/WithdrawalsPaymentDetail";
import { TransactionSummary } from "../pages/TransactionSummary";
import { AdminDashBoard } from "../features/Dashboards/Admin/AdminDashBoard";
import { FinanceDashboard } from "../features/Dashboards/Finance/FinanceDashboard";
import EmailVerification from "../pages/EmailVerification";
import { Home } from "../pages/Home";
import Dashboard404 from "./../pages/Dashboard404";

export default function Protected() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<User />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/roles" element={<Role />} />
          <Route path="/Components" element={<ComponentsManagement />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/merchants" element={<Merchants />} />
          <Route
            path="/merchant-detail/:merchantId"
            element={<MerchantDetail />}
          />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction-detail" element={<TransactionDetail />} />
          <Route path="transaction-summary" element={<TransactionSummary />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/withdraw-detail" element={<WithdrawDetail />} />
          <Route path="/withdraw-payment" element={<WithdrawalsPayment />} />
          <Route
            path="/withdraw-payment-detail"
            element={<WithdrawalsPaymentDetail />}
          />
          {/* dashboards */}
          <Route path="/admin-dashboard" element={<AdminDashBoard />} />
          <Route path="/finance-dashboard" element={<FinanceDashboard />} />
        </Route>
      </Route>
      <Route path="/merchant-pdf" element={<MerchantPdf />} />
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<RedirectAuthUsers />}>
        <Route path="/login" element={<LogIn />} />
      </Route>
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/dashboard-404" element={<Dashboard404 />} />
    </Routes>
  );
}
