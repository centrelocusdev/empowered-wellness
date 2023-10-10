import React, { useEffect, useState } from "react";
import * as htmlToImage from 'html-to-image'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'
import LargeHeading from "../../components/LargeHeading";
import Navbar from "../../components/Navbar";
import menBack from "../../assets/images/men_back.png";
import centeredGrid from "../../assets/images/centered_grid.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import arrow_circle from "../../assets/icons/left_arrow_circle.png";
import collage from "../../assets/icons/collage.png";
import image from "../../assets/icons/image.png";
import ticon from "../../assets/icons/ticon.png";
import default_img from "../../assets/images/default_msg.png";
import  { useCallback, useRef } from 'react';

import ShowMatrix from "./showMatrix";


import {
  createVisionBoard,
  getAllVisionBoard,
  removeVisionBoard,
  updateVisionBoard,
} from "../../API";
import { BsFillPencilFill, BsFillImageFill } from 'react-icons/bs'
import { MdDelete } from "react-icons/md";

const VisionBoard = () => {
  const tabs = ["collage", "text", "image"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [vbcode, setVbcode] = useState(0);
  const [name, setName] = useState();
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [Gridtexts, setGridTexts] = useState([]);
  const [textValue, setTextValue] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [numRows, setNumRows] = useState(2);
  const [gridImages, setGridImages] = useState([]);
  // const [gridImages, setGridTexts] = useState([]);
  const [basicView,setBasicView] = useState([]);
  const elementRef = useRef(null)
  
  useEffect(() => {
    const runIt = async () => {
      const res = await getAllVisionBoard();
      console.log(res)
      res.map(({ placeholder_id, image, vbcode, id }) => {
        if (vbcode == 1) {
          setImages((prevState) => {
            const newState = [...prevState];
            newState[placeholder_id] = {
              image: `https://ew.thedelvierypointe.com${image}`,
              id,
            };
            return newState;
          });
        } else if (vbcode == 2) {
          setGridImages((prevState) => {
            const newState = [...prevState];
            newState[placeholder_id] = {
              image: `https://ew.thedelvierypointe.com${image}`,
              id,
            };
            return newState;
          });
        }
      });
    };
    runIt();
  }, []);

  const handleTepmplateClick = (template) => {
    setVbcode(template.vbcode);
    setName(template.name);
  };

  const handleSelection = (event) => {
    const { value } = event.target;
    const [rows,columns] = value.split("x").map(Number);
    setNumColumns(columns);
    setNumRows(rows);
  };

  const hanldeImageChange = async (event, index, id) => {
    const file = event.target.files[0];
    if (id) {
      const res = await updateVisionBoard({
        vbcode,
        id,
        placeholder_id: index,
        image: file,
      });
      console.log(res, "updatevisionboard")
      setImages((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = {
          image: `https://ew.thedelvierypointe.com${res.image}`,
          id: res.id,
        };
        return newValues;
      });
    } else {
      const res = await createVisionBoard({
        vbcode,
        placeholder_id: index,
        image: file,
      });
      console.log(res,"create vision board")
      setImages((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = {
          image: `https://ew.thedelvierypointe.com${res.image}`,
          id: res.id,
        };
        return newValues;
      });
    }
  };

  const handleTextSubmit = async(texts,textValue,index,id)=> {
     const content = textValue
     console.log(textValue[index],texts,index,id)
     console.log(content)
     if(id){
      const res = await updateVisionBoard({
        vbcode,id,placeholder_id:index,
        text: content,
      })
      console.log(res,"updatevisionboard, text")
       setTexts((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = {
          text: `${res.text}`,
          id: res.id,
        };
        return newValues;
      });
     }
     else{
      const res = await createVisionBoard({
        vbcode,
        placeholder_id: index,
        text: content,
      })
      console.log(res,"create vision board")
      setTexts((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = {
          text: `${res.text}`,
          id: res.id,
        };
        return newValues;
      })
     }
  }

  const handleGridImageChange = async (event, index) => {
    console.log("pickedd");
    const file = event.target.files[0];
    const id = gridImages[index]?.id;
    if (id) {
      const res = await updateVisionBoard({
        vbcode,
        id,
        placeholder_id: index,
        image: file,
      });
      setGridImages((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = {
          image: `https://ew.thedelvierypointe.com${res.image}`,
          id: res.id,
        };
        return newValues;
      });
    } else {
      console.log("");
      const res = await createVisionBoard({
        vbcode,
        placeholder_id: index,
        image: file,
      });
      setGridImages((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = {
          image: `https://ew.thedelvierypointe.com${res.image}`,
          id: res.id,
        };
        return newValues;
      });
    }
  };

  const handleRemoveClick = async (id) => {
    const res = await removeVisionBoard(id);
    console.log(res,'remove')
    window.location.reload();
  };

 const htmlToImageConvert = () => {
   toPng(elementRef.current, { cacheBust: false })
     .then((dataUrl) => {
       const link = document.createElement('a')
       link.download = 'my-image-name.png'
       link.href = dataUrl
       link.click()
     })
     .catch((err) => {
       console.log(err)
     })
 }

//  const viewgeneratefileds=()=>{

//   const viewfields = []
//   for (let row = 0; row < numRows; row++) {
//     const rowviewfields = []
//     for (let col = 0; col < numColumns; col++) {
//         const index = row * numColumns + col
//         rowFields.push(
//           <div
//             key={index}
//             className="w-64 rounded-2xl flex items-end justify-end p-5 md:mx-2 my-3 h-52"
//           >
//             <div className="w-full h-full bg-white rounded-2xl  relative">
//               {ViewImages[index] ? (
//                 <img
//                     src={images[index].image}
//                     alt={`Image ${index}`}
//                     className="w-full h-full rounded-2xl"
//                   />
//                   ) : (  <textarea
//                     type="text"
//                     placeholder="Enter text..."
//                     // value={texts[index] || ''}
//                     onChange={(e) => {
//                       setTextValue(e.target.value)
//                     }}
//                     className="w-full h-full rounded-2xl bg-transparent text-black px-4 py-2"
//                   ></textarea>)
//                   }
//                   </div>
//                 </div>
                  
//                   )}
//               fields.push(
//         <div key={row} className="flex md:flex-row flex-col w-full mx-auto">
//           {rowViewFields}
//         </div>
//       )
//     }
//     return fields
//   }




      



//  }
  const generateFields = () => {
    const fields = []
    for (let row = 0; row < numRows; row++) {
      const rowFields = []
      for (let col = 0; col < numColumns; col++) {
        const index = row * numColumns + col
        rowFields.push(
          <div
            key={index}
            className="w-64 rounded-2xl flex items-end justify-end p-5 md:mx-2 my-3 h-52"
          >
            <div className="w-full h-full bg-white rounded-2xl  relative">
              {images[index] ? (
                <>
                  <img
                    src={images[index].image}
                    alt={`Image ${index}`}
                    className="w-full h-full rounded-2xl"
                  />
                  <button
                    onClick={() => handleRemoveClick(images[index].id)}
                    title="Remove"
                    className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                  >
                    <MdDelete />
                  </button>
                </>
              ) : (
                <>
                  <textarea
                    type="text"
                    placeholder="Enter text..."
                    // value={texts[index] || ''}
                    onChange={(e) => {
                       const newValue = event.target.value;

  // Update the textValue array at the specified index
  setTextValue((prevTextValue) => {
    const newTextValue = [...prevTextValue];
    newTextValue[index] = newValue;
    return newTextValue;
  })
                      // setTextValue[index](e.target.value)
                    }
                    }
                    className="w-full h-full rounded-2xl bg-transparent text-black px-4 py-2"
                  ></textarea>
                  {/* {console.log(textValue,texts)} */}
                  <button
                    type="button"
                    onClick={() =>
                      handleTextSubmit(
                        texts,
                        textValue[index],
                        index,
                        texts[index]?.id
                      )
                    }
                    class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    submit
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-end w-6">
              {images[index] ? (
                <label
                  htmlFor={`filePicker-${index}`}
                  className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                >
                  <BsFillPencilFill />
                </label>
              ) : (
                <label
                  htmlFor={`filePicker-${index}`}
                  className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                >
                  <BsFillImageFill />
                </label>
              )}
              <input
                id={`filePicker-${index}`}
                style={{ visibility: 'hidden' }}
                type="file"
                onChange={(e) => hanldeImageChange(e, index, images[index]?.id)}
              />
            </div>
          </div>
        )
      }
      fields.push(
        <div key={row} className="flex md:flex-row flex-col w-full mx-auto">
          {rowFields}
        </div>
      )
    }
    return fields
  }



  return (
    <>
      <Navbar />
      <div className="md:px-8 px-4 m-4 md:w-4/5 md:mx-auto py-4">
        <div className="md:flex items-start gap-4 justify-between">
          <LargeHeading
            text={'Vision Board'}
            desc={
              'Visualization is one of the most powerful mind exercises you can do. Your Vision Board should focus on how you want to feel, not just on things that you want!'
            }
          />
        </div>

        {vbcode == 0 && (
          <div className="flex md:flex-row flex-col justify-start gap-8">
            {templates.map((template, key) => (
              <div key={key} className=" rounded-2xl shadow-xl p-4">
                <h3 className="mb-2 capitalize text-center text-xl">
                  {template.name}
                </h3>
                <div className="w-72 flex flex-col">
                  <img
                    src={template.image}
                    className="h-[16rem] rounded-xl mb-3"
                  />
                  <ButtonPrimary
                    text={'select'}
                    handleClick={(e) => handleTepmplateClick(template)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {vbcode == 1 && (
          <div className="p-5">
            <div className="md:flex items-center justify-between">
              <div className="flex gap-2">
                <button onClick={(e) => setVbcode(0)}>
                  <img src={arrow_circle} alt="" className="w-8" />
                </button>
                <h2 className="md:text-3xl text-2xl capitalize">
                  {name} <span className="text-gray-400">Template</span>
                </h2>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-2">
                {currentTab == tabs[0] && (
                  <select
                    onChange={handleSelection}
                    className="bg-gray-800 text-white rounded px-3 py-2"
                  >
                    <option value="2x2">2x2 </option>
                    <option value="3x2">3x2 </option>
                    <option value="4x3">4x3 </option>
                    <option value="3x5">3x5 </option>
                    <option value="4x5">4x5 </option>
                  </select>
                )}
                {/* <button
                  onClick={(e) => setCurrentTab("collage")}
                  className="border bg-gray-800 py-2 px-2 rounded"
                >
                  <img src={collage} alt="" />
                </button>
                <button
                  onClick={(e) => setCurrentTab("text")}
                  className="border bg-gray-800 py-2 px-2 rounded"
                >
                  <img src={ticon} alt="" />
                </button>
                <button
                  onClick={(e) => setCurrentTab("image")}
                  className="border bg-gray-800 py-2 px-2 rounded"
                >
                  <img src={image} alt="" />
                </button> */}
              </div>
              {currentTab == tabs[0] && (
                <>
                  <div
                    ref={elementRef}
                    id="check"
                    className="flex flex-col mt-4 md:bg-gray-100 md:p-5 rounded-3xl  w-fit"
                  >
                    {generateFields()}
                  </div>
                  {/* <button
                    class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    onClick={htmlToImageConvert}
                  >
                    Download Vision Board
                  </button> */}
                </>
              )}
              {currentTab == tabs[1] && <div>This is text vision board</div>}
              {currentTab == tabs[2] && <div>This is image vision board</div>}
            </div>
          </div>
        )}
        {vbcode == 2 && (
          <div>
            <div className="md:flex justify-between items-center">
              <div className="flex gap-2">
                <button onClick={(e) => setVbcode(0)}>
                  <img src={arrow_circle} alt="" className="w-8" />
                </button>
                <h2 className="md:text-3xl text-2xl capitalize">
                  {name} <span className="text-gray-400">Template</span>
                </h2>
              </div>
            </div>
            <div
              ref={elementRef}
              id="check"
              className="flex flex-col mt-4 md:bg-gray-100 md:p-5 rounded-3xl"
            >
              <div className="md:flex justify-center gap-3 md:w-4/5 mx-auto h-[30rem]">
                <div className="flex flex-col h-full">
                  <div className="h-1/2 w-64 bg-white rounded-2xl flex items-end justify-end p-5 md:mx-2 my-3 h-52 bg-[image:var(--image-url)] bg-cover">
                    {console.log(gridImages, 'gridImages')}
                    {console.log(gridImages, 'gridImages')}
                    {gridImages[0] ? (
                      <div className="w-full flex justify-between">
                        <>
                          <img
                            src={gridImages[0].image}
                            alt={`Image ${0}`}
                            className="w-full h-full rounded-2xl"
                          />
                          <button
                            onClick={() => handleRemoveClick(gridImages[0].id)}
                            title="Remove"
                            className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                          >
                            <MdDelete />
                          </button>
                        </>
                      </div>
                    ) : (
                      <>
                        <textarea
                          type="text"
                          placeholder="Enter text..."
                          // value={texts[index] || ''}
                          onChange={(e) => {
                             const newValue = event.target.value;

                     // Update the textValue array at the specified index
      setTextValue((prevTextValue) => {
    const newTextValue = [...prevTextValue];
    newTextValue[index] = newValue;
    return newTextValue;
    })
                            // setTextValue(e.target.value)
                          }}
                          className="w-full h-full rounded-2xl bg-transparent text-black px-4 py-2"
                        ></textarea>
                        <button
                          type="button"
                          onClick={() =>
                            handleTextSubmit(
                              Gridtexts,
                              textValue[index],
                              0,
                              Gridtexts[0]?.id
                            )
                          }
                          class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                          submit
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex justify-end w-6">
                    {gridImages[0] ? (
                      <label
                        htmlFor={`filePicker-${0}`}
                        className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                      >
                        <BsFillPencilFill />
                      </label>
                    ) : (
                      <label
                        htmlFor={`filePicker-${0}`}
                        className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                      >
                        <BsFillImageFill />
                      </label>
                    )}
                    <input
                      id={`filePicker-${0}`}
                      style={{ visibility: 'hidden' }}
                      type="file"
                      onChange={(e) => handleGridImageChange(e, 0)}
                    />
                  </div>
                  <div className="h-1/2 w-64 bg-white rounded-2xl flex items-end justify-end p-5 md:mx-2 my-3 h-52 bg-[image:var(--image-url)] bg-cover">
                    {gridImages[1] ? (
                      <div className="w-full flex justify-between">
                        <>
                          <img
                            src={gridImages[1].image}
                            alt={`Image ${1}`}
                            className="w-full h-full rounded-2xl"
                          />
                          <button
                            onClick={() => handleRemoveClick(gridImages[1].id)}
                            title="Remove"
                            className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                          >
                            <MdDelete />
                          </button>
                        </>
                      </div>
                    ) : (
                      <>
                        <textarea
                          type="text"
                          placeholder="Enter text..."
                          // value={texts[index] || ''}
                          onChange={(e) => {
                             const newValue = event.target.value;

  // Update the textValue array at the specified index
  setTextValue((prevTextValue) => {
    const newTextValue = [...prevTextValue];
    newTextValue[index] = newValue;
    return newTextValue;
  })
                            // setTextValue(e.target.value)
                          }}
                          className="w-full h-full rounded-2xl bg-transparent text-black px-4 py-2"
                        ></textarea>
                        <button
                          type="button"
                          onClick={() =>
                            handleTextSubmit(
                              Gridtexts,
                              textValue[index],
                              1,
                              Gridtexts[1]?.id
                            )
                          }
                          class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                          submit
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex justify-end w-6">
                    {gridImages[1] ? (
                      <label
                        htmlFor={`filePicker-${1}`}
                        className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                      >
                        <BsFillPencilFill />
                      </label>
                    ) : (
                      <label
                        htmlFor={`filePicker-${1}`}
                        className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                      >
                        <BsFillImageFill />
                      </label>
                    )}
                    <input
                      id={`filePicker-${1}`}
                      style={{ visibility: 'hidden' }}
                      type="file"
                      onChange={(e) => handleGridImageChange(e, 1)}
                    />
                  </div>
                </div>
                <div className="h-[97%] md:w-72 w-64 bg-white rounded-2xl flex items-end justify-end p-5 md:mx-2 h-52 bg-[image:var(--image-url)] bg-cover">
                  {gridImages[2] ? (
                    <div className="w-full flex justify-between">
                      <>
                        <img
                          src={gridImages[2].image}
                          alt={`Image ${2}`}
                          className="w-full h-full rounded-2xl"
                        />
                        <button
                          onClick={() => handleRemoveClick(gridImages[2].id)}
                          title="Remove"
                          className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                        >
                          <MdDelete />
                        </button>
                      </>
                    </div>
                  ) : (
                    <>
                      <textarea
                        type="text"
                        placeholder="Enter text..."
                        // value={texts[index] || ''}
                        onChange={(e) => {
                           const newValue = event.target.value;

  // Update the textValue array at the specified index
  setTextValue((prevTextValue) => {
    const newTextValue = [...prevTextValue];
    newTextValue[index] = newValue;
    return newTextValue;
  });
                          // setTextValue(e.target.value)
                        }}
                        className="w-full h-full rounded-2xl bg-transparent text-black px-4 py-2"
                      ></textarea>
                      <button
                        type="button"
                        onClick={() =>
                          handleTextSubmit(
                            Gridtexts,
                            textValue[index],
                            2,
                            Gridtexts[2]?.id
                          )
                        }
                        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      >
                        submit
                      </button>
                    </>
                  )}
                </div>
                <div className="flex justify-end w-6">
                  {gridImages[2] ? (
                    <label
                      htmlFor={`filePicker-${2}`}
                      className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                    >
                      <BsFillPencilFill />
                    </label>
                  ) : (
                    <label
                      htmlFor={`filePicker-${2}`}
                      className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                    >
                      <BsFillImageFill />
                    </label>
                  )}
                  <input
                    id={`filePicker-${2}`}
                    style={{ visibility: 'hidden' }}
                    type="file"
                    onChange={(e) => handleGridImageChange(e, 2)}
                  />
                </div>
              </div>
            </div>
            <button
              class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={htmlToImageConvert}
            >
              Download Grid Vision Board
            </button>
          </div>
        )}

        {vbcode == 3 && ( 
        <>
          <div className="md:flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={(e) => setVbcode(0)}>
                <img src={arrow_circle} alt="" className="w-8" />
              </button>
              <h2 className="md:text-3xl text-2xl capitalize">
                {name} <span className="text-gray-400">Template</span>
              </h2>
            </div>
          </div>

          <ShowMatrix/>
        </>
        )}
      </div>
    </>
  )
};

const templates = [
  {
    name: "basic",
    vbcode: 1,
    image: menBack,
  },
  {
    name: "grid",
    vbcode: 2,
    image: centeredGrid,
  },
  {
    name: "Saved Vision Board",
    vbcode: 3,
    image: menBack,
  },
  // {
  //   name: "grid View",
  //   vbcode: 2,
  //   image: centeredGrid,
  // },
];

export default VisionBoard;
