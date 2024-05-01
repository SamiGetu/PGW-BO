import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import { SideMenu } from "./SideBar/SideMenu";
import { Header } from "./Header/Header";  
export default function Layout() {
  return (
    <>
      <div className="flex h-screen">
        <SideMenu />
        <div className="flex flex-col w-full">
          <Header />
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
