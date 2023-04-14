import React from "react";
import { useNavigate } from "react-router-dom";
import LargeHeading from "../../components/LargeHeading";
import headphones from "../../assets/icons/headphones.png";
import air from "../../assets/icons/air.png";
import circle_board from "../../assets/icons/circles_board.png";
import mindfulness_audio from "../../assets/images/mindfulness_audio.png";
import breathing_exercise from "../../assets/images/breathing_exercise.png";
import meditation from "../../assets/images/meditation.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { FaArrowRight } from "react-icons/fa";

const Mindfulness = () => {
  const navigate = useNavigate()
  const gradientColors = [
    "from-light-skyblue to-white",
    "from-fade-pink to-white",
    "from-light-purple to-white",
  ];

  return (
    <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4">
      <LargeHeading
          text={"mindfulness"}
          desc={
            "Studies show that mindfulness helps reduce anxiety and depression. Mindfulness teaches us how to respond to stress with awareness of what is happening in the present moment, rather than simply acting instinctively, unaware of what emotions or motives may be driving that decision."
          }
        />

      {data.map((d, index) => (
       <div className="mb-8">
         <div
          className={`w-full flex justify-between items-center rounded-3xl gap-8 p-8  bg-gradient-to-b ${
            gradientColors[index % gradientColors.length]
          }`}
        >
          <div className="md:w-2/3">
            <img src={d.icon} alt="" className="w-5" />
            <h4 className="text-2xl font-semibold mt-5 capitalize">
              {d.title}
            </h4>
            <p className="text-gray-500 leading-6 my-3">{d.desc}</p>
          </div>

          <div className="hidden md:block">
            <img src={d.image} alt="" />
          </div>
        </div>
        <div className="flex justify-end">
          <ButtonPrimary icon={<FaArrowRight />} handleClick={(e) => navigate(d.url)} />
        </div>
       </div>
      ))}
    </div>
  );
};

const data = [
  {
    icon: headphones,
    title: "Audio meditation",
    image: mindfulness_audio,
    desc: "Audio meditation is a technique that uses sound and guided instruction to help individuals achieve a state of deep relaxation and mental focus. These guided meditations can be found online or through mobile applications and can range in length from a few minutes to over an hour. Audio meditation has been shown to reduce stress, improve sleep quality, and enhance overall well-being.",
    url: "/mindfulness/audio-meditation",
  },
  {
    icon: air,
    title: "Breathing exercise",
    image: breathing_exercise,
    desc: "Breathing exercises involve slow, deep breaths that can reduce stress and improve overall health. They're easy to do anywhere and have benefits like lower blood pressure and reduced anxiety.",
    url: "/mindfulness/breathing-exercise",
  },
  {
    icon: circle_board,
    title: " Guided meditation",
    image: meditation,
    desc: "Guided meditation is a form of meditation that uses a recorded or live voice to provide instructions and visualization techniques to help individuals relax and focus their minds. It can be done in a group setting or alone, and can range from a few minutes to an hour or more. Guided meditation has been shown to reduce stress, improve mental clarity, and promote overall feelings of calm and well-being.",
    url: "/mindfulness/breathing-exercise",
  },
];

export default Mindfulness;
