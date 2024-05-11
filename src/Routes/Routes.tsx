import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "../pages/User";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import { LogIn } from "../pages/LogIn";
import Page404 from "../pages/Page404";
import Settings from "../pages/Settings";
import Role from "../pages/Role";
import Tasks from "../pages/Tasks";

export default function Protected() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/roles" element={<Role />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}
