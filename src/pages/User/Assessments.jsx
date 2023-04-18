import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import LargeHeading from "../../components/LargeHeading";
import GradientCards from "../../components/GradientCards";
import { dass, epds, phq } from "../../temp_db/questions";
import scale from "../../assets/icons/scale.png";
import heart from "../../assets/icons/heart.png";
import hash from "../../assets/icons/hash.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { BiSad, BiChevronLeft } from "react-icons/bi"
import Navbar from "../../components/Navbar";

const Assessments = () => {
  const navigate = useNavigate()
  const { type } = useParams();
  const types = ["dass", "phq", "epds"];

  return (
    <>
    <Navbar />
      {type === undefined && (
        <div className="">
          <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4">
            <LargeHeading
              text={"Assessments"}
              desc={
                "Completing an assessment gives us a picture of the way you think, feel, and reason. These tests assess your emotional wellbeing. We want to help you find the right path to better understand yourself and enjoy the journey to your inner thoughts and feelings."
              }
            />
          </div>

          <GradientCards data={data} bg={"white"} />
        </div>
      )}

      <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4">
        {type === types[0] && (
          <div>
            <LargeHeading
              text={"Depression, Anxiety, and Stress Scale."}
              desc={
                <span>
                  Please read each statement and select 0, 1, 2, or 3, which
                  indicates how often you have been bothered by any of the
                  listed problems. There are no right or wrong answers. Do not
                  spend too much time on any statement.
                  <ul className="list-none mt-3">
                    <li>0 - Did not apply to me at all</li>
                    <li>
                      1 - Applied to me to some degree, or some of the time
                    </li>
                    <li>
                      2 - Applied to me to a considerable degree, or a good part
                      of the time
                    </li>
                    <li>3 - Applied to me very much, or most of the time</li>
                  </ul>
                </span>
              }
              goTo={"/assessments"}
            />

            {dass.map(({ question, options }, index) => (
              <div className="my-3 w-fit">
                <h6 className="text-lg ">
                  {index + 1}. {question}
                </h6>
                <div className="flex gap-4 w-full justify-between">
                  {Object.values(options).map((op) => (
                    <div className="mt-2">
                      {" "}
                      <input
                        type="radio"
                        name={index}
                        className="focus:accent-gray-900 accent-gray-700"
                      />
                      <label>{op}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <ButtonPrimary text={'submit'} />
          </div>
        )}
        {type === types[1] && (
          <div>
            <LargeHeading
              text={"Patient Health Questionnaire"}
              desc={
                "Over the last 2 weeks, how often have you been bothered by any of the following problems?"
              }
              goTo={"/assessments"}
            />

            {phq.map(({ question, options }, index) => (
              <div className="my-5 w-fit">
                <h6 className="text-lg ">
                  {index + 1}. {question}
                </h6>
                <div className="flex flex-col gap-3 w-full justify-between mt-3">
                  {Object.values(options).map((op) => (
                    <div className="text-base">
                      {" "}
                      <input
                        type="radio"
                        name={index}
                        className="focus:accent-gray-900 accent-gray-700 mr-2"
                      />
                      <label>{op}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <ButtonPrimary text={'submit'} />
          </div>
        )}
        {type === types[2] && (
          <div>
            <LargeHeading
              text={"Edinburgh Postnatal Depression Scale"}
              desc={
                "The EPDS is a ten (10) item questionnaire. Women are asked to answer each question in terms of the past seven days."
              }
              goTo={"/assessments"}
            />

            {epds.map(({ question, options }, index) => (
              <div className="my-5 w-fit">
                <h6 className="text-lg ">
                  {index + 1}. {question}
                </h6>
                <div className="flex flex-col gap-3 w-full justify-between mt-3">
                  {Object.values(options).map((op) => (
                    <div className="text-base">
                      {" "}
                      <input
                        type="radio"
                        name={index}
                        className="focus:accent-gray-900 accent-gray-700 mr-2"
                      />
                      <label>{op}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <ButtonPrimary text={'submit'} />
          </div>
        )}
        {(!types.includes(type) && type != undefined) && (
          <div className="text-center md:text-4xl text-2xl flex flex-col items-center">
            <BiSad />
            <h2 className="">Oops! Bad Request</h2>

            <ButtonPrimary text={'Go Back'} handleClick={(e) => navigate('/assessments')} />
          </div>
        )}

        
      </div>
    </>
  );
};

const data = [
  {
    icon: scale,
    title: "Depression, Anxiety, and Stress Scale.",
    desc: "DASS-21- The Depression, Anxiety, and Stress scale is a set of three self-report scales designed to measure the emotional states of Read More",
    url: "/assessments/dass",
  },
  {
    icon: heart,
    title: "Patient Health Questionnaire",
    desc: "DASS-21- The Depression, Anxiety, and Stress scale is a set of three self-report scales designed to measure the emotional states of Read More",
    url: "/assessments/phq",
  },
  {
    icon: hash,
    title: "Edinburgh Postnatal Depression Scale",
    desc: "DASS-21- The Depression, Anxiety, and Stress scale is a set of three self-report scales designed to measure the emotional states of Read More",
    url: "/assessments/epds",
  },
];

export default Assessments;
