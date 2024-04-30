//import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export const Header = () => {
  const [drop, setDrop] = useState(false);

  const Links = [
    { Name: "Setting", path: "setting", icon: <IoSettingsOutline /> },
    {
      Name: "Explore the Dashboard",
      path: "Explore",
      icon: <MdOutlineExplore />,
    },
    {
      Name: "Logout",
      path: "Logout",
      icon: <BiLogOutCircle className="text-red-500" />,
    },
  ];

  return (
    <>
      <nav className="sticky top-0 bg-sky-950">
        <div className="w-full h-20 shadow-sm">
          <div className="flex justify-between items-center px-20">
            <div className="pt-6">
              <img src="" alt="" />
              <h1 className="text-xl font-bold text-white">Logo</h1>
            </div>
            <div>
              {/* Search section */}
              <span className=" pt-7 flex items-center gap-2">
                <CiSearch size={"1.4rem"} className="text-white" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[20rem] py-[5px] focus:outline-none bg-sky-950 text-white"
                />
              </span>
            </div>
            <div className="flex items-center justify-center gap-5">
              <div
                onClick={() => setDrop(!drop)}
                className="absolute top-6 lg:right-10 right-5 flex items-center cursor-pointer gap-2"
              >
                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <CiUser size={"1.3rem"} className="text-black" />
                </span>
                <span className="hover:underline text-white">Daniel Jemmo</span>
                <span className="text-white ">
                  <FaChevronDown onClick={() => setDrop(!drop)} />
                </span>
              </div>
              <div>
                {drop && (
                  <>
                    <div className="bg-white p-3 shadow-xl absolute right-20 top-20 z-10">
                      <ul className="flex flex-col ">
                        {Links.map((item, index) => (
                          <>
                            <li
                              key={index}
                              className="flex items-center text-gray-500 gap-3 text-sm hover:bg-sky-400 hover:text-white p-2 rounded-md"
                            >
                              <span className="text-2xl ">{item.icon}</span>
                              <Link to={item.path}>{item.Name}</Link>
                            </li>
                          </>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
