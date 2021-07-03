import { useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { AuthContext } from "../../Context";
import ProfileMenu from "../profile/ProfileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClinicMedical } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const disButton = useRef();
  const navigation = props.navigation || [
    {
      name: "HOME",
      href: "/",
      current: location.pathname === "/",
      hidden: false,
    },
    {
      name: user?.is_admin ? "ADMIN" : "DASHBOARD",
      href: "/dashboard",
      current: location.pathname === "/dashboard",
      hidden: user === null,
    },
    {
      name: "LOGIN",
      href: "/login",
      current: location.pathname === "/login",
      hidden: user !== null,
    },
    {
      name: "REGISTER",
      href: "/register",
      current: location.pathname === "/register",
      hidden: user !== null,
    },
  ];

  return (
    <Disclosure as="nav" className="bg-teal-100 fixed w-full z-30 shadow-md">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-4 text-teal-800 hover:text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-900"
                  ref={disButton}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {open ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out rotate-45"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out opacity-0"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out -rotate-45"
                        ></span>
                      </>
                    ) : (
                      <>
                        <span
                          aria-hidden="true"
                          className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out -translate-y-1.5"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out translate-y-1.5"
                        ></span>
                      </>
                    )}
                  </div>
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center text-xl font-mono font-extrabold select-none md:text-2xl">
                  <FontAwesomeIcon
                    icon={faClinicMedical}
                    className="mr-1 pb-0.5"
                  />
                  MeetDoc
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map(
                      (item) =>
                        !item.hidden && (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`
                          ${
                            item.current
                              ? "font-extrabold animate-bounce"
                              : "hover:text-teal-600 font-bold"
                          } px-3 py-2 text-sm font-medium select-none text-teal-800`}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        )
                    )}
                  </div>
                </div>
              </div>
              {user !== null ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <ProfileMenu />
                </div>
              ) : null}
            </div>
          </div>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map(
                  (item) =>
                    !item.hidden && (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`
                      ${
                        item.current
                          ? "bg-teal-500 text-white"
                          : "text-teal-900 hover:bg-teal-700 hover:text-white"
                      } block px-3 py-2 rounded-md text-base font-bold`}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => disButton.current.click()}
                      >
                        {item.name}
                      </Link>
                    )
                )}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
