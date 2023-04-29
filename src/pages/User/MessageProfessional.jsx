import React, { useState, useEffect } from "react";
import LargeHeading from "../../components/LargeHeading";
import arrow_circle from "../../assets/icons/left_arrow_circle.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import InputPrimary from "../../components/InputPrimary";
import { FiPlus, FiEdit, FiSend, FiXCircle } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { msg_prof } from "../../temp_db/msg_prof";
import Navbar from "../../components/Navbar";
import { getDoctorsList, sendMessage } from "../../API";

const MessageProfessional = () => {
  const [details, setDetails] = useState("");
  const [close, setClose] = useState();
  const [doctorId, setDoctorId] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");

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

  const handleSendClick = (d) => {
    setDetails(d);
    setClose(false);
  };

  const handleCloseButtonClick = () => {
    setClose(true);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSendMessage = async () => {
    const res = await sendMessage({
      receiver_id: details.id,
      message_text: message,
      attachment,
    });
    setMessage('')
    setAttachment('')
    handleCloseButtonClick()
  };

  return (
    <>
      <Navbar />
      <div className="px-8 md:w-4/5 mx-auto py-4">
        <div className={`${close == false && "hidden"}`}>
          <div className="">
            <LargeHeading
              text={"Message professional"}
              desc={
                "Build your provider directory by adding their contact information. Having your provider listed gives you the ability to share your data with them. When you are in need of a professional, you will have direct support."
              }
            />
          </div>

          <div className="mt-8  md:overflow-x-hidden overflow-x-scroll">
            <table className="mx-auto md:w-4/5 table-auto">
              <thead>
                <tr>
                <th className="px-6 py-3 text-left">Professional Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Mobile</th>
                <th className="px-6 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {doctorsList.map((d, key) => (
                  <tr key={key} className="">
                    <td className="px-6 py-3 text-left whitespace-nowrap">
                      {d.first_name} {d.last_name}
                    </td>
                    <td className="px-6 py-3 text-left whitespace-nowrap">
                      {d.email}
                    </td>
                    <td className="px-6 py-3 text-left whitespace-nowrap">
                      {d.mobile}
                    </td>
                    <td className="px-6 py-3 text-left whitespace-nowrap flex gap-3 text-xl text-sky-400">
                      <button
                        onClick={(e) => handleSendClick(d)}
                        className="hover:text-gray-500"
                      >
                        <FiSend />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {details && (
          <div className={`${close && "hidden"}`}>
            <div className="flex gap-4">
              <button onClick={handleCloseButtonClick} className="w-fit">
                <img src={arrow_circle} alt="" className="w-10" />
              </button>
              <h4 className="text-4xl">Message Professional</h4>
            </div>
            <div className="py-4">
              <div onChange={handleMessageChange}>
                <InputPrimary
                  label={"Message"}
                  name={"message"}
                  placeholer={"Start typing..."}
                />
              </div>
              <div onChange={handleAttachmentChange}>
                <InputPrimary
                  label={"Attachment"}
                  name={"attachment"}
                  type={"file"}
                />
              </div>
            </div>

            <ButtonPrimary text={"send"} icon={<BiSend />} handleClick={handleSendMessage} />
          </div>
        )}
      </div>
    </>
  );
};

export default MessageProfessional;
