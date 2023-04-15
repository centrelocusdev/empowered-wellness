import React from "react";
import pause from "../assets/icons/pause.png";

const MeditationAudio = ({ data }) => {
  return (
    <>
      {data.map(({title, desc, from_grad}, key) => (
        <div
          key={key}
          className={`md:flex gap-4 items-center rounded-3xl px-5 py-3 my-3 shadow-lg bg-gradient-to-l via-white from-${from_grad} to-white`}
        >
          <div className="w-1/5 mb-3 md:mb-0">
            <img src={pause} alt="" className="" />
          </div>

          <div>
            <h4 className="text-fade-brown text-xl">{title}</h4>
            <p className="text-gray-500">{desc}</p>

            <input
              type="range"
              max="30"
              min="0"
              value='12'
              className="accent-light-skyblue w-full text-white border-none"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default MeditationAudio;
