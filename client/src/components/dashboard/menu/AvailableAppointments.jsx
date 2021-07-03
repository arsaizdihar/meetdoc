import { useEffect, useState } from "react";
import { addAppointment, getAvailableAppointment } from "../../../utils/api";
import Appointment from "../Appointment";

const AvailableAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    getAvailableAppointment()
      .then((res) =>
        setAppointments(res.data.map((app) => ({ ...app, show: true })))
      )
      .catch((err) => console.log(err));
  }, []);

  const addCallback = (id) => {
    addAppointment(id)
      .then(() =>
        setAppointments((apps) =>
          apps.map((app) => (app.id === id ? { ...app, show: false } : app))
        )
      )
      .catch((err) => {
        if (err.response?.data?.error) {
          alert(err.response.data.error);
        } else {
          console.log(err);
        }
      });
  };
  return (
    <div className="">
      <h1 className="font-bold text-2xl py-2 bg-white px-4 bg-opacity-60">
        Available Appointments
      </h1>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {appointments.map((appointment) => (
          <Appointment
            {...appointment}
            key={appointment.id}
            addCallback={addCallback}
          />
        ))}
      </div>
    </div>
  );
};

export default AvailableAppointments;
