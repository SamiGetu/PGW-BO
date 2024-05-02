import { FaUsers, FaLink, FaDonate } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { BsSubtract } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { IoMdHome } from "react-icons/io";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

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
    { Name: "Users", Path: "users", icon: <FaUsers size={"1.5rem"} /> },
    {
      Name: "Transactions",
      Path: "transaction",
      icon: <GrTransaction size={"1.5rem"} />,
    },

    {
      Name: "Subaccounts",
      Path: "subaccount",
      icon: <BsSubtract size={"1.5rem"} />,
      spacing: true,
    },
    {
      Name: "Payment Links",
      Path: "paymentlink",
      icon: <FaLink size={"1.5rem"} />,
    },
    {
      Name: "Donation",
      Path: "donation",
      icon: <FaDonate size={"1.5rem"} />,
    },

    {
      Name: "Events",
      Path: "event",
      icon: <MdEventNote size={"1.5rem"} />,
    },
  ];

  return (
    <nav className="relative z-10">
      <div className={`transition-all ${open ? "pl-[17rem]" : "pl-24"}`}>
        <div
          className={`${
            open ? "w-[17rem]" : "w-24"
          } fixed h-screen p-5 pt-8 bg-white border-r-2 duration-500 font-Roboto top-0 left-0`}
        >
          <div className="mt-[5rem]">
            <div className="inline-flex items-center gap-4 mb-[5rem]">
              <Link to="/">
                <img
                  src={logo}
                  alt=""
                  className={`h-12 origin-left ${!open && "scale-0"}`}
                />
              </Link>
              <span
                className={`w-5 h-5 border-4 border-primary bg-green-0 rounded-full absolute right-11 top-[7.3rem] cursor-pointer ${
                  open ? "bg-white  " : "bg-0"
                }`}
                onClick={() => setOpen(!open)}
              ></span>
            </div>
            <div>
              <ul className="pt-2">
                {Links.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => navigate(`/${item.Path}`)}
                    className={` text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-primary/75 hover:text-white rounded-md ${
                      item.spacing ? "mb-8 divide-y-reverse divide-y-2" : ""
                    } ${
                      location.pathname === `/${item.Path}` ||
                      (location.pathname === "/" && item.Path === "/")
                        ? "bg-primary text-white"
                        : "text-neutral-700"
                    }`}
                  >
                    <Link className="flex items-center gap-4" to={item.Path}>
                      <span className="block float-left mx-1.5">
                        {item.icon}
                      </span>
                      <span className={`${!open && "scale-0"}`}>
                        {item.Name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>{" "}
        {/* Adjust content left margin */}
        {/* Your content here */}
      </div>
    </nav>
  );
};
