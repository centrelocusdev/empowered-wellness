import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ButtonPrimary from "./ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { BiPhone } from "react-icons/bi";

const GradientCards = ({ data, bg }) => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(true);
  const gradientColors = [
    "from-light-yellow to-white",
    "from-light-skyblue to-white",
    "from-fade-pink to-white",
    "from-light-purple to-white",
  ];

  const handleClick = (url) => {
    navigate(url);
    setDisplay(false);
  };

  useEffect(() => {
    setDisplay(true);
  }, []);

  return (
    <div
      className={`flex justify-center w-full flex-wrap gap-8 p-8 bg-${
        bg ? bg : "gray-100"
      }`}
    >
      {data.map((d, index) => (
        <div
          onClick={(e) => handleClick(d.url)}
          key={index}
          className={`md:w-1/4 p-6 shadow-lg rounded-2xl text-gray-600 bg-gradient-to-bl ${
            gradientColors[index % gradientColors.length]
          }  cursor-pointer  hover:bg-gradient-to-tr ${
            d.phone && "flex justify-between flex-col"
          }`}
        >
          <div>
            <img src={d.icon} alt="" className="w-5" />

            <h4 className="text-2xl font-semibold mt-5 capitalize">
              {d.title}
            </h4>
            <p className="text-gray-500 leading-6 my-3">{d.desc}</p>
          </div>

          {d.phone ? (
            <ButtonPrimary text={d.phone} icon={<BiPhone />} />
          ) : (
            <div className="float-right">
              <ButtonPrimary
                icon={<FaArrowRight />}
                handleClick={(e) => handleClick(d.url)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GradientCards;
