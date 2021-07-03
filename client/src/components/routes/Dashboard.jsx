import { useContext, useState } from "react";
import { AuthContext } from "../../Context";
import { Redirect } from "react-router-dom";
import SideBar from "../dashboard/SideBar";
import NavBar from "../dashboard/NavBar";
import Menu from "../dashboard/menu/Menu";
import menus from "../../constants/menus";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [menuSelected, setMenuSelected] = useState(
    user?.is_admin ? menus.ALL_APPOINTMENTS : menus.AVAILABLE_APPOINTMENTS
  );

  if (user === null) return <Redirect to="/login" />;
  return (
    <>
      <NavBar open={open} setOpen={setOpen} />
      <div className="h-screen w-screen">
        <div className="pt-16 flex overflow-y-hidden w-full max-w-full h-full">
          <SideBar
            open={open}
            setOpen={setOpen}
            isAdmin={user.is_admin}
            menuSelected={menuSelected}
            setMenuSelected={setMenuSelected}
          />
          <Menu selected={menuSelected} setSelected={setMenuSelected} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
