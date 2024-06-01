import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "../pages/User";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
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

export default function Protected() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<User />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/roles" element={<Role />} />
            <Route path="/Components" element={<ComponentsManagement />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/merchants" element={<Merchants />} />
            <Route path="/merchant-detail" element={<MerchantDetail />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/transaction-detail" element={<TransactionDetail />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/withdraw-detail" element={<WithdrawDetail />} />
            <Route path="/withdraw-payment" element={<WithdrawalsPayment />} />
            <Route
              path="/withdraw-payment-detail"
              element={<WithdrawalsPaymentDetail />}
            />
          </Route>
        </Route>
        <Route path="/merchant-pdf" element={<MerchantPdf />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<RedirectAuthUsers />}>
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </Router>
  );
}
