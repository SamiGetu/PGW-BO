import { Header } from "./Header/Header";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import Footer from "./Footer/Footer";
import { SideMenu } from "./SideBar/SideMenu";

export const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const checkScreenSize = () => {
    setIsLargeScreen(window.innerWidth >= 1024);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div>
      <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div>
        <motion.div
          initial={{ marginLeft: 0 }}
          animate={{
            marginLeft: isLargeScreen && menuOpen ? "15rem" : "0rem",
          }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
          className=" max-w-full overflow-x-hidden"
        >
          <div className="flex flex-col gap-5">
            <Header />
            <div className="container mx-auto">
              <Outlet />
            </div>
            {/* <div className="w-full absolute bottom-0 flex justify-center">
                <Footer />
              </div> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
