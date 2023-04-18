import React from "react";
import { useParams } from "react-router-dom";
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

const Index = () => {
  const { name } = useParams();
  return (
    <>
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
    desc: "Journaling helps to control your mental health and to improve your mood by: helping you prioritize problems, fears, and Read More",
    url: "/journal",
  },
  {
    icon: tree,
    title: "Mindfulness",
    desc: "Journaling helps to control your mental health and to improve your mood by: helping you prioritize problems, fears, and Read More",
    url: "/mindfulness",
  },
  {
    icon: hash,
    title: "vision board",
    desc: "Journaling helps to control your mental health and to improve your mood by: helping you prioritize problems, fears, and Read More",
    url: "/vision-board",
  },
  {
    icon: smile,
    title: "Wellness measures",
    desc: "Journaling helps to control your mental health and to improve your mood by: helping you prioritize problems, fears, and Read More",
    url: "/wellness-measure",
  },
  {
    icon: user,
    title: "Message Professional",
    desc: "Journaling helps to control your mental health and to improve your mood by: helping you prioritize problems, fears, and Read More",
    url: "/message-professional",
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
    desc: "Journaling helps to control your mental health and to improve your mood by: helping you prioritize problems, fears, and Read More",
    url: "/support-circle",
  },
];

export default Index;
