import React from "react";

const InputPrimary = ({ label, name, placeholer, width, type }) => {
  return (
    <div className={`text-gray-600 ${!width && 'md:w-1/2 w-full'} md:mt-5 mt-3`}>
      <label htmlFor={name} className="capitalize font-semibold block">
        {label}
      </label>
      <input
        type={type ? type : 'text'}
        name={name}
        placeholder={placeholer}
        className="focus:outline-none w-full focus:border-sky-500 border rounded-lg px-4 py-2 mt-1"
      />
    </div>
  );
};

export default InputPrimary;
