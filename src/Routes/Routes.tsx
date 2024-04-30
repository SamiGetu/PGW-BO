import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "../pages/User";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import { LogIn } from "../pages/LogIn";

export default function Protected() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}
