import kispay from "../../assets/logo.png";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { AiOutlineHome } from "react-icons/ai";
import { BsCardChecklist, BsCashStack } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdPeople } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BiTask, BiUser } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";

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
      Name: "Home",
      Path: "/",
      icon: <AiOutlineHome size={"1.5rem"} />,
      spacing: true,
    },
    {
      Name: "Transactions",
      Path: "/transaction",
      icon: <MdOutlineAccountBalanceWallet size={"1.5rem"} />,
    },
    {
      Name: "Transaction Summary",
      Path: "/transaction-summary",
      icon: <HiOutlineDocumentReport size={"1.5rem"} />,
    },
    {
      Name: "Withdrawals",
      Path: "/withdraw",
      icon: <BsCashStack size={"1.5rem"} />,
    },
    {
      Name: "Withdrawals Payment",
      Path: "/withdraw-payment",
      icon: <MdOutlineAccountBalanceWallet size={"1.5rem"} />,
    },
    {
      Name: "Merchants",
      Path: "/merchants",
      icon: <IoMdPeople size={"1.5rem"} />,
      spacing: true,
    },
    {
      Name: "Users",
      Path: "/users",
      icon: <BiUser size={"1.5rem"} />,
    },
    {
      Name: "Roles",
      Path: "/roles",
      icon: <RiUserSettingsLine size={"1.5rem"} />,
    },
    {
      Name: "Components",
      Path: "/Components",
      icon: <BsCardChecklist size={"1.5rem"} />,
    },
    {
      Name: "Task",
      Path: "/tasks",
      icon: <BiTask size={"1.5rem"} />,
    },
  ];

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: menuOpen ? "0%" : "-100%" }}
      transition={{ type: "spring", stiffness: 70, damping: 20 }}
      className="fixed top-0 left-0 w-[17rem] h-full bg-gray-100 z-10 flex flex-col items-start border-r"
    >
      <div
        className="flex items-center justify-end w-full fixed left-10 my-6"
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

            <div className={`${link.spacing ? "my-2" : ""} `}></div>
          </>
        ))}
      </ul>
    </motion.div>
  );
};
