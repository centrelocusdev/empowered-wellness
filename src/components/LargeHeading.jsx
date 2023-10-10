import React from "react";
import arrow_circle from "../assets/icons/left_arrow_circle.png";
import { useNavigate } from "react-router-dom";

const LargeHeading = ({text, desc, goTo}) => {
  const navigate = useNavigate()
  const handleClick = (e) => {
    goTo ? navigate(goTo) : navigate('/dashboard')
  }

  return (
    <div>
      <div className="flex md:gap-4 gap-2">
      <button onClick={handleClick} className="">
        <img src={arrow_circle} alt="" className="md:w-10 w-7" />
      </button>
      <h4 className="md:text-4xl text-2xl capitalize">{text}</h4>
    </div>
      <div className="my-5 text-gray-500">{desc}</div>
    </div>
  );
};

export default LargeHeading;
