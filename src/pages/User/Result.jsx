import React, { useEffect, useState } from "react";
import LargeHeading from "../../components/LargeHeading";
import Navbar from "../../components/Navbar";
import { useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import {
  viewMoodTestData,
  viewMoodTestDataSpan,
  viewJournalData,
  viewJournalDataSpan,
  viewAssessmentData,
  viewAssessmentDataSpan,
  getUserBasicInfo,
  getAllAssessmentsSpan,
} from "../../API";

const Result = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const user_id = searchParams.get("user_id");
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");
  const [user, setUser] = useState("");
  const [moodTestData, setMoodTestData] = useState();
  const [journalData, setJournalData] = useState();
  const [assessmentData, setAssessmentData] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [assessmentName, setAssessmentName] = useState("");

  const types = ["mood_test", "journal", "assessment"];

  useEffect(() => {
    const init = async () => {
      const res = await getUserBasicInfo();
    };

    init();

    if (type === types[0]) {
      const runIt = async () => {
        const res =
          start_date && end_date
            ? await viewMoodTestDataSpan({ user_id, start_date, end_date })
            : await viewMoodTestData({ mood_id: id, user_id });
        setMoodTestData(res);
      };
      runIt();
    } else if (type == types[1]) {
      const runIt = async () => {
        const res =
          start_date && end_date
            ? await viewJournalDataSpan({ user_id, start_date, end_date })
            : await viewJournalData({ journal_id: id, user_id });
        setJournalData(res);
      };
      runIt();
    } else if (type == types[2]) {
      const runIt = async () => {
        const today = `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`;
        const res = await getAllAssessmentsSpan({
          start_date,
          end_date,
        });
        setAssessmentData(res);
      };
      runIt();
    }

    assessmentData && setAssessmentName(assessmentData[0].name);
  }, []);

  console.log(assessmentData)

  return (
    <>
      <Navbar />
      <div className="md:px-8 md:w-4/5 mx-auto p-4">
        <LargeHeading text={"Results"} goTo={type == types[1] && "/journal"} />

        {type == types[0] && (
          <div className="">
            <h4 className="text-2xl border-b">Mood Test </h4>

            <div className="">
              {moodTestData?.map((d, i) => (
                <div className=" mt-6 bg-gray-50 p-8 rounded-3xl my-3">
                  {Object.keys(d).map((value) => (
                    <div className="flex md:w-3/5 mx-auto justify-between text-lg mb-2">
                      {value != "id" && (
                        <>
                          <h5 className="capitalize">
                            {value.split("_").join(" ")}
                          </h5>
                          <h5>
                            {value == "created_at"
                              ? new Date(d[value]).toDateString()
                              : d[value]}
                          </h5>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        {type == types[1] && (
          <div className="">
            <h4 className="text-2xl border-b">Journal</h4>

            <div className="">
              {journalData?.map((d, i) => (
                <>
                  <div className="p-5 shadow-lg rounded-3xl gap-8 md:w-4/5 mx-auto">
                    <img
                      src={`https://ew.thedelvierypointe.com${d.image}`}
                      className="w-full rounded-3xl h-[20rem] object-cover"
                    />
                    <div>
                      {Object.keys(d).map((value) => (
                        <div className="">
                          {value !== "image" && value !== "id" && (
                            <div className="capitalize mt-4 text-gray-500 mr-5">
                              {value == "created_at" ? (
                                <>
                                  <h5 className="mb-2 text-right">
                                    {new Date(d[value]).toDateString()}
                                  </h5>
                                </>
                              ) : (
                                <>
                                {console.log(d,d[value])}
                                  {/* <h5 className="mb-2 text-lg">{value == 'title' ? <span className="text-3xl font-medium">{d[value]}</span> : d[value]}</h5>                         */}
                                  <h5 className="mb-2 text-lg">{value == 'title' ? <span className="text-3xl font-medium"><ReactQuill value={d[value]} readOnly={true} theme={"bubble"}/></span> : <ReactQuill value={d[value]} readOnly={true} theme={"bubble"}/>}</h5>                        
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
        {/* {type == types[2] && (
          <div className="">
            <h4 className="text-2xl border-b">Assessment - {assessmentName}</h4>

            <div className="">
              <h5 className="text-xl mt-5"></h5>
              {assessmentData?.map((d, i) => (
                <div className="mt-6 rounded-3xl my-3">
                  <h2 className="font-semibold">
                    Q.{i + 1}. {d.question.text}
                  </h2>
                  <h4 className="">Ans. {d.option.text}</h4>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Result;
