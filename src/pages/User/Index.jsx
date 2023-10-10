import React from "react";
import file from "../../assets/icons/file.png";
import hash from "../../assets/icons/hash.png";
import board from "../../assets/icons/board.png";
import smile from "../../assets/icons/smile.png";
import tree from "../../assets/icons/tree.png";
import user from "../../assets/icons/user.png";
import user_circle from "../../assets/icons/user_circle.png";
import GradientCards from "../../components/GradientCards";
import LargeHeading from "../../components/LargeHeading";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";

const Index = () => {
  return (
    <>
      <Modal />
      <Navbar loggedin={true} />
      <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4">
        <LargeHeading
          text={"Actions Good"}
          goTo={"/"}
          desc={
            "The highlighted options are what we advise you to do or what you can do."
          }
        />
      </div>
      <GradientCards data={data} />
    </>
  );
};

const data = [
  {
    icon: file,
    title: "journal",
    desc: "Unlock the power of self-expression with our secure, easy-to-use journaling feature. Record your thoughts, feelings, and experiences to gain clarity, self-awareness, and emotional healing.",
    url: "/journal",
  },
  {
    icon: tree,
    title: "Mindfulness",
    desc: "Cultivate inner peace and relaxation with our guided imagery, deep breathing, and other mindfulness practices. Learn to manage stress, reduce anxiety, and enhance your overall well being.",
    url: '/mindfulness'
  },
  {
    icon: hash,
    title: "vision board",
    desc: "Visualize your goals and dreams with our customizable vision board feature. Create a personal collage of images, affirmations, and quotes that inspire and motivate you to reach your full potential.",
    url: "/vision-board",
  },
  {
    icon: smile,
    title: "Wellness measures",
    desc: "Gain valuable insights into your emotional wellbeing with our mental health assessments.",
    url: "/wellness-measure",
  },
  {
    icon: user,
    title: "Message Professional",
    desc: "Easily store and manage contact information for your healthcare providers, therapists, and other support professionals, creating a seamless network of care.",
    url: "/message-professional"
  },
  {
    icon: board,
    title: "Assessments",
    desc: "Journaling helps to control your mental health and to improve your mood by: helping you prioritize problems, fears, and Read More",
    url: "/assessments",
  },
  {
    icon: user_circle,
    title: "Support Circle",
    desc: "Share your progress, goals, and insights with your support circle, including friends, family, and mental health professionals. Stay connected and empowered on your journey to wellness.",
    url: "/support-circle",
  },
  {
    icon: smile,
    title: "Crisis Support",
    desc: "Journaling helps to control your mental health and to improve your mood by: helping you prioritize problems, fears, and Read More",
    url: "/crisis-support",
  },
];

export default Index;
