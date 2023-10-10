import React, { useEffect, useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import { BsArrowRight, BsCheckLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import relaxed from "../../assets/images/relaxed.png";
import namaste from "../../assets/images/namaste.png";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import GradientText from "../../components/GradientText";
import Modal from "../../components/Modal";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const access_token = Cookies.get("access-token");
    access_token && setIsLoggedIn(true);
  }, []);

  return (
    <section className="">
      <Modal />
      <Navbar loggedin={true} />
      <div className="md:flex gap-8 justify-center w-full items-center md:px-16 p-8 text-gray-700">
        <div className="md:w-1/2">
          <GradientText
            text={"Welcome to Empowered Wellness"}
            isUppercase={true}
          />
          <h2 className="md:text-5xl text-3xl tracking-wide">
            Your Personal Mental Health Companion
          </h2>

          <p className="my-5 leading-7 text-gray-500 md:text-left text-justify">
            At Empowered Wellness, we understand the importance of mental
            health and the need for a comprehensive approach to maintaining a
            balanced lifestyle. Our mission is to empower individuals with the
            tools, resources, and support they need to achieve their personal
            wellness goals. With our mobile application and software platform,
            we aim to create a nurturing environment that fosters mental health,
            resilience, and growth for everyone.
          </p>

          <div className="flex md:flex-row flex-col md:justify-start justify-center">
            <ButtonPrimary
              text={"dashboard"}
              icon={<BsArrowRight />}
              handleClick={(e) => navigate("/dashboard")}
            />
            {!isLoggedIn && (
              <ButtonPrimary
                text={"Sign up"}
                icon={<BsArrowRight />}
                handleClick={(e) => navigate("/register")}
                isLight={true}
              />
            )}
          </div>
        </div>

        <div className="w-1/2 hidden md:block p-12 ">
          <img src={relaxed} alt="relaxed yoga girl" className="" />
        </div>
      </div>
      <div className="bg-gray-50 md:p-16 p-8">
        <div className="md:text-center md:w-2/3 mx-auto ">
          <GradientText
            text={"Discover a Holistic Approach to Mental Health"}
            isUppercase={true}
          />
          <h2 className="text-4xl">
            Our innovative platform offers an all-in-one solution for managing
            and improving your mental Wellness
          </h2>
        </div>

        <div className="md:flex justify-between gap-6 md:mt-8 ">
          <div className="md:w-1/3">
            {left_features.map((f, key) => (
              <div key={key} className="my-5">
                <h6 className="font-semibold text-lg text-fade-pink flex items-center gap-1">
                  <BsCheckLg />
                  <GradientText text={f.title} />
                </h6>
                <p className="tracking-6 text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="my-auto">
            <img src={namaste} alt="Yoga image" className="rounded-full" />
          </div>
          <div className="md:w-1/3">
            {right_features.map((f, key) => (
              <div key={key} className="my-5">
                <h6 className="font-semibold text-lg text-fade-pink flex items-center gap-1">
                  <BsCheckLg />
                  <GradientText text={f.title} />
                </h6>
                <p className="tracking-6 text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:p-16 p-8 md:w-2/3 mx-auto flex flex-col justify-center items-center text-center">
        <GradientText
          text={"Join the Empowered Wellness Community"}
          fontSize={"3xl"}
        />

        <p className="text-gray-500 tracking-6 mt-5">
          Take the first step towards a happier, healthier life with Empowered
          Wellness. Download our app and join our growing community of
          individuals committed to supporting one another on the path to mental
          wellness. Together, we can create a brighter future for ourselves and
          those we care about.
        </p>

        <ButtonPrimary
          text={"sign up"}
          handleClick={(e) => navigate("/register")}
        />
      </div>
      <Footer />
    </section>
  );
};

const left_features = [
  {
    title: "Wellness Measures",
    desc: "Gain valuable insights into your emotional Wellness with our mental health assessments.",
  },
  {
    title: "Reflective Journaling",
    desc: "Unlock the power of self-expression with our secure, easy-to-use journaling feature. Record your thoughts, feelings, and experiences to gain clarity, self-awareness, and emotional healing.",
  },
  {
    title: "Mindfulness Exercises",
    desc: "Cultivate inner peace and relaxation with our guided imagery, deep breathing, and other mindfulness practices. Learn to manage stress, reduce anxiety, and enhance your overall well being.",
  },
  {
    title: "Vision Board",
    desc: "Visualize your goals and dreams with our customizable vision board feature. Create a personal collage of images, affirmations, and quotes that inspire and motivate you to reach your full potential.",
  },
];

const right_features = [
  {
    title: "Crisis Support",
    desc: "Access immediate help when you need it most. Our platform provides quick access to crisis support contacts, ensuring you always have someone to turn to in times of need.",
  },
  {
    title: "Support Circle",
    desc: "Share your progress, goals, and insights with your support circle, including friends, family, and mental health professionals. Stay connected and empowered on your journey to wellness.",
  },
  {
    title: "Message Professional",
    desc: "Easily store and manage contact information for your healthcare providers, therapists, and other support professionals, creating a seamless network of care.",
  },
];

export default Home;
