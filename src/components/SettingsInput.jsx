import React from "react";

const SettingsInput = ({name, value, type, isRequired, isDisbaled, handleChange}) => {
  return (
    <div className={`md:flex justify-between mt-4 md:py-4 py-1 ${name != 'gender' && 'border-b' }`}>
      <label htmlFor={name} className="capitalize text-lg">
        {name == 'gender' ? value : name.split('_').join(' ')}
        { isRequired && <span className="etxt-sm text-gray-400 lowercase">(requried)</span> }
      </label>

      <input
        type={ type ? type : "text"}
        name={name}
        value={value}
        disabled={isDisbaled}
        onChange={handleChange}
        checked={value == 'male' ? 'male' : 'female'}
        autoFocus
        className={`${!isDisbaled && 'border'} md:w-1/2 px-4 py-2 rounded-lg focus:outline-none focus:border-2 capitalize accent-gray-500 ml-1`}
      />
    </div>
  );
};

export default SettingsInput
