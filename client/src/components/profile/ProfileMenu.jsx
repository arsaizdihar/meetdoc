import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Context";
import { logout } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const ProfileMenu = () => {
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = () => {
    logout().then(() => {
      localStorage.removeItem("user");
      setUser(null);
      history.push("/login");
    });
  };
  return (
    <>
      <p className="font-bold text-lg">{user?.first_name}</p>
      <Menu as="div" className="ml-3 relative">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="flex text-sm rounded-full outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-teal-800 border border-black">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="block px-4 py-2 w-full text-black text-center">
                  {user?.first_name} {user?.last_name}
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? "bg-teal-100" : ""
                      } block px-4 py-2 text-sm text-black w-full text-left`}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      &nbsp;&nbsp;Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};

export default ProfileMenu;
