import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCalendarPlus,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Transition, Dialog } from "@headlessui/react";
import { useState } from "react";
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const Appointment = ({
  id,
  doctor_name,
  description,
  registrants,
  created_at,
  isAdmin,
  max_registrants,
  deleteCallback,
  editCallback,
  addCallback,
  cancelCallback,
  is_full,
  show,
}) => {
  const [toInfo, setToInfo] = useState(null);

  const closeModal = () => setToInfo(null);
  return (
    <>
      <Transition
        as="div"
        show={show === undefined ? true : show}
        appear
        enter="transition duration-500"
        enterFrom="transform scale-0"
        enterTo="transform scale-100"
        leave="transition duration-500"
        leaveFrom="transform scale-100"
        leaveTo="transform scale-0"
        className={`bg-white shadow-lg rounded-md w-full p-4 border border-gray-100 my-2 flex flex-col ${
          is_full ? "bg-red-500 text-white border-black" : ""
        }`}
      >
        <h3 className="font-bold text-xl">
          {doctor_name}
          {is_full ? " (FULL)" : ""}
        </h3>
        <p className="mb-2">{description}</p>
        {isAdmin ? (
          <>
            <hr className="w-4/5 mx-auto" />
            <p className="text-sm mt-2">
              {registrants.length
                ? `Registrants (${registrants.length}/${max_registrants}):`
                : "No registrant yet."}
            </p>
            <ul className="mb-2">
              {registrants.map((registrant) => (
                <li key={registrant.id}>
                  <button
                    onClick={() => setToInfo(registrant)}
                    className="group hover:font-bold"
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-yellow-400 group-hover:text-yellow-700 mr-2"
                    />
                    {registrant.first_name} {registrant.last_name}
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-xs flex flex-grow items-end">
              {new Date(created_at).toLocaleDateString("en-us", options)}
            </p>

            <div className="flex gap-2 justify-end relative mt-2">
              <button
                className="text-blue-500 font-bold hover:text-blue-400"
                onClick={() => editCallback(id)}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button
                className="text-red-500 font-bold hover:text-red-400"
                onClick={() => deleteCallback(id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs flex flex-grow items-end">
              {new Date(created_at).toLocaleDateString("en-us", options)}
            </p>
            {!is_full && (
              <div className="flex gap-2 justify-end relative mt-2">
                {addCallback ? (
                  <button
                    className="text-green-500 font-bold hover:text-green-400"
                    onClick={() => addCallback(id)}
                  >
                    <FontAwesomeIcon icon={faCalendarPlus} /> Add
                  </button>
                ) : (
                  <button
                    className="text-red-500 font-bold hover:text-red-400"
                    onClick={() => cancelCallback(id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Cancel
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </Transition>
      <Dialog
        open={toInfo !== null}
        onClose={closeModal}
        className="top-0 left-0 right-0 bottom-0 fixed z-50 flex justify-center items-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg p-4 max-w-md z-50 relative mx-4 shadow-xl">
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-0 right-0 cursor-pointer m-1.5"
            color="black"
            size="lg"
            onClick={closeModal}
          ></FontAwesomeIcon>
          <Dialog.Title className="font-bold text-lg mb-2 mt-1">
            {toInfo?.first_name} {toInfo?.last_name}
          </Dialog.Title>
          <table class="table-auto">
            <tr>
              <td>Email&emsp;</td>: {toInfo?.email}
            </tr>
            <tr>
              <td>Age&emsp;</td>: {toInfo?.age}
            </tr>
          </table>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-xs p-1 font-bold text-white rounded hover:bg-red-400"
              onClick={closeModal}
            >
              CLOSE
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Appointment;
