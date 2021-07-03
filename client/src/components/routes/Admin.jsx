import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context";

const Admin = (props) => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user === null || !user.is_admin) props.history.push("/");
  }, [user, props.history]);
  return (
    <div className="pt-20 px-4 container mx-auto bg-white min-h-screen bg-opacity-90 shadow-2xl backdrop-filter backdrop-blur-sm">
      <h1 className="text-center font-extrabold text-2xl">Admin Page</h1>
    </div>
  );
};

export default Admin;
