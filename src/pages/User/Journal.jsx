import React, { useEffect, useState } from "react";
import arrow_circle from "../../assets/icons/left_arrow_circle.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import { FiPlus, FiEdit, FiShare2, FiXCircle } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import LargeHeading from "../../components/LargeHeading";
import { journalData } from "../../temp_db/journal";

const Journal = () => {
  const [details, setDetails] = useState("");
  const [close, setClose] = useState();

  const handleEditClick = (d) => {
    setDetails(d);
    setClose(false);
  };

  const handleCloseButtonClick = () => {
    setClose(true);
  };

  return (
    <>
      <div className="px-8 md:w-4/5 mx-auto py-4">
        <div className={`${close == false && "hidden"}`}>
          <div className="">
            <div className="md:flex items-start gap-4 justify-between">
              <LargeHeading
                text={"journal"}
                desc={
                  "Journaling helps to control your mental health and to improve your mood by: helping you prioritize problems, fears, and concerns, Tracking any symptoms day-today assists users in recognizing common triggers and learning ways to better control them. Journals also provide an opportunity for positive self-talk and identifying recurring negative thoughts."
                }
              />

              <ButtonPrimary text={"add"} icon={<FiPlus />} isLight={true} />
            </div>
          </div>

          <div className="mt-8  md:overflow-x-hidden overflow-x-scroll">
            <table className="mx-auto md:w-4/5 table-auto">
              <thead>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Creation Date</th>
                <th className="px-6 py-3 text-left">Action</th>
              </thead>
              <tbody>
                {journalData.map((d, key) => (
                  <tr key={key} className="">
                    <td className="px-6 py-3 text-left whitespace-nowrap">
                      {d.title}
                    </td>
                    <td className="px-6 py-3 text-left whitespace-nowrap">
                      {d.creationDate}
                    </td>
                    <td className="px-6 py-3 text-left whitespace-nowrap flex gap-3 text-xl text-sky-400">
                      <button
                        onClick={(e) => handleEditClick(d)}
                        className="hover:text-gray-500"
                      >
                        <FiEdit />
                      </button>
                      <button className="hover:text-gray-500">
                        <MdOutlineDelete />
                      </button>
                      <button className="hover:text-gray-500">
                        <FiShare2 />
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
              <h4 className="text-4xl">Journal</h4>
            </div>
            <div className="mt-5 bg-journal bg-no-repeat  bg-cover h-[17rem] rounded-3xl p-8 text-[#165759] flex flex-col justify-between">
              <div>
                <h2 className="text-4xl">{details.title}</h2>
                <p className="text-xl mt-3">{details.creationDate}</p>
              </div>

              <div className="w-full flex justify-end">
                <ButtonPrimary icon={<BiImageAdd />} text={"change cover"} />
              </div>
            </div>

            <div className="my-8 flex flex-col gap-4 md:p-8 rounded-3xl md:bg-gray-50 leading-7 md:text-left text-justify">
              <p>{details.desc}</p>
            </div>

            <div className="float-right">
              <ButtonPrimary text={"save & close"} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Journal;
