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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateSpan, setIsDateSpan] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleShareClick = async () => {
    let res = "";
    if (type == "mood_test") {
      if (startDate && endDate) {
        res = await shareMoodTestDataSpan({
          name,
          email,
          message,
          start_date: startDate,
          end_date: endDate,
        });
      } else {
        res = await shareMoodTestData({
          name,
          email,
          mood_id: id,
          message,
        });
      }
    } else if (type == "journal") {
      if (startDate && endDate) {
        res = await shareJournalDataSpan({
          name,
          email,
          message,
          start_date: startDate,
          end_date: endDate,
        });
      } else {
        res = await shareJournalData({
          name,
          email,
          journal_id: id,
          message,
        });
      }
    } else if (type == "assessment") {
      if (startDate && endDate) {
        res = await shareAssessmentDataSpan({
          name,
          email,
          message,
          start_date: startDate,
          end_date: endDate,
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
      <div className="bg-white md:h-[85%] overflow-y-scroll shadow-lg rounded-3xl md:w-3/5 md:m-auto m-5 md:py-5  p-5 ">
        <h2 className="md:text-3xl text-lg my-5 text-center">
          Share your data with Doctors
        </h2>
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-full flex justify-center "
            onChange={handleNameChange}
          >
            <InputPrimary
              name={"name"}
              label={"name"}
              placeholer={"Enter name of the receiver"}
            />
          </div>
          <div
            className="w-full flex justify-center "
            onChange={handleEmailChange}
          >
            <InputPrimary
              name={"email"}
              label={"email"}
              placeholer={"Enter email of the receiver"}
            />
          </div>
          <div
            className="w-full flex justify-center "
            onChange={handleMessageChange}
          >
            <InputPrimary
              name={"message"}
              label={"message"}
              placeholer={"Write your message..."}
            />
          </div>

          <div
            onChange={(e) => setIsDateSpan((prev) => !prev)}
            className="flex gap-2 mt-4 md:w-1/2 accent-gray-800"
          >
            <input type="checkbox" name="dateSpan" />
            <label htmlFor="dateSpan">Share data with date span</label>
          </div>

          {isDateSpan && (
            <>
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
                <InputPrimary
                  type={"date"}
                  name={"end_date"}
                  label={"end date"}
                />
              </div>
            </>
          )}

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
