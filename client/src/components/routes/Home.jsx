import { useContext } from "react";
import { AuthContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { user } = useContext(AuthContext);
  const isAuth = user !== null;
  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-screen items-center">
        <div className="px-4 lg:px-8 container mx-auto flex flex-wrap md:flex-nowrap gap-4 space-y-0">
          <div className="text-xl md:text-2xl lg:text-3xl text-rose-700 flex-grow">
            <FontAwesomeIcon
              icon={faStethoscope}
              size="10x"
              className="transform"
            />
          </div>
          <div>
            <h1 className="font-bold text-4xl lg:text-5xl fit inline-block">
              <span className="text-rose-600 italic">MeetDoc</span>, the best
              platform to <span className="text-rose-600 italic">Meet</span> the
              best <span className="text-rose-600 italic">Doc</span>tors.
            </h1>
            <h3 className="text-xl mb-4 inline-block">
              Get started to use our features here!
            </h3>
            <div className="w-1/2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {!isAuth ? (
                <>
                  <Link
                    to="/login"
                    className="btn bg-rose-400 hover:bg-rose-300 hover:shadow-md w-full text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn bg-rose-400 hover:bg-rose-300 hover:shadow-md w-full text-center"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="btn bg-rose-400 hover:bg-rose-300 hover:shadow-md w-full text-center col-span-2 text-lg"
                >
                  {user.is_admin ? "Admin" : "Dashboard"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
