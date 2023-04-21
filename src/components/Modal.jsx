import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";

const Modal = () => {
  const navigate = useNavigate()
  const [close, setClose] = useState(false);
  const handleCloseClick = () => {
    console.log('clicked')
    setClose((close) => !close);
  };

  useEffect(() => {
    setClose(false)
  }, [])

  return (
    <div className={`${close && 'hidden'}
    h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex justify-center items-center`}>
      <div className="bg-white shadow-lg rounded-3xl md:w-3/5 md:m-auto m-5 md:p-16 p-5 text-center">
        <h2 className="md:text-3xl text-lg my-5">
          Get to know your level of Stress, Depression & Anxiety by taking a
          quick test
        </h2>
        <div className="flex flex-col items-center justify-center">
          <ButtonPrimary text={"Test your mood"} handleClick={(e) => navigate('/wellness-measure')} />
          <button onClick={handleCloseClick} className="text-gray-500 hover:underline">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
