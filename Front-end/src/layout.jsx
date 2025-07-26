import Navbar from "./components/navbar"
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/dashboard";
  return (
    <main className="min-h-screen w-full bg-[wheat] flex flex-col">
      {!hideNavbar && <Navbar />}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </main>
  );
}
export default Layout;