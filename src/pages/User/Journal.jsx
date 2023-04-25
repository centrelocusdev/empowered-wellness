import React, { useEffect, useState } from "react";
import arrow_circle from "../../assets/icons/left_arrow_circle.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import InputPrimary from "../../components/InputPrimary";
import { FiPlus, FiEdit, FiShare2, FiXCircle } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import LargeHeading from "../../components/LargeHeading";
// import { allJournals } from "../../temp_db/journal";
import Navbar from "../../components/Navbar";
import { getAllJournals, createJournal, deleteJournal, updateJournal } from "../../API";

const Journal = () => {
  const [details, setDetails] = useState("");
  const [close, setClose] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [allJournals, setAllJournals] = useState();

  const [updatedText, setUpdatedText] = useState()
  const [updatedTitle, setUpdatedTitle] = useState()
  const [updatedImage, setUpdatedImage] = useState()

  useEffect(() => {
    setToggleModal(true);
    const asyncCall = async () => {
      const journals = await getAllJournals();
      setAllJournals(journals);
    };
    asyncCall();
  }, []);

  const handleFileSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createJournal({ title, text, image });
    const journals = await getAllJournals();
    setAllJournals(journals);
    setToggleModal(true)
  };

  const handleDeleteJournal = async (id) => {
    const res = await deleteJournal(id);
    console.log(id);
    const journals = await getAllJournals();
    setAllJournals(journals);
  };

  const handleUpdateJournalClick = async (id) => {
    const res = await updateJournal({
      id,
      title: updatedTitle,
      text: updatedText,
      image: updatedImage
    })
    setClose(true)
  }

  const handleEditClick = (d) => {
    setDetails(d);
    setUpdatedTitle(d.title  )
    setUpdatedText(d.text)
    setUpdatedImage(d.image)
    setClose(false);
  };

  const handleCloseButtonClick = () => {
    setClose(true);
  };

  const handleModalClick = () => {
    setToggleModal((toggleModal) => !toggleModal);
  };

  return (
    <>
      <div
        className={`${toggleModal && "hidden"}
    h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex justify-center items-center`}
      >
        <div className="bg-white shadow-lg rounded-3xl md:w-3/5 md:m-auto m-5 md:p-16 p-5 ">
          <div className="md:w-3/5 mx-auto">
            <h2 className="md:text-3xl text-lg my-5">Add Journal</h2>
            <form className="text-left">
              <div onChange={handleTitleChange}>
                <InputPrimary
                  name={"title"}
                  label={"title"}
                  width={"full"}
                  placeholer={"Enter your journal title..."}
                />
              </div>
              <div onChange={handleFileSelect}>
                <InputPrimary
                  type={"file"}
                  name={"image"}
                  label={"cover image"}
                  width={"full"}
                />
              </div>
              <div onChange={handleTextChange} className="mt-5 text-gray-600">
                <label
                  htmlFor="text"
                  className="capitalize font-semibold block"
                >
                  Description
                </label>
                <textarea
                  name="text"
                  placeholder="Enter description for your Journal "
                  className="focus:outline-none w-full focus:border-sky-500 border rounded-lg mt-1 min-h-[6rem] px-4 py-2"
                ></textarea>
              </div>
            </form>
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={handleModalClick}
                className="text-gray-500 hover:underline"
              >
                Close
              </button>
              <ButtonPrimary text={"Add Journal"} handleClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      <Navbar />
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

              <ButtonPrimary
                text={"add"}
                icon={<FiPlus />}
                isLight={true}
                handleClick={handleModalClick}
              />
            </div>
          </div>

          <div className="mt-8  md:overflow-x-hidden overflow-x-scroll">
            <table className="mx-auto md:w-4/5 table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Creation Date</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {allJournals &&
                  allJournals.map((d, key) => (
                    <tr key={d.id} className="">
                      <td className="px-6 py-3 text-left whitespace-nowrap capitalize">
                        {d.title}
                      </td>
                      <td className="px-6 py-3 text-left whitespace-nowrap">
                        {new Date(d.created_at).toDateString()}
                      </td>
                      <td className="px-6 py-3 text-left whitespace-nowrap flex gap-3 text-xl text-sky-400">
                        <button
                          onClick={(e) => handleEditClick(d)}
                          className="hover:text-gray-500"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={(e) => handleDeleteJournal(d.id)}
                          className="hover:text-gray-500"
                        >
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
            {!allJournals?.length && (
              <div className="w-full text-center text-xl">
                No Journal Found.
              </div>
            )}
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
              <div className="w-full">
                <input value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} autoFocus className="w-full md:text-4xl text-2xl capitalize bg-transparent focus:outline-none " />
                <p className="text-xl mt-3">
                  {new Date(details.created_at).toDateString()}
                </p>
              </div>

              <div className="w-full flex justify-end">
                <input type="file" onChange={(e) => setUpdatedImage(e.target.files[0])} className="file:rounded-full file:border-none file:bg-gray-800 file:text-white file:px-4 file:py-1 file:cursor-pointer w-32" />
              </div>
            </div>

            <div className="my-8 text-gray-500">
            <h6 className="text-2xl mb-2 ">Update Description</h6>
            <input
              type="text"
              value={updatedText}
              name="updatedText"
              onChange={(e) => setUpdatedText(e.target.value)}
              className="focus:outline-none focus:bg-blue-50  w-full md:p-8 rounded-3xl md:bg-gray-50 leading-7 md:text-left text-justify"
            />
            </div>

            <div className="float-right">
              <ButtonPrimary text={"save & close"} handleClick={(e) => handleUpdateJournalClick(details.id)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Journal;
