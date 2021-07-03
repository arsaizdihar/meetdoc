import { useContext, useEffect, useState } from "react";
import {
  adminDeleteAppointment,
  adminGetAppointments,
} from "../../../utils/api";
import Appointment from "../Appointment";
import { AppointmentContext } from "../Context";
import { Dialog } from "@headlessui/react";
import menus from "../../../constants/menus";
import AppointmentForm from "../AppointmentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AllAppointments = ({ setSelected }) => {
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const [toDelete, setToDelete] = useState(null);
  const [toEdit, setToEdit] = useState(null);
  useEffect(() => {
    adminGetAppointments()
      .then((res) => {
        setAppointments(res.data.map((a) => ({ ...a, show: true })));
      })
      .catch((err) => console.log(err));
  }, [setAppointments]);

  const deleteCallback = (id) => {
    const appointment = appointments.find((a) => a.id === id);
    if (appointment) setToDelete(appointment);
  };

  const editCallback = (id) => {
    const appointment = appointments.find((a) => a.id === id);
    if (appointment) setToEdit(appointment);
  };

  const closeModal = () => {
    setToDelete(null);
    setToEdit(null);
  };

  const deleteAppointment = () => {
    adminDeleteAppointment(toDelete.id).then(() => {
      setAppointments(
        appointments.map((a) =>
          a.id === toDelete.id ? { ...a, show: false } : a
        )
      );
      setToDelete(null);
    });
  };

  return (
    <>
      <div className="">
        <h1 className="font-bold text-2xl py-2 bg-white px-4 bg-opacity-60">
          Appointments
        </h1>
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <button
            className="bg-green-400 max-w-xs p-2 rounded font-bold md:col-span-2 lg:col-span-3 my-2"
            onClick={() => setSelected(menus.ADD_APPOINTMENT)}
          >
            Add new appointment
          </button>
          {appointments.map((appointment) => (
            <Appointment
              {...appointment}
              isAdmin
              key={appointment.id}
              deleteCallback={deleteCallback}
              editCallback={editCallback}
            />
          ))}
        </div>
      </div>
      <Dialog
        open={toDelete !== null}
        onClose={closeModal}
        className="top-0 left-0 right-0 bottom-0 fixed z-50 flex justify-center items-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg p-4 max-w-md z-50 mx-4">
          <Dialog.Title className="font-bold text-lg mb-2">
            Are you sure want to delete {toDelete?.doctor_name}'s appointment?
          </Dialog.Title>
          <Dialog.Description>
            This will permanently delete the appointment and all of its
            registrants data.
          </Dialog.Description>
          <div className="flex flex-row-reverse gap-2">
            <button
              onClick={closeModal}
              className="bg-gray-800 text-white p-1 rounded font-bold hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={deleteAppointment}
              className="bg-red-500 text-white p-1 rounded font-bold hover:bg-red-400"
            >
              Sure
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={toEdit !== null}
        onClose={closeModal}
        className="top-0 left-0 right-0 bottom-0 fixed z-50 flex justify-center items-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg p-4 w-full max-w-md z-50 relative mx-4 shadow-lg">
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-0 right-0 cursor-pointer m-1.5"
            color="black"
            size="lg"
            onClick={closeModal}
          ></FontAwesomeIcon>
          <Dialog.Title className="font-bold text-lg mb-2">
            Edit Appointment
          </Dialog.Title>
          <AppointmentForm isEdit toEdit={toEdit} editCallback={closeModal} />
        </div>
      </Dialog>
    </>
  );
};

export default AllAppointments;
