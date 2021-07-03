import AppointmentForm from "../AppointmentForm";

const AddAppointment = ({ setSelected }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <AppointmentForm setSelected={setSelected} />
    </div>
  );
};

export default AddAppointment;
