import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ButtonPrimary from "./ButtonPrimary";
import InputPrimary from "./InputPrimary";
import {
  shareMoodTestData,
  getDoctorsList,
  shareMoodTestDataSpan,
  shareJournalDataSpan,
  shareJournalData,
  shareAssessmentDataSpan,
  shareAssessmentData,
} from "../API";

const ShareDataModal = ({ type, id, handleCloseClick, isOpen }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const runIt = async () => {
      const res = await getDoctorsList();
      const filterRes = res.map((d) => ({
        value: d.id,
        label: `${d.first_name} ${d.last_name}`,
      }));
      setDoctors(filterRes);
      setDoctorsList(res);
    };
    runIt();
  }, []);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleDoctorChange = (selectedDoctor) => {
    setDoctorId(selectedDoctor.value);
  };

  const handleShareClick = async () => {
    const d = doctorsList.find((d) => d.id == doctorId);
    let res = "";
    if (type == "mood test") {
      if (startDate && endDate) {
        res = await shareMoodTestDataSpan({
          email: d.email,
          message,
          start_date: startDate,
          end_date: endDate,
        });
      } else {
        res = await shareMoodTestData({
          email: d.email,
          mood_id: id,
          message,
        });
      }
    } else if (type == "journal") {
      if (startDate && endDate) {
        res = await shareJournalDataSpan({
          journal_id: id,
          user_id: doctorId,
          message,
          start_date: startDate,
          end_date: endDate,
        });
      } else {
        res = await shareJournalData({
          email: d.email,
          user_id: id,
          message,
        });
      }
    } else if (type == "assessment") {
      if (startDate && endDate) {
        res = await shareAssessmentDataSpan({
          assessment_id: id,
          user_id: doctorId,
          message,
          start_date: startDate,
          end_date: endDate,
        });
      } else {
        res = await shareAssessmentData({
          email: d.email,
          user_id: id,
          message,
        });
      }
    }

    res && handleCloseClick();
    setMessage("");
    setDoctorId("");
  };

  return (
    <div
      className={`fixed w-full h-full top-0 left-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto bg-[rgba(0,0,0,0.3)]"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white shadow-lg rounded-3xl md:w-3/5 md:m-auto m-5 md:p-16 p-5 ">
        <h2 className="md:text-3xl text-lg my-5 text-center">
          Share your data with Doctors
        </h2>
        <div className="flex flex-col items-center justify-center">
          <div className="md:w-1/2 w-full">
            <h5 className="capitalize font-semibold text-gray-600">Doctor</h5>

            <div className="w-full">
              <Select
                options={doctors}
                value={doctorId}
                onChange={handleDoctorChange}
              />
            </div>
          </div>
          <div
            className="w-full flex justify-center "
            onChange={handleMessageChange}
          >
            <InputPrimary
              name={"message"}
              label={"message"}
              placeholer={"Start typing..."}
            />
          </div>

          <div
            className="w-full flex justify-center"
            onChange={handleStartDateChange}
          >
            <InputPrimary
              type={"date"}
              name={"start_date"}
              label={"start date"}
            />
          </div>

          <div
            className="w-full flex justify-center"
            onChange={handleEndDateChange}
          >
            <InputPrimary type={"date"} name={"end_date"} label={"end date"} />
          </div>

          <div className="flex justify-between md:w-1/2 w-full mt-4">
            <button
              onClick={handleCloseClick}
              className="text-gray-500 hover:underline"
            >
              Close
            </button>
            <ButtonPrimary text={"Send"} handleClick={handleShareClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDataModal;
