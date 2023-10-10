import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LargeHeading from "../../components/LargeHeading";
import GradientCards from "../../components/GradientCards";
import { dass, epds, phq } from "../../temp_db/questions";
import scale from "../../assets/icons/scale.png";
import heart from "../../assets/icons/heart.png";
import hash from "../../assets/icons/hash.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { BiSad, BiChevronLeft } from "react-icons/bi";
import Navbar from "../../components/Navbar";
import {
  getAssessmentQuestions,
  getAssessmentsMeta,
  saveAssessment,
  getAllAssessmentsSpan,
  getAllAssessments,
} from "../../API";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import GradientText from "../../components/GradientText";

const Assessments = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const types = ["DASS-21", "PHQ-9", "EPDS"];
  const [isAlreadyTaken, setIsAlreadyToken] = useState();
  const [assessments, setAssessments] = useState([]);
  const [dassQuestions, setDassQuestions] = useState([]);
  const [epdsQuestions, setEpdsQuestions] = useState([]);
  const [phqQuestions, setPhqQuestions] = useState([]);
  const icons = [scale, heart, hash];
  const [dassRes, setDassRes] = useState(() => {
    const storedResponses = localStorage.getItem("dassResponses");
    return storedResponses ? JSON.parse(storedResponses) : [];
  });
  const [epdsRes, setEpdsRes] = useState([]);
  const [phqRes, setPhqRes] = useState(() => {
    const storedResponses = localStorage.getItem("phqResponses");
    return storedResponses ? JSON.parse(storedResponses) : [];
  });
  const [toggleModal, setToggleModal] = useState(true)
  const [dassPopup, setDassPopup] = useState(true)
  const [phqPopup, setPhqPopup] = useState(true)
  const [epdsPopup, setEpdsPopup] = useState(true)
    const [dassAvg, setDassAvg] = useState(0)
    const [epdAvg, setEpdAvg] = useState(0)
    const [phqAvg, setPhqAvg] = useState(0)

    const handleAsesmentPopup = (text, avg) => {
      console.log(toggleModal)
      setToggleModal((toggleModal) => !toggleModal)
      text === 'dass'
        ? setDassAvg(avg)
        : (text === 'phq'
        ? setPhqAvg(avg)
        : setEpdAvg(avg))
    }
    
    const handleModalClick = () => {
      console.log(toggleModal)
      setToggleModal((toggleModal) => !toggleModal)
      //  text ==='dass'? setDassAvg(avg) : (text ==='phq' ? setPhqAvg(avg) : setEpdAvg(avg))

    }

  useEffect(() => {
    localStorage.setItem("dassResponses", JSON.stringify(dassRes));
    localStorage.setItem("phqResponses", JSON.stringify(phqRes));
    localStorage.setItem("epdsResponses", JSON.stringify(epdsRes));
    const runIt = async () => {
      const res = await getAssessmentsMeta();
      setAssessments(
        res.map((r, i) => {
          return {
            id: r.id,
            title: r.name,
            desc: r.description,
            url: `/assessments/${r.code}`,
            icon: icons[i],
          };
        })
      );

      setDassQuestions(await getAssessmentQuestions(1));
      setPhqQuestions(await getAssessmentQuestions(2));
      setEpdsQuestions(await getAssessmentQuestions(3));

      const date = new Date ()
      const today = `${date.getFullYear()}-${
        (date.getMonth() + 1).toString().padStart(2, '0')
      }-${(date.getDate() - 1).toString().padStart(2, '0')}`;
      const ass = await getAllAssessments();
      const filteredAss = ass.filter(f => f.date == today)
      setIsAlreadyToken(filteredAss);
    };

    runIt();
  }, []);

  const handleCardClick = async (url, id, e) => {
    if (isAlreadyTaken?.length) {
      toast.warning("You have already taken the test today");
      setAssessments(updatedItems);
      navigate('/assessments')
    } else {
      await getAssessmentQuestions(id);
      navigate(url);
    }
  };

  const handleDassRes = (qId, oId) => {
    const newResponses = [...dassRes];
    const index = newResponses.findIndex((r) => r.question === qId);
    if (index === -1) {
      newResponses.push({ question: qId, option: oId });
    } else {
      newResponses[index].option = oId;
    }
    setDassRes(newResponses);
  };

  const handlePhqRes = (qId, oId) => {
    const newResponses = [...phqRes];
    const index = newResponses.findIndex((r) => r.question === qId);
    if (index === -1) {
      newResponses.push({ question: qId, option: oId });
    } else {
      newResponses[index].option = oId;
    }
    setPhqRes(newResponses);
  };

  const handleEpdsRes = (qId, oId) => {
    const newResponses = [...epdsRes];
    const index = newResponses.findIndex((r) => r.question === qId);
    if (index === -1) {
      newResponses.push({ question: qId, option: oId });
    } else {
      newResponses[index].option = oId;
    }
    setEpdsRes(newResponses);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    let responses = "";
    let success = ''
    if (type == "dass") {
      if (dassRes?.length !== dassQuestions?.length) {
        toast.error("Please complete the assessment");
        return
      } else {
        responses = JSON.stringify(dassRes);
        success = await saveAssessment({ assessment: 1, responses });
        let avg = 0
        success.forEach((item)=>{
          avg += item.option_score
        })
        avg = Math.ceil((avg) / success.length)
        setDassAvg(avg)
        setDassPopup(false)
        console.log(dassAvg,"inhandleclick",toggleModal,type
        
        
        
        )
        console.log(success)
        localStorage.removeItem("dassResponses");
        setDassRes([]);
        // handleAsesmentPopup('dass',avg)
        setToggleModal(false)
      }
    } else if (type == "phq") {
      if (phqRes?.length !== phqQuestions?.length) {
        toast.error("Please complete the assessment");
      } else {
        responses = JSON.stringify(phqRes);
        success = await saveAssessment({ assessment: 2, responses });
         let avg = 0
         success.forEach((item) => {
           avg += item.option_score
         })
         avg = Math.ceil(avg / success.length)
         setPhqAvg(avg)
         setPhqPopup(false)
         console.log(avg)
        console.log(success)
        localStorage.removeItem("phqResponses");
        setPhqRes([]);
        // handleModalClick()
        handleAsesmentPopup('phq', avg)
      }
    } else if (type == "epds") {
      if (epdsRes?.length !== epdsQuestions?.length) {
        toast.error("Please complete the assessment");
      } else {
        responses = JSON.stringify(epdsRes);
        success = await saveAssessment({ assessment: 2, responses });
         let avg = 0
         success.forEach((item) => {
           avg += item.option_score
         })
         avg = Math.ceil(avg / success.length)
         setEpdAvg(avg)
         setEpdsPopup(false)
         console.log(avg)
        console.log(success)
        localStorage.removeItem("epdsResponses");
        setEpdsRes([]);
        handleAsesmentPopup('epds', avg)
      }
    }
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radioButton) => (radioButton.checked = false));
    // success && navigate("/support-circle");
  };

  return (
    <>
      <Navbar />
      {type === undefined && (
        <div className="">
          <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4">
            <LargeHeading
              text={'Assessments'}
              desc={
                'Completing an assessment gives us a picture of the way you think, feel, and reason. These tests assess your emotional wellbeing. We want to help you find the right path to better understand yourself and enjoy the journey to your inner thoughts and feelings.'
              }
            />
          </div>

          {assessments.length ? (
            <GradientCards
              data={assessments}
              bg={'white'}
              handleCardClick={handleCardClick}
            />
          ) : (
            <div className="flex justify-center text-3xl text-gray-400">
              <FaSpinner />
            </div>
          )}
        </div>
      )}

      <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4">
        {type === types[0] && toggleModal ? (
          <div>
            <LargeHeading
              text={'Depression, Anxiety, and Stress Scale.'}
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
              goTo={'/assessments'}
            />

            {dassQuestions.length ? (
              <>
                {dassQuestions.map((q, index) => (
                  <div key={q.id} className="my-5 w-fit">
                    <h6 className="text-lg font-semibold text-gray-600">
                      {index + 1}. {q.text}
                    </h6>
                    <div className="flex flex-col gap-3 mt-2 w-full justify-between">
                      {q.options.map((option, i) => (
                        <div key={option.id} className="">
                          <input
                            type="radio"
                            id={option.id}
                            name={q.id}
                            value={option.id}
                            checked={dassRes.find(
                              (r) =>
                                r.question === q.id && r.option === option.id
                            )}
                            onChange={() => handleDassRes(q.id, option.id)}
                            className="focus:accent-gray-900 accent-gray-800 mr-2"
                          />
                          <label>{option.text}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <ButtonPrimary
                  text={'submit'}
                  handleClick={(e) => handleSubmit(e, 'dass')}
                />
              </>
            ) : (
              <div className="flex justify-center text-3xl text-gray-400">
                <FaSpinner />
              </div>
            )}
          </div>
        ) : (
          <div>
            <div
              className={`${toggleModal && 'hidden'} ${dassPopup && 'hidden'}
    h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex justify-center items-center`}
            >
              {' '}
              {console.log(dassAvg, 'in toggle', toggleModal, type)}
              <div className="bg-white shadow-lg rounded-3xl md:w-2/5  md:h-3/5 md:m-auto m-5 md:p-12 p-5  ">
                <div className=" mx-auto  ">
                  <h2 className="md:text-3xl text-lg my-5 ">
                    Wellness Measure
                  </h2>
                  <h5
                    className={`text-transparent bg-clip-text bg-gradient-to-r from-light-blue via-fade-pink to-fade-pink text-shadow capitalize text-3xl
                    `}
                  >
                    Your Assessment Score is
                    <font size="+6">
                      <b>{` ${dassAvg}`}</b>
                    </font>
                  </h5>
                  {/* <h2 className="text-lg">{`Your welleness measure is ${avg}`}</h2> */}

                  <div className=" pt-5 max-h-fit max-w-full grid  gap-2">
                    {/* <button
                      type={'button'}
                      text={'Mindfulness'}
                      onClick={() => navigate('/mindfulness')}
                      class=" text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Mindfulness
                    </button>
                    <button
                      text={'message-professional'}
                      onClick={() => navigate('/message-professional')}
                      type="button"
                      class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Message Professional
                    </button>
                    <button
                      type="button"
                      text={'support-circle'}
                      onClick={() => navigate('/support-circle')}
                      class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Support-Circle
                    </button> */}
                    <button
                      type={'button'}
                      text={'close'}
                      onClick={handleModalClick}
                      class="mt-10 hover:mt-12 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {type === types[1] && toggleModal ? (
          <div>
            <LargeHeading
              text={'Patient Health Questionnaire'}
              desc={
                'Over the last 2 weeks, how often have you been bothered by any of the following problems?'
              }
              goTo={'/assessments'}
            />

            {phqQuestions.length ? (
              <>
                {phqQuestions.map((q, index) => (
                  <div key={q.id} className="my-5 w-fit">
                    <h6 className="text-lg font-semibold text-gray-600">
                      {index + 1}. {q.text}
                    </h6>
                    <div className="flex flex-col gap-3 mt-2 w-full justify-between">
                      {q.options.map((option, i) => (
                        <div key={option.id} className="">
                          <input
                            type="radio"
                            id={option.id}
                            name={q.id}
                            value={option.id}
                            checked={phqRes.find(
                              (r) =>
                                r.question === q.id && r.option === option.id
                            )}
                            onChange={() => handlePhqRes(q.id, option.id)}
                            className="focus:accent-gray-900 accent-gray-800 mr-2"
                          />
                          <label>{option.text}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <ButtonPrimary
                  text={'submit'}
                  handleClick={(e) => handleSubmit(e, 'phq')}
                />
              </>
            ) : (
              <div className="flex justify-center text-3xl text-gray-400">
                <FaSpinner />
              </div>
            )}
          </div>
        ) : (
          <div>
            <div
              className={`${toggleModal && 'hidden'}  ${phqPopup && 'hidden'}
    h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex justify-center items-center`}
            >
              {console.log(phqAvg, 'in toggle', toggleModal, type)}
              <div className="bg-white shadow-lg rounded-3xl md:w-2/5  md:h-3/5 md:m-auto m-5 md:p-12 p-5  ">
                <div className=" mx-auto  ">
                  <h2 className="md:text-3xl text-lg my-5 ">
                    Wellness Measure
                  </h2>
                  {/* <GradientText
                    text={`Your Assessment Score is  ${phqAvg}`}
                    fontSize={'2xl'}
                  /> */}
                  <h5
                    className={`mt-5 text-transparent bg-clip-text bg-gradient-to-r from-light-blue via-fade-pink to-fade-pink text-shadow capitalize text-3xl
                    `}
                  >
                    Your Assessment Score is
                    <font size="+6">
                      <b>{` ${phqAvg}`}</b>
                    </font>
                  </h5>
                  {/* <h2 className="text-lg">{`Your welleness measure is ${avg}`}</h2> */}

                  <div className=" pt-5 max-h-fit max-w-full grid  gap-2">
                    <button
                      type={'button'}
                      text={'Mindfulness'}
                      onClick={() => navigate('/mindfulness')}
                      class=" text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Mindfulness
                    </button>
                    <button
                      text={'message-professional'}
                      onClick={() => navigate('/message-professional')}
                      type="button"
                      class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Message Professional
                    </button>
                    <button
                      type="button"
                      text={'support-circle'}
                      onClick={() => navigate('/support-circle')}
                      class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Support-Circle
                    </button>
                    <button
                      type={'button'}
                      text={'close'}
                      onClick={handleModalClick}
                      class="mt-4 hover:mt-6 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {type === types[2] && (
          <div>
            <LargeHeading
              text={'Edinburgh Postnatal Depression Scale'}
              desc={
                'The EPDS is a ten (10) item questionnaire. Women are asked to answer each question in terms of the past seven days.'
              }
              goTo={'/assessments'}
            />

            {epds.map(({ question, options }, index) => (
              <div className="my-5 w-fit">
                <h6 className="text-lg ">
                  {index + 1}. {question}
                </h6>
                <div className="flex flex-col gap-3 w-full justify-between mt-3">
                  {Object.values(options).map((op) => (
                    <div className="text-base">
                      {' '}
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
            <ButtonPrimary
              text={'submit'}
              handleClick={(e) => handleSubmit(e, 'epds')}
            />
          </div>
        )}
        {!types.includes(type) && type != undefined && (
          <div className="text-center md:text-4xl text-2xl flex flex-col items-center">
            <BiSad />
            <h2 className="">Oops! Bad Request</h2>

            <ButtonPrimary
              text={'Go Back'}
              handleClick={(e) => navigate('/assessments')}
            />
          </div>
        )}
      </div>
    </>
  )
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
