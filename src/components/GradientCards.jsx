import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ButtonPrimary from "./ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { BiPhone } from "react-icons/bi";
import { toast } from "react-toastify";

const GradientCards = ({ data, bg, handleCardClick }) => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(true);
  const gradientColors = [
    "from-light-yellow to-white",
    "from-light-skyblue to-white",
    "from-fade-pink to-white",
    "from-light-purple to-white",
  ];

  const handleClick = (url, id, e) => {
    if (handleCardClick) {
      handleCardClick(url,id,e)
    } else {
      navigate(url);
    }
    setDisplay(false);
  };

  const handlePhoneClick = (phone) => {
    navigator.clipboard.writeText(phone)
      .then(() => {
        toast.success('Phone copied to clipboard!');
      })
      .catch(() => {
        toast.error('Could not copy phone');
      });
  }

  useEffect(() => {
    setDisplay(true);
  }, []);

  return (
    <div className="w-[80%] mx-auto mb-8">
      <div
      className={`flex justify-start mx-atuo flex-wrap gap-8 bg-${bg}`}
    >
      {data.map((d, index) => (
        <div
          onClick={(e) => handleClick(d.url, d?.id, e)}
          key={index}
          className={`md:w-[30%] self-auto p-6 shadow-lg rounded-2xl text-gray-600 bg-gradient-to-bl ${
            gradientColors[index % gradientColors.length]
          }  cursor-pointer  hover:bg-gradient-to-tr flex justify-between flex-col`}
        >
          <div>
            <img src={d.icon} alt="" className="w-5" />

            <h4 className="text-2xl font-semibold mt-5 capitalize">
              {d.title}
            </h4>
            <p className="text-gray-500 leading-6 my-3">{d.desc}</p>
          </div>

          {d.phone ? (
            <ButtonPrimary text={d.phone} icon={<BiPhone />} handleClick={(e) => handlePhoneClick(d.phone)} />
          ) : (
            <div className="flex justify-end">
              <ButtonPrimary
                icon={<FaArrowRight />}
                handleClick={(e) => handleClick(d.url)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default GradientCards;
