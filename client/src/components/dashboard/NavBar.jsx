import { faClinicMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileMenu from "../profile/ProfileMenu";
import { useRef } from "react";

const NavBar = ({ open, setOpen }) => {
  const disButton = useRef();
  return (
    <nav className="bg-teal-100 fixed w-full z-30 shadow-md">
      <>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              {/* Mobile menu button*/}
              <button
                className="inline-flex items-center justify-center p-4 text-teal-800 hover:text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-900"
                onClick={() => setOpen(!open)}
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
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
              <div className="flex-shrink-0 flex items-center text-xl font-mono font-extrabold select-none md:text-2xl">
                <FontAwesomeIcon
                  icon={faClinicMedical}
                  className="mr-1 pb-0.5"
                />
                MeetDoc
              </div>
              <div className="hidden sm:block sm:ml-6"></div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              {/* Profile dropdown */}
              <ProfileMenu />
            </div>
          </div>
        </div>
      </>
    </nav>
  );
};

export default NavBar;
