import React from "react";

const SettingsInput = (props) => {
  const {
    name,
    value,
    type,
    isRequired,
    isDisbaled,
    handleChange,
  } = props
  return (
    <div
      className={`md:flex justify-between mt-4 md:py-4 py-1 ${
        name != "gender" && "border-b"
      }`}
    >
      {name != "gender" ? (
        <>
          <label htmlFor={name} className="capitalize text-lg">
            {name == "gender" ? value : name.split("_").join(" ")}
            {isRequired && (
              <span className="text-sm text-gray-400 lowercase">
                (requried)
              </span>
            )}
          </label>

          <input
            type={type ? type : "text"}
            name={name}
            value={value}
            disabled={isDisbaled}
            onChange={handleChange}
            checked={
              value == "male" ? "male" : value == "female" ? "female" : false
            }
            autoFocus
            className={`${
              !isDisbaled && "border"
            } md:w-1/2 px-4 py-2 rounded-lg focus:outline-none focus:border-2 accent-gray-500 ml-1`}
          />
        </>
      ) : (
        <>
          <label htmlFor={name} className="capitalize text-lg">
            male
            {isRequired && (
              <span className="etxt-sm text-gray-400 lowercase">
                (requried)
              </span>
            )}
          </label>
          <input
            type="radio"
            name={name}
            value={"male"}
            disabled={isDisbaled}
            onChange={handleChange}
            checked={value == "male"}
            className={`${
              !isDisbaled && "border"
            } md:w-1/2 px-4 py-2 rounded-lg focus:outline-none focus:border-2 accent-gray-500 ml-1`}
          />

          <label htmlFor={name} className="capitalize text-lg ml-3">
            female
            {isRequired && (
              <span className="etxt-sm text-gray-400 lowercase">
                (requried)
              </span>
            )}
          </label>
          <input
            type="radio"
            name={name}
            value={"female"}
            disabled={isDisbaled}
            onChange={handleChange}
            checked={value == "female"}
            className={`${
              !isDisbaled && "border"
            } md:w-1/2 px-4 py-2 rounded-lg focus:outline-none focus:border-2 accent-gray-500 ml-1`}
          />
        </>
      )}
    </div>
  );
};

export default SettingsInput;
