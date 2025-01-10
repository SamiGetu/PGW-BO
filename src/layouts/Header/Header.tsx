import { FaChevronDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import profile from "../../assets/images/profile.png";

export const Header = () => {
  const [drop, setDrop] = useState(false);
  const location = useLocation();
  let routeName = location.pathname.replace("/", "").replace("-", " ");
  if (routeName.includes("/Approval detail/")) {
    routeName = "Approval detail";
  } else if (routeName.includes("/")) {
    routeName = routeName.split("/")[0];
  }
  const navigate = useNavigate();
  const { getUserData, logoutAuth } = useAuth();
  const userDropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleDrop = () => {
    setDrop(!drop);
  };

  return (
    <nav className="bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex justify-start items-center px-10">
          <h1 className="w-full text-2xl font-bold text-secondary ml-2  md:px-10 ">
            {routeName.charAt(0).toUpperCase() + routeName.slice(1)}
          </h1>
          <div className="w-full relative max-w-md lg:block hidden">
            <CiSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-[20rem] pl-10 pr-4 py-3 text-md border rounded-xl bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleDrop}
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={userData?.profilePicture || profile}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-lg lg:block hidden">
              <p className="font-medium">{`${userData?.firstName} ${userData?.lastName}`}</p>
              <p className="text-gray-500 text-xs">ID123456</p>
            </div>
            <FaChevronDown size={14} className="text-gray-500" />
          </div>
        </div>
      </div>

      <div ref={userDropdownRef} className="relative">
        {drop && (
          <div className="absolute right-5 top-5 z-20">
            <div className="bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 w-56">
              <ul className="flex flex-col">
                <div className="w-full text-lg px-3">
                  <p className="font-medium">{`${userData?.firstName} ${userData?.lastName}`}</p>
                  <p className="text-gray-500 text-xs">ID123456</p>
                  <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-2"></div>
                </div>
                {Links.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center cursor-pointer text-gray-500 gap-3 text-sm hover:bg-primary hover:text-white p-2 rounded-md"
                    onClick={item.onclick}
                  >
                    <span className="text-lg text-gray-500 dark:text-gray-300 hover:text-white">
                      {item.icon}
                    </span>
                    {item.Name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
