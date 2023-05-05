import React, { useState, useEffect } from "react";
import LargeHeading from "../../components/LargeHeading";
import ButtonPrimary from "../../components/ButtonPrimary";
import InputPrimary from "../../components/InputPrimary";
import { BiSend } from "react-icons/bi";
import Navbar from "../../components/Navbar";
import { getDoctorsList, sendMessage } from "../../API";
import defaultImage from "../../assets/images/default_msg.png";

const MessageProfessional = () => {
  const [details, setDetails] = useState("");
  const [close, setClose] = useState();
  const [doctorId, setDoctorId] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(defaultImage);
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
    setImage(URL.createObjectURL(e.target.files[0]))
  };

  const handleSendMessage = async () => {
    await sendMessage({
      receiver_id: details.id,
      message_text: message,
      attachment,
    });
    setMessage("");
    setAttachment("");
    handleCloseButtonClick();
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
                  <tr key={key} className="border-t">
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
                      <ButtonPrimary text={'message'} icon={<BiSend />} handleClick={(e) => handleSendClick(d)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {details && (
          <div className={`${close && "hidden"}`}>
            <div onClick={handleCloseButtonClick}>
              <LargeHeading
                text={"message professional"}
                desc={
                  "Build your provider directory by adding their contact information. Having your provider listed gives you the ability to share your data with them. When you are in need of a professional, you will have direct support."
                }
                goTo={"/message-professional"}
              />
            </div>
            <div className="py-4">
              <div className="w-full flex flex-col w-64">
                <img src={image} className="md:w-64 rounded-xl mb-3" />
                <input
                  type="file"
                  onChange={handleAttachmentChange}
                  className="file:rounded-full file:border-none file:bg-gray-800 file:text-white file:px-4 file:py-2 file:cursor-pointer w-32 -mt-16 translate-x-28"
                />
              </div>
              <div className="mt-8 text-gray-500 flex flex-col justify-between">
                <h6 className="text-lg font-semibold m-1">Message</h6>
                <textarea name="message" placeholder="start writing your message..." onChange={handleMessageChange} className="h-[10rem] md:w-1/2 rounded-xl bg-gray-100 p-4 focus:outline-none focus:bg-blue-50"></textarea>
              </div>
            </div>

            <ButtonPrimary
              text={"send"}
              icon={<BiSend />}
              handleClick={handleSendMessage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MessageProfessional;
