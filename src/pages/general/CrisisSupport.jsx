import React from "react";
import LargeHeading from "../../components/LargeHeading";
import GradientCards from "../../components/GradientCards";
import inject from "../../assets/icons/inject.png";
import lab from "../../assets/icons/lab.png";
import male from "../../assets/icons/male.png";
import research from "../../assets/icons/research.png";
import sprevent from "../../assets/icons/sprevent.png";
import tracking from "../../assets/icons/tracking.png";
import sad from "../../assets/icons/sad.png";
import wave from "../../assets/icons/wave.png";
import user_circle from "../../assets/icons/user_circle.png";
import Navbar from "../../components/Navbar";

const CrisisSupport = () => {
  return (
    <>
    <Navbar />
      <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4">
        <LargeHeading
          text={"crisis support"}
          goTo={"/"}
          desc={
            "Use in any emergency circumstance. An emergency is any situation that requires immediate assistance from the police, fire department or ambulance. When you call 911, be prepared to answer the call-taker's questions, which may include: The location of the emergency, including the street address; The phone number you are calling from; The nature of the emergency; Details about the emergency"
          }
        />
      </div>

      <GradientCards data={data} />
    </>
  );
};

const data = [
  {
    icon: inject,
    title: "Substance Abuse & Mental Health Services Administration",
    phone: "1-800-662-4357",
  },
  {
    icon: lab,
    title: "CDC Center For Injury Prevention Hotline",
    phone: "1-800-662-4357",
  },
  {
    icon: wave,
    title: "Crisis Hotline",
    phone: "1-800-662-4357",
  },
  {
    icon: user_circle,
    title: "Sexual Assualt Hotline",
    phone: "1-800-662-4357",
  },
  {
    icon: sad,
    title: "Domestic Violence Hotline",
    phone: "1-800-662-4357",
  },
  {
    icon: tracking,
    title: "Human Trafficking Hotline",
    phone: "1-800-662-4357",
  },
  {
    icon: sprevent,
    title: "Suicide Prevention",
    phone: "1-800-662-4357",
  },
  {
    icon: research,
    title: "Stalking Resource Center",
    phone: "1-800-662-4357",
  },
  {
    icon: male,
    title: "Violence Against Women Network",
    phone: "1-800-662-4357",
  },
];

export default CrisisSupport;
