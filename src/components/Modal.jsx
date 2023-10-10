import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import Cookies from "js-cookie";

const Modal = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [token, setToken] = useState(!!Cookies.get('access-token'))
  const [modalState, setModalState] = useState(false);

  const handleShowModal = () => {
    if (
      Cookies.get("modal-token") === true ||
      Cookies.get("modal-token") === false
    ) {
      setModalState(Cookies.get("modal-token"));
    }

    if (Cookies.get("modal-token") === undefined) {
      Cookies.set("modal-token", true);
      setModalState(true);
    }
  };

  useEffect(() => {
    handleShowModal();
  }, []);

  const handleCloseClick = () => {
    Cookies.set("modal-token", false);
    setModalState(false);
  };

  return (
    <div
      className={`fixed w-full h-full top-0 left-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
        modalState ? "opacity-100 pointer-events-auto bg-[rgba(0,0,0,0.3)]" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white shadow-lg rounded-3xl md:w-3/5 md:m-auto m-5 md:p-16 p-5 text-center">
        <h2 className="md:text-3xl text-lg my-5">
          Get to know your level of Stress, Depression & Anxiety by taking a
          quick test
        </h2>
        <div className="flex flex-col items-center justify-center">
          <ButtonPrimary
            text={"Test your mood"}
            handleClick={(e) => navigate("/wellness-measure")}
          />
          <button
            onClick={handleCloseClick}
            className="text-gray-500 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
