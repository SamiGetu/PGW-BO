import { FaUsers, FaUsersCog } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { GrTransaction } from "react-icons/gr";
import { IoMdHome } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { RiMenu3Fill } from "react-icons/ri";

export const SideMenu = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation(); // Import useLocation hook
  const navigate = useNavigate();

  const Links = [
    {
      Name: "Home",
      Path: "",
      icon: <IoMdHome size={"1.5rem"} />,
      spacing: true,
    },

    {
      Name: "Transactions",
      Path: "transaction",
      icon: <GrTransaction size={"1.5rem"} />,
    },
    {
      Name: "Withdrawals",
      Path: "withdraw",
      icon: <BiMoneyWithdraw size={"1.5rem"} />,
    },
    {
      Name: "Withdrawals Payment",
      Path: "withdraw-payment",
      icon: <MdOutlinePayments size={"1.5rem"} />,
    },
    {
      Name: "Merchants",
      Path: "merchants",
      icon: <IoPeopleSharp size={"1.5rem"} />,
      spacing: true,
    },
    { Name: "Users", Path: "users", icon: <FaUsers size={"1.5rem"} /> },
    {
      Name: "Roles",
      Path: "roles",
      icon: <FaUsersCog size={"1.5rem"} />,
    },
    {
      Name: "Components",
      Path: "Components",
      icon: <CreditCardIcon sx={{ fontSize: "1.5rem" }} />,
    },
    {
      Name: "Task",
      Path: "tasks",
      icon: <GrTasks size={"1.5rem"} />,
    },
  ];

  return (
    <nav className="relative z-10">
      <div
        className={`transition-all duration-500 ${
          open ? "lg:pl-[20rem] pl-0" : "pl-0"
        }`}
      >
        <div
          className={`fixed top-0 left-0 h-screen pt-8 bg-white border-r-2 transition-width duration-500 
        ${open ? "w-[20rem]" : "w-0"} font-Roboto`}
        >
          <div className="mt-[5rem]">
            <div className="flex items-center justify-center gap-10 mb-[5rem] relative">
              <img
                src={logo}
                className={`transition-transform duration-500 ${
                  !open && "scale-0"
                } w-[6rem]`}
                alt="Kispay"
              />
              <div
                className={`cursor-pointer absolute ${
                  open ? "left-[16rem] -top-[5.5rem]" : "left-7 -top-[2rem]"
                }`}
                onClick={() => setOpen(!open)}
              >
                <label htmlFor="" className="text-sm font-semibold">
                  Menu
                </label>
                <RiMenu3Fill
                  size="2.2rem"
                  className="bg-primary p-2 text-white rounded-xl"
                />
              </div>
            </div>
            <ul className="pt-2">
              {Links.map((item, index) => (
                <li
                  key={index}
                  onClick={() => navigate(`/${item.Path}`)}
                  className={`flex items-center gap-x-4 cursor-pointer p-2 px-10 hover:bg-primary hover:text-white rounded-md transition-colors ${
                    !open && "scale-0"
                  }
                ${item.spacing ? "mb-8" : ""} 
                ${
                  location.pathname === `/${item.Path}` ||
                  (location.pathname === "/" && item.Path === "")
                    ? "bg-primary text-white"
                    : "text-neutral-700"
                }`}
                >
                  <Link className="flex items-center gap-4" to={item.Path}>
                    <div className=" mx-1.5">{item.icon}</div>
                    <div className="transition-transform duration-50">
                      {item.Name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
