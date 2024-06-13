import { CiUser } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

export const Header = () => {
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();
  const { getUserData, logoutAuth } = useAuth();
  const userData = getUserData();

  const Links = [
    {
      Name: "Setting",
      onclick: () => {
        navigate("/settings");
        window.location.reload();
      },
      icon: <IoSettingsOutline />,
    },
    {
      Name: "Explore the Dashboard",
      onclick: () => {
        navigate("/Explore");
        window.location.reload();
      },
      icon: <MdOutlineExplore />,
    },
    {
      Name: "Logout",
      onclick: () => {
        logoutAuth();
        window.location.reload();
      },
      icon: <BiLogOutCircle className="text-red-500" />,
    },
  ];

  return (
    <nav className="sticky top-0 bg-white border-gray-100 border-b-[1px]">
      <div className="container mx-auto flex justify-between items-center h-16 px-4 md:px-8">
        <div className="flex items-center gap-2">
          <CiSearch size={"1.4rem"} className="md:block hidden" />
          <input
            type="text"
            placeholder="Search"
            className="hidden sm:block w-full max-w-[30rem] py-[5px] focus:outline-none md:block hidden"
          />
        </div>
        <div className="flex items-center gap-5">
          <div
            onClick={() => setDrop(!drop)}
            className="flex items-center cursor-pointer gap-2"
          >
            <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <CiUser size={"1.3rem"} className="text-white" />
            </span>
            <span className="hover:underline uppercase hidden sm:block">
              {userData.firstName} {userData.lastName}
            </span>
            <span>
              <FaChevronDown />
            </span>
          </div>
          {drop && (
            <div className="bg-white p-3 shadow absolute right-4 top-16 md:right-8">
              <ul className="flex flex-col">
                {Links.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center cursor-pointer text-gray-500 gap-3 text-sm hover:bg-primary hover:text-white p-2 rounded-md"
                    onClick={item.onclick}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    {item.Name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
