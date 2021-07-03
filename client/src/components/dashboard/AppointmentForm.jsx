import { useContext, useEffect, useState } from "react";
import menus from "../../constants/menus";
import { adminAddAppointment, adminEditAppointment } from "../../utils/api";
import { AppointmentContext } from "./Context";

const AppointmentForm = ({ setSelected, isEdit, toEdit, editCallback }) => {
  const { setAppointments } = useContext(AppointmentContext);
  const [state, setState] = useState({
    doctor_name: "",
    description: "",
    max_registrants: 5,
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (isEdit) {
      setState({ ...toEdit });
    }
  }, [isEdit, toEdit]);
  const handleAddAppointment = (e) => {
    e.preventDefault();
    adminAddAppointment(state)
      .then((res) => {
        setAppointments((apps) => [
          ...apps,
          { ...res.data.appointment, show: true },
        ]);
        setSelected(menus.ALL_APPOINTMENTS);
      })
      .catch((err) => {
        if (err.response?.data?.error) {
          setErrors(err.response.data.error);
        }
      });
  };
  const handleEditAppointment = (e) => {
    e.preventDefault();
    if (toEdit.registrants.length > state.max_registrants) {
      setErrors({
        max_registrants: `This appointment current registrants is ${toEdit.registrants.length}.`,
      });
      return;
    }
    adminEditAppointment(toEdit.id, state)
      .then(() => {
        setAppointments((apps) =>
          apps.map((app) =>
            app.id === toEdit.id
              ? { ...state, registrants: app.registrants, id: app.id }
              : app
          )
        );
        editCallback();
      })
      .catch((err) => console.log(err));
  };
  return (
    <form
      className={`bg-white p-4 max-w-md w-full ${
        !isEdit && "mx-4 rounded-md shadow-lg"
      }`}
      onSubmit={isEdit ? handleEditAppointment : handleAddAppointment}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 required">
            Doctor name
          </label>
          <input
            className={
              "input input-gray" + (errors.doctor_name ? " input-error" : "")
            }
            type="text"
            name="doctor_name"
            placeholder="Doctor Name"
            value={state.doctor_name}
            onChange={(e) =>
              setState({ ...state, doctor_name: e.target.value })
            }
          />
          {errors.doctor_name && (
            <p className="text-red-500 text-xs italic">{errors.doctor_name}</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 required">
            Description
          </label>
          <textarea
            className={
              "input input-gray resize-none" +
              (errors.description ? " input-error" : "")
            }
            rows={3}
            type="text"
            name="description"
            placeholder="Description"
            value={state.description}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6 items-end">
        <div className="w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 required">
            Max Registrants
          </label>
          <input
            className={
              "input input-gray" +
              (errors.max_registrants ? " input-error" : "")
            }
            type="number"
            name="max_registrants"
            value={state.max_registrants}
            onChange={(e) =>
              setState({ ...state, max_registrants: e.target.value })
            }
          />
          {errors.max_registrants && (
            <p className="text-red-500 text-xs italic">
              {errors.max_registrants}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <button className="mx-auto block btn btn-scale tracking-widest bg-teal-200 hover:bg-teal-300">
          {isEdit ? "Submit Edit" : "Add Appointment"}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
