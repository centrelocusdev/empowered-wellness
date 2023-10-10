import  { useEffect, useState } from "react";
import * as htmlToImage from 'html-to-image'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'
import * as React from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import Canvas from './Whiteboard'
import LargeHeading from "../../components/LargeHeading";
import Navbar from "../../components/Navbar";
import menBack from "../../assets/images/men_back.png";
import centeredGrid from "../../assets/images/centered_grid.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import arrow_circle from "../../assets/icons/left_arrow_circle.png";
import collage from "../../assets/icons/collage.png";
import image from "../../assets/icons/image.png";
import ticon from "../../assets/icons/ticon.png";
// import default_img from "../../assets/images/default_msg.png";
import default_img from "../../assets/images/default_msg.jpg";
import ReactQuill from "react-quill";


import {
  createVisionBoard,
  getAllVisionBoard,
  removeVisionBoard,
  updateVisionBoard,
} from "../../API";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const VisionBoard = () => {
  const tabs = ["collage", "text", "image"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [vbcode, setVbcode] = useState(0);
  const [name, setName] = useState();
  const [images, setImages] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [numRows, setNumRows] = useState(2);
  const [gridImages, setGridImages] = useState([]);
  const [text,setText] = useState([])
  const [gridText,setGridText] = useState([])
  const [showText, setShowText] = useState(true)

  useEffect(() => {
    const runIt = async () => {
      let  data = await getAllVisionBoard();
      // console.log(res[0].vbcode_data,"resss")
      const res  = data[0].vbcode_data
      console.log(res)
      console.log(res)
      // const {response,vbcode} = res[0]
      const { response, vbcode } = res[0]?.vbcode == 1 ? res[0] : res[1]
      
      // console.log( res[0].vbcode,res[1].vbcode)
      
      console.log(response,vbcode,"in coolage")
      if (vbcode == 1) {
      response.map(({  placeholder_id, image, id }) => {
        console.log(placeholder_id, image, id,"in loop")
          setImages((prevState) => {
            const newState = [...prevState];
            newState[placeholder_id] = {
              image: `https://ew.thedelvierypointe.com${image}`,
              id,
            };
            return newState;
          })
        })
      }
      const {response:response2,vbcode:vbcode2} = res[0]?.vbcode == 2 ? res[0] : res[1]
      // console.log( res[0].vbcode,res[1].vbcode)
      console.log(res)
      console.log(response2,vbcode2,"in grid")
      if (vbcode2 == 2) {
      response2.map(({  placeholder_id, image, id }) => {
        console.log(placeholder_id, image, id,"in loop")
          setGridImages((prevState) => {
            const newState = [...prevState]
            newState[placeholder_id] = {
              image: `https://ew.thedelvierypointe.com${image}`,
              id,
            }
            return newState
          })
        })
      }

        
        // else if (vbcode == 2) {
        //   setGridImages((prevState) => {
        //     const newState = [...prevState];
        //     newState[placeholder_id] = {
        //       image: `https://ew.thedelvierypointe.com${image}`,
        //       id,
        //     };
        //     return newState;
        //   });
        // }
  
      // response.map(({  placeholder_id, image, vbcode, id }) => {
      //   console.log(placeholder_id, image, vbcode, id)
      //   if (vbcode == 1) {
      //     setImages((prevState) => {
      //       const newState = [...prevState];
      //       newState[placeholder_id] = {
      //         image: `https://ew.thedelvierypointe.com${image}`,
      //         id,
      //       };
      //       return newState;
      //     });
      //   } else if (vbcode == 2) {
      //     setGridImages((prevState) => {
      //       const newState = [...prevState];
      //       newState[placeholder_id] = {
      //         image: `https://ew.thedelvierypointe.com${image}`,
      //         id,
      //       };
      //       return newState;
      //     });
      //   }
      // });
    }
    runIt()
  }, []);

  const handleTepmplateClick = (template) => {
    setVbcode(template.vbcode);
    setName(template.name);
  };

  const handleSelection = (event) => {
    const { value } = event.target;
    const [columns, rows] = value.split("x").map(Number);
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
    window.location.reload();
  };
// const styles = {
//   border: "0.0625rem solid #9c9c9c",
//   borderRadius: "0.25rem"
// };

// const Canvas = class extends React.Component {
//   constructor(props) {
//     super(props);

//     this.canvas = React.createRef();
//   }

// }
  const generateFields = () => {
    const fields = [];
    for (let row = 0; row < numRows; row++) {
      const rowFields = [];
      for (let col = 0; col < numColumns; col++) {
        const index = row * numColumns + col;
        rowFields.push(
          <div
            style={{
              '--image-url': `url(${
                images[index] ? images[index].image : default_img
              })`,
            }}
            className="w-64 rounded-2xl flex items-end justify-end p-5 md:mx-2 my-3 h-52 bg-[image:var(--image-url)] bg-cover"
          >
            <div
              className={`${
                !images[index] && 'hidden'
              } flex gap-4 justify-between w-full`}
            >
              <button
                onClick={(e) => handleRemoveClick(images[index].id)}
                title="remove"
                className="w-fit bg-gray-800 p-2 rounded-full text-white cursor-pointer hover:bg-white hover:text-gray-800"
              >
                <MdDelete />
              </button>
              <div className="flex justify-end w-6">
                <label
                  title="edit"
                  htmlFor={`filePicker-${index}`}
                  className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                >
                  <BsFillPencilFill />
                </label>
                <input
                  id={`filePicker-${index}`}
                  style={{ visibility: 'hidden' }}
                  type={'file'}
                  onChange={(e) =>
                    hanldeImageChange(e, index, images[index].id)
                  }
                ></input>
              </div>
            </div>
            {/* <buttton
              type="button"
              onChange={(e) => hanlde(e, index)}
              className={`${
                images[index] && 'hidden'
              } text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
            >
            Text
            </buttton> */}

            <input
              type="file"
              onChange={(e) => hanldeImageChange(e, index)}
              className={`${
                images[index] && 'hidden'
              } file:rounded-full file:border-none file:bg-gray-800 file:text-white file:px-4 file:py-2 file:cursor-pointer w-32 translate-x-12 mx-auto file:hover:bg-white file:hover:text-gray-800`}
            />
          </div>
        )
      }
      fields.push(
        <div key={row} className="flex md:flex-row flex-col w-fit mx-auto">
          {rowFields}
        </div>
      );
    }
    return fields;
  };

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
                    <option value="2x2">2x2</option>
                    <option value="2x3">3x2</option>
                    <option value="3x4">4x3</option>
                    <option value="5x3">3x5</option>
                    <option value="5x4">4x5</option>
                  </select>
                )}
                <button
                  onClick={(e) => setCurrentTab('collage')}
                  className="border bg-gray-800 py-2 px-2 rounded"
                >
                  <img src={collage} alt="" />
                </button>
                <button
                  onClick={(e) => setCurrentTab('text')}
                  className="border bg-gray-800 py-2 px-2 rounded"
                >
                  <img src={ticon} alt="" />
                </button>

                {/* <button
                  onClick={(e) => setCurrentTab('image')}
                  className="border bg-gray-800 py-2 px-2 rounded"
                >
                  <img src={image} alt="" />
                </button> */}
              </div>
              {currentTab == tabs[0] && (
                <div id="check" className="flex flex-col mt-4 md:bg-gray-100 md:p-5 rounded-3xl">
                  {generateFields()}
                  <button onclick={htmlToImage.toPng(document.getElementById('my-node'))
  .then(function (dataUrl) {
    download(dataUrl, 'my-node.png');
  })}>
                    click 
                  </button>
                </div>
              )}
              {currentTab == tabs[1] && (
                <div>
                  {/* <ReactSketchCanvas
                    // style={styles}
                    width="1200"
                    height="800"
                    strokeWidth={2}
                    strokeColor="red"
                  /> */}
                  {/* <ReactSketchCanvas
                    // ref={this.canvas}
                    strokeWidth={2}
                    strokeColor="black"
                    width="1200"
                    height="800"
                  />
                  <button
                    onClick={() => {
                      this.canvas.current
                        .exportImage('png')
                        .then((data) => {
                          console.log(data)
                        })
                        .catch((e) => {
                          console.log(e)
                        })
                    }}
                  >
                    Get Image
                  </button> */}
                  <Canvas />
                </div>
              )}
              {/* {currentTab == tabs[2] && <div>This is image vision board</div>} */}
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
            <div className="flex flex-col mt-4 md:bg-gray-100 md:p-5 rounded-3xl">
              <div className="md:flex justify-center gap-3 md:w-4/5 mx-auto h-[30rem]">
                <div className="flex flex-col h-full">
                  <div
                    style={{
                      '--image-url': `url(${
                        gridImages[0] ? gridImages[0].image : default_img
                      })`,
                    }}
                    className="h-1/2 w-64 bg-white rounded-2xl flex items-end justify-end p-5 md:mx-2 my-3 h-52 bg-[image:var(--image-url)] bg-cover"
                  >
                    {gridImages[0] ? (
                      <div className="w-full flex justify-between">
                        <button
                          onClick={(e) => handleRemoveClick(gridImages[0].id)}
                          title="remove"
                          className="w-fit bg-gray-800 p-2 rounded-full text-white cursor-pointer hover:bg-white hover:text-gray-800"
                        >
                          <MdDelete />
                        </button>
                        <div className="w-6 flex">
                          <label
                            htmlFor={`filePicker-${0}`}
                            className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                          >
                            <BsFillPencilFill />
                          </label>
                          <input
                            id={`filePicker-${0}`}
                            style={{ visibility: 'hidden' }}
                            type={'file'}
                            onChange={(e) => handleGridImageChange(e, 0)}
                          ></input>
                        </div>
                      </div>
                    ) : (
                      <input
                        type="file"
                        onChange={(e) => handleGridImageChange(e, 0)}
                        className={`file:rounded-full file:border-none file:bg-gray-800 file:text-white file:px-4 file:py-2 file:cursor-pointer w-32 file:hover:bg-white file:hover:text-gray-800`}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      '--image-url': `url(${
                        gridImages[1] ? gridImages[1].image : default_img
                      })`,
                    }}
                    className="h-1/2 w-64 bg-white rounded-2xl flex items-end justify-end p-5 md:mx-2 my-3 h-52 bg-[image:var(--image-url)] bg-cover"
                  >
                    {gridImages[1] ? (
                      <div className="w-full flex justify-between">
                        <button
                          onClick={(e) => handleRemoveClick(gridImages[1].id)}
                          title="remove"
                          className="w-fit bg-gray-800 p-2 rounded-full text-white cursor-pointer hover:bg-white hover:text-gray-800"
                        >
                          <MdDelete />
                        </button>
                        <div className="w-6 flex">
                          <label
                            htmlFor={`filePicker-${1}`}
                            className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                          >
                            <BsFillPencilFill />
                          </label>
                          <input
                            id={`filePicker-${1}`}
                            style={{ visibility: 'hidden' }}
                            type={'file'}
                            onChange={(e) => handleGridImageChange(e, 1)}
                          ></input>
                        </div>
                      </div>
                    ) : (
                      <input
                        type="file"
                        onChange={(e) => handleGridImageChange(e, 1)}
                        className={`file:rounded-full file:border-none file:bg-gray-800 file:text-white file:px-4 file:py-2 file:cursor-pointer w-32 file:hover:bg-white file:hover:text-gray-800`}
                      />
                    )}
                  </div>
                </div>
                <div
                  // style={{
                  //   '--image-url': `url(${
                  //     gridImages[2] ? gridImages[2].image : default_img
                  //   })`,
                  // }}
                  className="h-[97%] md:w-72 w-64 bg-white rounded-2xl flex items-end justify-end p-5 md:mx-2 h-52 bg-[image:var(--image-url)] bg-cover"
                >
                  <div >
                    {<Canvas />}
                    {/* {<Canvas />} */}

                    {/* <ReactQuill
                      // value={text}
                      // name="updatedText"
                      // modules={modules}
                      // formats={formats}
                      placeholder="Enter description for your Journal "
                      // onChange={(newValue) => setText(newValue)}
                      className="focus:outline-none  w-full focus:border-sky-500 border rounded-lg mt-1 min-h-[6rem] px-4 py-10"
                    /> */}
                  </div>

                  {/* {gridImages[2] ? (
                    <div className="w-full flex justify-between">
                      <button
                        onClick={(e) => handleRemoveClick(gridImages[2].id)}
                        title="remove"
                        className="w-fit bg-gray-800 p-2 rounded-full text-white cursor-pointer hover:bg-white hover:text-gray-800"
                      >
                        <MdDelete />
                      </button>
                      <div className="w-6 flex">
                        <label
                          htmlFor={`filePicker-${2}`}
                          className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                        >
                          <BsFillPencilFill />
                        </label>
                        <input
                          id={`filePicker-${2}`}
                          style={{ visibility: "hidden" }}
                          type={"file"}
                          onChange={(e) => handleGridImageChange(e, 2)}
                        ></input>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={(e) => handleGridImageChange(e, 2)}
                      className={`file:rounded-full file:border-none file:bg-gray-800 file:text-white file:px-4 file:py-2 file:cursor-pointer w-32 file:hover:bg-white file:hover:text-gray-800`}
                    />
                  )} */}
                </div>
              </div>
            </div>
          </div>
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
];

export default VisionBoard;
