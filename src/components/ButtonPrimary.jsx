import React from "react";

const ButtonPrimary = ({ text, icon, isLight, handleClick }) => {
  return (
    <button onClick={handleClick} className={`${isLight ? 'text-gray-800 hover:bg-gray-800 hover:text-white' : 'bg-gray-800 text-white hover:bg-white hover:text-gray-800'} shadow text-sm capitalize rounded-full px-6 py-2 border border-gray-800 flex justify-center items-center gap-2 m-2 font-semibold `}>
      {text} {icon}
    </button>
  );
};

export default ButtonPrimary;
