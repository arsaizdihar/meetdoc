import { createContext, useState } from "react";

export const AppointmentContext = createContext();

const Context = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  return (
    <AppointmentContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default Context;
