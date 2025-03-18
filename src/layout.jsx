import Navbar from "./components/navbar"
import {Outlet} from "react-router-dom";

function Layout() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}
export default Layout;