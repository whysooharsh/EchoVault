import Navbar from "./components/navbar"
import {Outlet} from "react-router-dom";

function Layout() {
  return (
    <main className="min-h-screen w-full bg-[wheat] flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </main>
  );
}
export default Layout;