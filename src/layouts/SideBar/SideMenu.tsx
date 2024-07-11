import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaUsersCog, FaTimes } from "react-icons/fa";
import { GrTasks, GrTransaction } from "react-icons/gr";
import { IoMdHome } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { RiMenu3Fill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import kispay from "../../assets/logo.png";

export const SideMenu = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateMenuState = () => setOpen(window.innerWidth >= 1024);
    updateMenuState();
    window.addEventListener("resize", updateMenuState);
    return () => window.removeEventListener("resize", updateMenuState);
  }, []);

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
    { Name: "Roles", Path: "roles", icon: <FaUsersCog size={"1.5rem"} /> },
    {
      Name: "Components",
      Path: "Components",
      icon: <CreditCardIcon sx={{ fontSize: "1.5rem" }} />,
    },
    { Name: "Task", Path: "tasks", icon: <GrTasks size={"1.5rem"} /> },
  ];

  return (
    <nav className="relative z-10">
      <motion.div
        className={`transition-all duration-500 ${
          open ? "lg:pl-[17rem] pl-0" : "pl-0"
        }`}
        initial={{ width: 0 }}
        animate={{ width: "auto" }}
        exit={{ width: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Menu icon */}
        <div
          className={`cursor-pointer absolute z-10 left-7 top-0`}
          onClick={() => setOpen(!open)}
        >
          <label htmlFor="" className="text-sm font-semibold">
            Menu
          </label>
          {open ? (
            <FaTimes
              size="2.2rem"
              className="bg-primary p-2 text-white rounded-xl"
            />
          ) : (
            <RiMenu3Fill
              size="2.2rem"
              className="bg-primary p-2 text-white rounded-xl"
            />
          )}
        </div>
        {/* Side Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              className={`fixed top-0 left-0 h-screen pt-8 bg-white border-r-2 font-Roboto`}
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mt-[5rem] w-[18rem]">
                <div className="flex items-center justify-center gap-10 mb-[5rem]">
                  <img
                    src={kispay}
                    className={`transition-all duration-500 w-[5rem]`}
                    alt="Kispay icon"
                  />
                </div>
                <ul className="pt-2">
                  {Links.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => navigate(`/${item.Path}`)}
                      className={`flex items-center gap-x-4 cursor-pointer p-3 mx-2 my-1 hover:bg-primary hover:text-white rounded-md transition-transform duration-500
                        ${open ? "block" : "hidden"}
                        ${item.spacing ? "mb-5" : ""}
                        ${
                          location.pathname === `/${item.Path}` ||
                          (location.pathname === "/" && item.Path === "")
                            ? "bg-primary text-white"
                            : "text-neutral-700 font-medium"
                        }`}
                    >
                      <Link className="flex items-center gap-2" to={item.Path}>
                        {item.icon}
                        {item.Name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};
