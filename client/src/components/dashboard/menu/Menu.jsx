import { useEffect, useState } from "react";
import menus from "../../../constants/menus";
import Context from "../Context";
import AddAppointment from "./AddAppointment";
import AllAppointments from "./AllAppointments";
import AvailableAppointments from "./AvailableAppointments";
import UserAppointment from "./UserAppointment";
const Menu = ({ selected, setSelected }) => {
  const [dashboard, setDashboard] = useState();
  useEffect(() => {
    switch (selected) {
      case menus.ALL_APPOINTMENTS:
        setDashboard(<AllAppointments setSelected={setSelected} />);
        break;
      case menus.ADD_APPOINTMENT:
        setDashboard(<AddAppointment setSelected={setSelected} />);
        break;
      case menus.AVAILABLE_APPOINTMENTS:
        setDashboard(<AvailableAppointments setSelected={setSelected} />);
        break;
      default:
        setDashboard(<UserAppointment />);
        break;
    }
  }, [selected, setSelected]);
  return (
    <Context>
      <div className="m-8 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg w-full overflow-y-auto max-w-screen shadow-xl block">
        {dashboard}
      </div>
    </Context>
  );
};

export default Menu;
