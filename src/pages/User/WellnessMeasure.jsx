import React, { useState } from "react";
import LargeHeading from "../../components/LargeHeading";
import GradientText from "../../components/GradientText";
import ButtonPrimary from "../../components/ButtonPrimary";

const WellnessMeasure = () => {
  const [formData, setFormData] = useState({
    stress: "3",
    despression: "3",
    anxiety: "3",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const inputs = ["stress", "depression", "anxiety"];

  return (
    <div className="px-8 md:w-4/5 mx-auto py-4">
      <LargeHeading
        text={"wellness measure"}
        desc={
          " Wellness measures are used to track how you are feeling from moment to moment and can be used to track varying moods by users. Measures range from zero (0) as being the least stressed to ten (10) being the most stressed."
        }
      />

      <div className=" bg-gray-50 p-8 rounded-3xl flex flex-col justify-center items-center">
        <GradientText
          text={"indicate where your levels are"}
          fontSize={"3xl"}
        />

        <form
          onChange={handleChange}
          onSubmit={handleSubmit}
          className="md:w-1/2"
        >
          {inputs.map((input) => (
            <div className="md:flex gap-3 items-center mt-5">
              <label className="text-xl md:w-2/5 capitalize">{input}</label>
              <input
                type="range"
                name={input}
                value={formData[input]}
                max={10}
                className="w-full accent-gray-800 bg-gray-300 rounded-full range"
              />{" "}
              <span>10</span>
            </div>
          ))}

          <div className="flex justify-center mt-3">
            <ButtonPrimary text={"Track how are you feeling"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default WellnessMeasure;
