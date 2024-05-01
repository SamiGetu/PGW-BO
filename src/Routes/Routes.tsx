import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "../pages/User";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import { LogIn } from "../pages/LogIn";
import Page404 from "../pages/Page404";

export default function Protected() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
        </Route>
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}
