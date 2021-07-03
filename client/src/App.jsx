import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./components/routes/Home";
import Login from "./components/routes/auth/Login";
import Register from "./components/routes/auth/Register";
import NavBar from "./components/main-ui/NavBar";

import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./Context";
import { useEffect } from "react";
import { getUserData } from "./utils/api";
import Dashboard from "./components/routes/Dashboard";

const App = () => {
  const { setUser } = useContext(AuthContext);
  const location = useLocation();
  useEffect(() => {
    getUserData()
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        localStorage.removeItem("user");
      });
  }, [setUser]);
  return (
    <>
      {location.pathname !== "/dashboard" && <NavBar />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
};

export default App;
