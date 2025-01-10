import kispay from "../../assets/logo.png";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { BsCardChecklist, BsCashStack } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdPeople } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BiTask, BiUser } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import { RiDashboard2Line } from "react-icons/ri";
import { CiBookmarkCheck } from "react-icons/ci";
import { BsBank2 } from "react-icons/bs";

export const SideMenu = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTabletOrSmaller = useMediaQuery("(max-width: 1024px)");

  const Links = [
    {
      Name: "Dashboard",
      Path: "/dashboard",
      icon: <RiDashboard2Line size={20} />,
      spacing: true,
    },
    {
      Name: "Transactions",
      Path: "/transaction",
      icon: <MdOutlineAccountBalanceWallet size={20} />,
    },
    {
      Name: "Transaction Summary",
      Path: "/transaction-summary",
      icon: <HiOutlineDocumentReport size={20} />,
    },
    {
      Name: "Withdrawals",
      Path: "/withdraw",
      icon: <BsCashStack size={20} />,
    },
    {
      Name: "Withdrawals Payment",
      Path: "/withdraw-payment",
      icon: <MdOutlineAccountBalanceWallet size={20} />,
    },
    {
      Name: "Settlements",
      Path: "/settlement",
      icon: <BsBank2 size={20} />,
    },
    {
      Name: "Merchants",
      Path: "/merchants",
      icon: <IoMdPeople size={20} />,
      spacing: true,
    },
    {
      Name: "Approve Request",
      Path: "/approve-merchants",
      icon: <CiBookmarkCheck size={20} />,
      spacing: true,
    },
    {
      Name: "Users",
      Path: "/users",
      icon: <BiUser size={20} />,
    },
    {
      Name: "Roles",
      Path: "/roles",
      icon: <RiUserSettingsLine size={20} />,
    },
    {
      Name: "Components",
      Path: "/Components",
      icon: <BsCardChecklist size={20} />,
    },
    {
      Name: "Task",
      Path: "/tasks",
      icon: <BiTask size={20} />,
    },
  ];

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: menuOpen ? "0%" : "-100%" }}
      transition={{ type: "spring", stiffness: 70, damping: 20 }}
      className="fixed top-0 left-0 w-[20rem] h-full bg-blue-50 z-10 flex flex-col items-start border-r"
    >
      <div
        className="flex items-center justify-end w-full fixed left-10 my-5"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <CgMenuGridO size={30} className="p-1 text-secondary" />
        ) : (
          <CgMenuGridO size={35} className="text-secondary" />
        )}
      </div>
      <div className="flex items-center justify-start w-full px-5">
        <img
          src={kispay}
          alt="Logo"
          className="w-[5rem] h-[5rem] rounded-full object-contain"
        />
        <h1 className="text-2xl font-bold text-secondary ml-2">KISPAY</h1>
      </div>

      <ul className="flex flex-col w-full my-10 px-2">
        {Links.map((link) => (
          <>
            <div
              className={`w-full hover:border-r-2 hover:border-secondary hover:text-secondary hover:py-2 py-2 px-2 flex items-center  text-black transition duration-300 ease-in-out${
                location.pathname === link.Path
                  ? " bg-white text-secondary font-bold border-r-2 border-secondary"
                  : " "
              }`}
              onClick={() => {
                if (isTabletOrSmaller) {
                  setMenuOpen(false);
                } else {
                  navigate(link.Path);
                }
              }}
            >
              {link.icon}
              <Link
                key={link.Name}
                to={link.Path}
                className="flex items-center text-lg font-medium text-neutral-600"
                style={{ fontFamily: "Barlow Condensed, serif" }}
              >
                <span className="ml-4">{link.Name}</span>
              </Link>
            </div>
            <div className={`${link.spacing ? "my-1 border" : ""} `}></div>
          </>
        ))}
      </ul>
    </motion.div>
  );
};
