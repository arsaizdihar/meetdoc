import { Menu, Transition, Dialog } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Context";
import { logout } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const ProfileMenu = () => {
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const handleLogout = () => {
    logout().then(() => {
      localStorage.removeItem("user");
      setUser(null);
      history.push("/login");
    });
  };

  const showModal = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);
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
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-teal-100" : ""
                      } block px-4 py-2 text-sm text-black w-full text-left`}
                      onClick={showModal}
                    >
                      <FontAwesomeIcon icon={faUser} />
                      &nbsp;&nbsp;Profile
                    </button>
                  )}
                </Menu.Item>
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
      <Dialog
        open={openModal}
        onClose={closeModal}
        className="top-0 left-0 right-0 bottom-0 fixed z-50 flex justify-center items-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg p-4 max-w-md z-50 relative mx-4 shadow-xl">
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-0 right-0 cursor-pointer m-1.5"
            color="black"
            size="lg"
            onClick={closeModal}
          ></FontAwesomeIcon>
          <Dialog.Title className="font-bold text-lg mb-2 mt-1">
            {user?.first_name} {user?.last_name}
          </Dialog.Title>
          <table class="table-auto">
            <tr>
              <td>Email&emsp;</td>: {user?.email}
            </tr>
            <tr>
              <td>Age&emsp;</td>: {user?.age}
            </tr>
          </table>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-xs p-1 font-bold text-white rounded hover:bg-red-400"
              onClick={closeModal}
            >
              CLOSE
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileMenu;
