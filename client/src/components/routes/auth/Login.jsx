import { useContext, useState } from "react";
import { login } from "../../../utils/api";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../Context";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const { user, setUser } = useContext(AuthContext);
  const [state, setState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleLoginForm = (e) => {
    e.preventDefault();
    login(state)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        history.push("/");
      })
      .catch((err) => {
        if (err.response?.data?.error) {
          setErrors(err.response.data.error);
        }
      });
  };
  if (user) return <Redirect to="/" />;
  return (
    <div className="container p-4 mx-auto h-screen flex justify-center items-center">
      <form
        className="max-w-lg mx-auto w-full bg-white p-6 rounded-lg bg-opacity-20 backdrop-filter backdrop-blur-sm shadow-lg"
        onSubmit={handleLoginForm}
        noValidate
      >
        <h1 className="font-bold text-xl text-teal-900">
          Login here to use our features.
        </h1>
        <p className="text-sm mb-2">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold hover:text-gray-700">
            Register here.
          </Link>
        </p>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 required">
              Email
            </label>
            <input
              className={
                "input input-gray" + (errors.email ? " input-error" : "")
              }
              type="text"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 required">
              Password
            </label>
            <input
              className={
                "input input-gray" + (errors.password ? " input-error" : "")
              }
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <button className="w-1/3 mx-auto block btn btn-scale tracking-widest bg-teal-200 hover:bg-teal-300">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
