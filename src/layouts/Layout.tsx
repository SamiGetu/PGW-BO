import { Header } from "./Header/Header";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer/Footer";
import { SideMenu } from "./SideBar/SideMenu";
import { useMediaQuery } from "@mui/material";

export const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const isTabletOrSmaller = useMediaQuery("(max-width: 1024px)");

  const checkScreenSize = () => {
    setIsLargeScreen(window.innerWidth >= 1024);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isTabletOrSmaller) {
      setMenuOpen(false);
    }
  }, [isTabletOrSmaller]);
  const handleMenuOpen = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <SideMenu menuOpen={menuOpen} setMenuOpen={handleMenuOpen} />
      <div>
        <motion.div
          initial={{ marginLeft: 0 }}
          animate={{
            marginLeft: isLargeScreen && menuOpen ? "17rem" : "0rem",
          }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
          className="max-w-full overflow-x-hidden"
        >
          <div className="h-screen flex flex-col gap-5">
            <Header />
            <div className="px-5 md:px-20">
              <Outlet />
            </div>
          </div>
        </motion.div>
        <Footer />
      </div>
    </div>
  );
};
