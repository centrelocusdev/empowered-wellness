import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LargeHeading from "../../components/LargeHeading";
import headphones from "../../assets/icons/headphones.png";
import air from "../../assets/icons/air.png";
import circle_board from "../../assets/icons/circles_board.png";
import mindfulness_audio from "../../assets/images/mindfulness_audio.png";
import breathing_exercise from "../../assets/images/breathing_exercise.png";
import meditation from "../../assets/images/meditation.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { FaArrowRight } from "react-icons/fa";
import MeditationAudio from "../../components/MeditationAudio";
import Navbar from "../../components/Navbar";
import lily from "../../assets/audios/lily.mp3"
import bMedia from '../../assets/audios/breathing_excercise.mp3'
import gMedia from '../../assets/audios/guided_meditation.mp3'
import auMedia1 from '../../assets/audios/newaudio_meditation.mp3'
import auMedia2 from '../../assets/audios/ES_Meditations - Drift Far Away.mp3'
import auMedia3 from '../../assets/audios/ES_Onsen Ritual - Joseph Beg.mp3'
import auMedia4 from '../../assets/audios/ES_Silent Saunas - Mandala Dreams.mp3'
import auMedia5 from '../../assets/audios/ES_Silver Woodlands - Cora Zea.mp3'
import auMedia6 from "../../assets/audios/audio_meditation.mp3"

const Mindfulness = () => {
  const navigate = useNavigate();
  const gradientColors = [
    "from-light-skyblue to-white",
    "from-fade-pink to-white",
    "from-light-purple to-white",
  ];

  const { type } = useParams();
  const types = ["audio-meditation", "breathing-exercise", "meditation"];

  return (
    <>
      <Navbar />
      <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4">
        {type == undefined && (
          <div>
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
                  <ButtonPrimary
                    icon={<FaArrowRight />}
                    handleClick={(e) => navigate(d.url)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {type == types[0] && (
          <div>
            <LargeHeading
              text={"mindfulness audio"}
              goTo={"/mindfulness"}
              desc={
                "Audio meditation is a technique that uses sound and guided instruction to help individuals achieve a state of deep relaxation and mental focus. These guided meditations can be found online or through mobile applications and can range in length from a few minutes to over an hour. Audio meditation has been shown to reduce stress, improve sleep quality, and enhance overall well-being."
              }
            />

            <div className="flex justify-between items-center gap-8">
              <div className="md:w-1/2 hidden md:block">
                <img src={mindfulness_audio} alt="" />
              </div>
              <div className="md:w-1/2">
                <MeditationAudio data={meditationAudio} />
              </div>
            </div>
          </div>
        )}
        {type == types[1] && (
          <div>
            <LargeHeading
              text={"breathing exericise"}
              goTo={"/mindfulness"}
              desc={
                "Breathing exercises involve slow, deep breaths that can reduce stress and improve overall health. They're easy to do anywhere and have benefits like lower blood pressure and reduced anxiety."
              }
            />

            <div className="flex justify-between items-center gap-8">
              <div className="md:w-1/2 hidden md:block">
                <img src={breathing_exercise} alt="" />
              </div>
              <div className="md:w-1/2">
                <MeditationAudio data={breathingExercise} />
              </div>
            </div>
          </div>
        )}
        {type == types[2] && (
          <div>
            <LargeHeading
              text={"guided meditation"}
              goTo={"/mindfulness"}
              desc={
                "Guided meditation is a form of meditation that uses a recorded or live voice to provide instructions and visualization techniques to help individuals relax and focus their minds. It can be done in a group setting or alone, and can range from a few minutes to an hour or more. Guided meditation has been shown to reduce stress, improve mental clarity, and promote overall feelings of calm and well-being."
              }
            />

            <div className="flex justify-between items-center gap-8">
              <div className="md:w-1/2 hidden md:block">
                <img src={meditation} alt="" />
              </div>
              <div className="md:w-1/2">
                <MeditationAudio data={guidedMeditation} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
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
    url: "/mindfulness/meditation",
  },
];

const meditationAudio = [
  {
    title: 'Deep Relaxation Oasis',
    desc: 'The aim of this practice is to move your awareness around the body, paying special attention to areas of tension, gently breathing ‘into’ them.',
    from_grad: 'light-skyblue',
    audio: auMedia1,
  },
  {
    title: 'Stress-Free Zone',
    desc: 'The aim of this practice is to move your awareness around the body, paying special attention to areas of tension, gently breathing ‘into’ them.',
    from_grad: 'light-skyblue',
    audio: auMedia2,
  },
  {
    title: 'Mindful Morning Bliss',
    desc: 'The aim of this practice is to move your awareness around the body, paying special attention to areas of tension, gently breathing ‘into’ them.',
    from_grad: 'light-skyblue',
    audio: auMedia3,
  },
]

const breathingExercise = [
  {
    title: 'Energizing Breathwork',
    desc: 'The aim of this practice is to move your awareness around the body, paying special attention to areas of tension, gently breathing ‘into’ them.',
    from_grad: 'light-skyblue',
    audio: auMedia4,
  },
  {
    title: 'Ocean Wave Breaths',
    desc: 'The aim of this practice is to move your awareness around the body, paying special attention to areas of tension, gently breathing ‘into’ them.',
    from_grad: 'light-skyblue',
    audio: auMedia5,
  },
  {
    title: 'Breath of Serenity',
    desc: 'The aim of this practice is to move your awareness around the body, paying special attention to areas of tension, gently breathing ‘into’ them.',
    from_grad: 'light-skyblue',
    audio: auMedia6,
  },
]

const guidedMeditation = [
  {
    title: 'Journey to Inner Peace',
    desc: 'The aim of this practice is to move your awareness around the body, paying special attention to areas of tension, gently breathing ‘into’ them.',
    from_grad: 'light-skyblue',
    audio: gMedia,
  },
  {
    title: 'Exploring Your Inner Sanctuary',
    desc: 'The aim of this practice is to move your awareness around the body, paying special attention to areas of tension, gently breathing ‘into’ them.',
    from_grad: 'light-skyblue',
    audio: lily,
  },
  {
    title: 'Mindfulness Meditation Adventure',
    desc: 'The aim of this practice is to move your awareness around the body, paying special attention to areas of tension, gently breathing ‘into’ them.',
    from_grad: 'light-skyblue',
    audio: bMedia,
  },
]

export default Mindfulness;
