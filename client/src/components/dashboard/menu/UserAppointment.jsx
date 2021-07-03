import { useEffect, useState } from "react";
import { cancelAppointment, getAppointments } from "../../../utils/api";
import Appointment from "../Appointment";
import { Dialog } from "@headlessui/react";

const UserAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [toCancel, setToCancel] = useState(null);
  useEffect(() => {
    getAppointments().then((res) =>
      setAppointments(res.data.map((app) => ({ ...app, show: true })))
    );
  }, []);

  const cancelCallback = (id) => {
    const appointment = appointments.find((app) => app.id === id);
    if (appointment) setToCancel(appointment);
  };

  const handleCancelAppointment = () => {
    const id = toCancel.id;
    cancelAppointment(id)
      .then(() => {
        setAppointments((apps) =>
          apps.map((app) => (app.id === id ? { ...app, show: false } : app))
        );
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    setToCancel(null);
  };
  return (
    <div className="">
      <h1 className="font-bold text-2xl py-2 bg-white px-4 bg-opacity-60">
        Your Appointments
      </h1>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {appointments.map((appointment) => (
          <Appointment
            {...appointment}
            key={appointment.id}
            cancelCallback={cancelCallback}
          />
        ))}
      </div>
      <Dialog
        open={toCancel !== null}
        onClose={closeModal}
        className="top-0 left-0 right-0 bottom-0 fixed z-50 flex justify-center items-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg p-4 max-w-md z-50 mx-4">
          <Dialog.Title className="font-bold text-lg mb-2">
            Are you sure want to cancel appointment with {toCancel?.doctor_name}
            ?
          </Dialog.Title>
          <Dialog.Description>{toCancel?.description}</Dialog.Description>
          <div className="flex flex-row-reverse gap-2">
            <button
              onClick={closeModal}
              className="bg-gray-800 text-white p-1 rounded font-bold hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleCancelAppointment}
              className="bg-red-500 text-white p-1 rounded font-bold hover:bg-red-400"
            >
              Sure
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserAppointment;
