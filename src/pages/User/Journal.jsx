import React, { useEffect, useState } from "react";
import arrow_circle from "../../assets/icons/left_arrow_circle.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import InputPrimary from "../../components/InputPrimary";
import { FiPlus, FiEdit, FiShare2, FiEye } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import LargeHeading from "../../components/LargeHeading";
import Navbar from "../../components/Navbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getAllJournals,
  createJournal,
  deleteJournal,
  updateJournal,
  getUserBasicInfo,
} from "../../API";
import ShareDataModal from "../../components/ShareDataModal";
import { useNavigate } from "react-router-dom";

  // const modules = {
  //   toolbar: [
  //     [{ 'header': [1, 2, false] }],
  //     ['bold', 'italic', 'underline','strike', 'blockquote'],
  //     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  //     ['link', 'image'],
  //     ['clean']
  //   ],
  // }
  
  // const formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image'
  // ]

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };


  const formats = [
    'header',
    'height',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'color',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'size',
  ]
 
const Journal = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState("");
  const [close, setClose] = useState();
  const [open, setOpen] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [journalId, setJournalId] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [allJournals, setAllJournals] = useState();
  const [userId, setUserId] = useState("");

  const [updatedText, setUpdatedText] = useState();
  const [updatedTitle, setUpdatedTitle] = useState();
  const [updatedImage, setUpdatedImage] = useState();

  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setToggleModal(true);
    const runIt = async () => {
      const journals = await getAllJournals();
      setAllJournals(journals);
      const user = await getUserBasicInfo();
      setUserId(user.id);
    };
    runIt();
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
    setToggleModal(true);
  };

  const handleDeleteJournal = async (id) => {
    const res = await deleteJournal(id);
    console.log(id);
    const journals = await getAllJournals();
    setAllJournals(journals);
  };

  const handleUploadImageChange = (e) => {
    setUpdatedImage(e.target.files[0]);
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdateJournalClick = async (id) => {
    console.log(id,updatedText,updatedTitle,updatedImage)
    const res = await updateJournal({
      id,
      title: updatedTitle,
      text: updatedText,
      image: updatedImage,
    });
    console.log(res)
    setClose(true);
  };

  const handleEditClick = (d) => {
    console.log(d,"yaha d.text mai dekh")
    setDetails(d);
    setUpdatedTitle(d.title);
    setUpdatedText(d.text);
    setUpdatedImage(d.image);
    setImgSrc(`https://ew.thedelvierypointe.com${d.image}`)
    setClose(false);
  };

  const handleCloseButtonClick = () => {
    setClose(true);
  };

  const handleViewClick = (id) => {
    navigate(`/result?type=journal&id=${id}&user_id=${userId}`);
  };

  const handleModalClick = () => {
    setToggleModal((toggleModal) => !toggleModal);
  };

  const handleShareClick = (id) => {
    setJournalId(id);
    setOpen(true);
  };
  return (
    <>
      <ShareDataModal
        type={'journal'}
        id={journalId}
        handleCloseClick={() => setOpen(false)}
        isOpen={open}
      />
      <div
        className={`${toggleModal && 'hidden'}
    h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex justify-center items-center`}
      >
        <div className="bg-white shadow-lg rounded-3xl md:w-3/5 md:m-auto m-5 md:p-16 p-5 ">
          <div className="md:w-3/5 mx-auto">
            <h2 className="md:text-3xl text-lg my-5">Add Journal</h2>
            <form className="text-left">
              <div onChange={handleTitleChange}>
                <InputPrimary
                  name={'title'}
                  label={'title'}
                  width={'full'}
                  placeholer={'Enter your journal title...'}
                />
              </div>
              <div onChange={handleFileSelect}>
                <InputPrimary
                  type={'file'}
                  name={'image'}
                  label={'cover image'}
                  width={'full'}
                />
              </div>
              <div className="mt-5 h-64  text-gray-600">
                {/* <div onChange={handleTextChange} className="mt-5 text-gray-600"> */}
                <label
                  htmlFor="text"
                  className="capitalize font-semibold block"
                >
                  Description
                </label>

                <ReactQuill
                  value={text}
                  // name="updatedText"
                  modules={modules}
                  formats={formats}
                  style={{ marginTop: '4px', height: '100px' }}
                  placeholder="Enter description for your Journal "
                  onChange={(newValue) => setText(newValue)}
                  // className="focus:outline-none w-full focus:border-sky-500 border rounded-lg mt-1 px-4 py-2"
                />

                {/* <textarea
                  name="text"
                  placeholder="Enter description for your Journal "
                  className="focus:outline-none w-full focus:border-sky-500 border rounded-lg mt-1 min-h-[6rem] px-4 py-2"
                ></textarea> */}
              </div>
            </form>
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={handleModalClick}
                className="text-gray-500 hover:underline"
              >
                Close
              </button>
              <ButtonPrimary text={'Add Journal'} handleClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      <Navbar />
      <div className="px-8 md:w-4/5 mx-auto py-4">
        <div className={`${close == false && 'hidden'}`}>
          <div className="">
            <div className="md:flex items-start gap-4 justify-between">
              <LargeHeading
                text={'journal'}
                desc={
                  'Journaling helps to control your mental health and to improve your mood by: helping you prioritize problems, fears, and concerns, Tracking any symptoms day-today assists users in recognizing common triggers and learning ways to better control them. Journals also provide an opportunity for positive self-talk and identifying recurring negative thoughts.'
                }
              />

              <ButtonPrimary
                text={'add'}
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
                          onClick={(e) => handleViewClick(d.id)}
                          className="hover:text-gray-500"
                        >
                          <FiEye />
                        </button>
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
                        <button
                          onClick={(e) => handleShareClick(d.id)}
                          className="hover:text-gray-500"
                        >
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
          <div className={`${close && 'hidden'}`}>
            <div className="flex gap-4">
              <button onClick={handleCloseButtonClick} className="w-fit">
                <img src={arrow_circle} alt="" className="w-10" />
              </button>
              <h4 className="text-4xl">Journal</h4>
            </div>
            <div className="mt-5 bg-journal bg-no-repeat  bg-cover h-[17rem] rounded-3xl p-8 text-[#165759] flex  justify-between">
              <div className="w-full mr-6">
                <label htmlFor="">Update Journal Text</label>
                <input
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  autoFocus
                  className="w-full md:text-4xl text-2xl capitalize bg-transparent focus:outline-none focus:border-b border-[#165759] truncate"
                />
                <p className="text-xl mt-3">
                  {new Date(details.created_at).toDateString()}
                </p>
              </div>

              <div className="w-full flex flex-col items-end justify-end">
                {imgSrc && (
                  <img
                    src={imgSrc}
                    className="w-32 h-32 rounded-xl mb-3 shadow-lg"
                  />
                )}
                <input
                  type="file"
                  onChange={handleUploadImageChange}
                  className="file:rounded-full file:border-none file:bg-gray-800 file:text-white file:px-4 file:py-1 file:cursor-pointer w-32"
                />
              </div>
            </div>

            <div className="my-8 text-gray-500 flex flex-col justify-between">
              <h6 className="text-2xl mb-2 ">Update Description</h6>
              <ReactQuill
                value={updatedText}
                // name="updatedText"
                style={{ marginTop: '4px', height: '100px' }}
                modules={modules}
                formats={formats}
                onChange={(newValue) => setUpdatedText(newValue)}
                // className="focus:outline-none focus:bg-blue-50  w-full md:p-8 rounded-3xl md:bg-gray-50 leading-7 md:text-left text-justify"
              />
              {/* <input
                type="text"
                value={updatedText}
                name="updatedText"
                onChange={(e) => setUpdatedText(e.target.value)}
                className="focus:outline-none focus:bg-blue-50  w-full md:p-8 rounded-3xl md:bg-gray-50 leading-7 md:text-left text-justify"
              /> */}
            </div>

            <div className="float-right mt-4">
              <ButtonPrimary
                text={'save & close'}
                handleClick={(e) => handleUpdateJournalClick(details.id)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
};

export default Journal;
