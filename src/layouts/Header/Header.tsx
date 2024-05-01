import { CiUser } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

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
      <nav className="sticky top-0 bg-white z-10 ">
        <div className="w-full h-[5rem] shadow">
          <div className="flex justify-between items-center  px-20 relative">
            <div>
              {/* Search section */}
              <span className="pt-7 flex items-center gap-2">
                <CiSearch size={"1.4rem"} />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[30rem] py-[5px] focus:outline-none"
                />
              </span>
            </div>

            <div className="flex items-center justify-center gap-5">
              <div
                onClick={() => setDrop(!drop)}
                className="absolute top-6 lg:right-10  right-5 flex items-center cursor-pointer gap-2"
              >
                <span className="w-10 h-10 rounded-full bg-[#3E4095] flex items-center justify-center">
                  <CiUser size={"1.3rem"} className="text-white" />
                </span>
                <span className="hover:underline ">Daniel Jemmo</span>
                <span className=" ">
                  <FaChevronDown onClick={() => setDrop(!drop)} />
                </span>
              </div>
              <div>
                {drop && (
                  <>
                    <div className=" p-3 shadow-xl absolute right-20 top-20 z-10">
                      <ul className="flex flex-col ">
                        {Links.map((item, index) => (
                          <>
                            <li
                              key={index}
                              className="flex items-center text-gray-500 gap-3 text-sm hover:bg-[#3E4095] hover:text-white p-2 rounded-md"
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
