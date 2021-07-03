import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faCalendarPlus,
  faCalendar,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import menus from "../../constants/menus";
const icons = {};
icons[menus.ADD_APPOINTMENT] = faCalendarPlus;
icons[menus.ALL_APPOINTMENTS] = faList;
icons[menus.AVAILABLE_APPOINTMENTS] = faList;
icons[menus.USER_APPOINTMENTS] = faCalendar;
const SideBar = ({ open, setOpen, isAdmin, menuSelected, setMenuSelected }) => {
  const navigation = isAdmin
    ? [menus.ALL_APPOINTMENTS, menus.ADD_APPOINTMENT]
    : [menus.AVAILABLE_APPOINTMENTS, menus.USER_APPOINTMENTS];
  return (
    <div
      className={`sidebar max-w-xs bg-white py-6 px-4 border shadow-lg text-white h-full fixed md:static left-0 top-0 pt-20 md:pt-6 z-20 ${
        open ? "is-visible" : ""
      }`}
    >
      <div className="w-full h-full max-h-full overflow-y-auto text-black custom-scrollbar">
        <h1 className="border-l-4 border-r-4 border-teal-900 px-4 font-bold text-lg mb-2 text-center">
          Dashboard
        </h1>
        <Link
          to="/"
          className="border-l-4 hover:bg-gray-100 border-transparent hover:border-teal-400 select-none w-full text-left p-4 text-md block"
        >
          <div className="w-8 inline-block">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
          </div>
          Home
        </Link>
        <hr className="border my-2" />
        {navigation.map((menu) => (
          <button
            key={menu}
            onClick={() => {
              setMenuSelected(menu);
              setOpen(false);
            }}
            className={`${
              menuSelected === menu
                ? "font-bold text-teal-700 border-teal-700"
                : "hover:bg-gray-100 border-transparent hover:border-gray-400"
            } select-none w-full text-left p-4 text-md border-l-4`}
          >
            <div className="w-8 inline-block">
              <FontAwesomeIcon icon={icons[menu]} className="mr-2" />
            </div>
            {menu}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
