import { register } from "../../../utils/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context";
import { Redirect } from "react-router-dom";
const Register = ({ history }) => {
  const { user, setUser } = useContext(AuthContext);
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const handleRegisterForm = (e) => {
    e.preventDefault();
    if (state.password !== state.confirm_password) {
      setErrors({ password: "Password doesn't match" });
      return;
    }
    register(state)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        history.push("/");
      })
      .catch((err) => {
        if (err.response && err.response.data.error) {
          setErrors(err.response.data.error);
        }
      });
  };
  if (user) return <Redirect to="/" />;
  return (
    <div className="container p-4 mx-auto h-screen flex justify-center items-center">
      <form
        className="max-w-lg mx-auto w-full bg-white p-6 rounded-lg bg-opacity-20 backdrop-filter backdrop-blur-sm shadow-lg"
        onSubmit={handleRegisterForm}
        noValidate
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 required">
              First Name
            </label>
            <input
              className={
                "input input-gray" + (errors.first_name ? " input-error" : "")
              }
              type="text"
              name="first-name"
              placeholder="First Name"
              value={state.first_name}
              onChange={(e) =>
                setState({ ...state, first_name: e.target.value })
              }
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs italic">{errors.first_name}</p>
            )}
          </div>
          <div className="w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 required">
              Last Name
            </label>
            <input
              className={
                "input input-gray" + (errors.last_name ? " input-error" : "")
              }
              type="text"
              name="last-name"
              placeholder="Last Name"
              value={state.last_name}
              onChange={(e) =>
                setState({ ...state, last_name: e.target.value })
              }
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs italic">{errors.last_name}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-4/5 px-3">
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
          <div className="w-1/5 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 required">
              Age
            </label>
            <input
              className={
                "input input-gray" + (errors.age ? " input-error" : "")
              }
              type="number"
              name="age"
              min={0}
              max={100}
              placeholder="Age"
              value={state.age}
              onChange={(e) => setState({ ...state, age: e.target.value })}
            />
            {errors.age && (
              <p className="text-red-500 text-xs italic">{errors.age}</p>
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
            <input
              className={
                "input input-gray mt-2" +
                (errors.password ? " input-error" : "")
              }
              type="password"
              name="confirm-password"
              placeholder="Confirm Password"
              value={state.confirm_password}
              onChange={(e) =>
                setState({ ...state, confirm_password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <button className="w-1/3 mx-auto block btn btn-scale bg-teal-200 hover:bg-teal-300">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
