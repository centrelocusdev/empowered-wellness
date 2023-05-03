import React, { useEffect, useState } from "react";
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
import colorsImage from "../../assets/images/canvas_1.png";
import { FiSave, FiPlus } from "react-icons/fi";
import {
  createVisionBoard,
  getAllVisionBoard,
  updateVisionBoard,
} from "../../API";
import { BsFillPencilFill } from "react-icons/bs";

const VisionBoard = () => {
  const tabs = ["collage", "text", "image"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [vbcode, setVbcode] = useState(0);
  const [name, setName] = useState();
  const [responses, setResponses] = useState([]);
  const [images, setImages] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [numRows, setNumRows] = useState(2);
  const [edit, setEdit] = useState(false);
  const [gridImages, setGridImages] = useState([]);
  const [gridImagesPath, setGridImagesPath] = useState([]);

  useEffect(() => {
    const runIt = async () => {
      const res = await getAllVisionBoard();
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
            newState[
              placeholder_id
            ] = `https://ew.thedelvierypointe.com${image}`;
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

  const toggleEditClick = () => setEdit((prev) => !prev);

  const handleSelection = (event) => {
    const { value } = event.target;
    const [columns, rows] = value.split("x").map(Number);
    setNumColumns(columns);
    setNumRows(rows);
  };

  const hanldeImageChange = async (event, index, id) => {
    const file = event.target.files[0];
    if(id) {
      const res = await updateVisionBoard({vbcode, id, image: file})
      console.log(res)
    }
    setResponses((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = file;
      return newValues;
    });
    setImages((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = {
        image: URL.createObjectURL(file),
        id,
      };
      return newValues;
    });
  };

  const generateFields = () => {
    const fields = [];
    for (let row = 0; row < numRows; row++) {
      const rowFields = [];
      for (let col = 0; col < numColumns; col++) {
        const index = row * numColumns + col;
        rowFields.push(
          <div
            style={{
              "--image-url": `url(${
                images[index] ? images[index].image : default_img
              })`,
            }}
            className="w-64 rounded-2xl flex items-end justify-end p-5 md:mx-2 my-3 h-52 bg-[image:var(--image-url)] bg-cover"
          >
            {images[index] && (
              <>
                <label
                  htmlFor="filePicker"
                  className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                >
                  <BsFillPencilFill />
                </label>
                <input
                  id="filePicker"
                  style={{ visibility: "hidden" }}
                  type={"file"}
                  onChange={(e) =>
                    hanldeImageChange(e, index, images[index].id)
                  }
                ></input>
              </>
            )}
            <input
              type="file"
              onChange={(e) => hanldeImageChange(e, index)}
              className={`${
                images[index] && "hidden"
              } file:rounded-full file:border-none file:bg-gray-800 file:text-white file:px-4 file:py-2 file:cursor-pointer w-32 translate-x-12 mx-auto file:hover:bg-white file:hover:text-gray-800`}
            />
          </div>
        );
      }
      fields.push(
        <div key={row} className="flex md:flex-row flex-col w-fit mx-auto">
          {rowFields}
        </div>
      );
    }
    return fields;
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const imageObjects = responses.map((image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      return new Promise((resolve, reject) => {
        reader.onload = () => {
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
    });

    Promise.all(imageObjects).then(async (results) => {
      if (images.length) {
        const fd = results.map((r, i) => ({
          placeholder_id: i,
          image: r,
          id: images[i].id,
          text: "",
          video: "",
        }));
        console.log(fd);
        const jsonData = JSON.stringify(fd);
        const res = await updateVisionBoard({ vbcode, responses: jsonData });
        setResponses([]);
      } else {
        const fd = results.map((r, i) => ({
          placeholder_id: i,
          image: r,
          text: "",
          video: "",
        }));
        const jsonData = JSON.stringify(fd);
        const res = await createVisionBoard({ vbcode, responses: jsonData });
        setResponses([]);
      }
    });
  };

  const handleGridImageChange = async (e, i, id) => {
    const file = e.target.files[0];
    if(id) {
      const res = await updateVisionBoard({vbcode, id, image: file})
      console.log(res)
    }
    setGridImagesPath((prevValues) => {
      const newState = [...prevValues];
      newState[i] = file;
      return newState;
    });
    setGridImages((prevValues) => {
      const newState = [...prevValues];
      newState[i] = URL.createObjectURL(file);
      return newState;
    });
  };

  const handleGridImageSubmit = () => {
    const imageObjects = gridImagesPath.map((image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      return new Promise((resolve, reject) => {
        reader.onload = () => {
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
    });

    Promise.all(imageObjects).then(async (results) => {
      const fd = results.map((r, i) => ({
        placeholder_id: i,
        image: r,
        text: "",
        video: "",
      }));
      const jsonData = JSON.stringify(fd);
      if (gridImages.length) {
        const res = await updateVisionBoard({ vbcode, responses: jsonData });
        console.log("updating...", res);
        setGridImagesPath([]);
      } else {
        const res = await createVisionBoard({ vbcode, responses: jsonData });
        console.log(res);
        setGridImagesPath([]);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="md:px-8 px-4 m-4 md:w-4/5 md:mx-auto py-4">
        <div className="md:flex items-start gap-4 justify-between">
          <LargeHeading
            text={"Vision Board"}
            desc={
              "Visualization is one of the most powerful mind exercises you can do. Your Vision Board should focus on how you want to feel, not just on things that you want!"
            }
          />
          {/* <ButtonPrimary text={"add"} icon={<FiPlus />} isLight={true} /> */}
        </div>

        {vbcode == 0 && (
          <div className="flex md:flex-row flex-col justify-start gap-8">
            {templates.map((template, key) => (
              <div key={key} className=" rounded-2xl shadow-xl p-4">
                <h3 className="mb-1 capitalize text-center text-lg ">
                  {template.name}
                </h3>
                <div className="w-72 flex flex-col">
                  <img
                    src={template.image}
                    className="h-[16rem] rounded-xl mb-3"
                  />
                  <ButtonPrimary
                    text={"select"}
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

              <ButtonPrimary
                text={"save"}
                icon={<FiSave />}
                handleClick={handleSaveClick}
              />
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-2">
                {currentTab == tabs[0] && (
                  <select
                    onChange={handleSelection}
                    className="bg-gray-800 text-white rounded px-3 py-2"
                  >
                    <option value="2x2">2x2</option>
                    <option value="3x2">3x2</option>
                    <option value="4x3">4x3</option>
                  </select>
                )}
                <button
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
                </button>
              </div>
              {currentTab == tabs[0] && (
                <div className="flex flex-col mt-4 md:bg-gray-100 md:p-5 rounded-3xl">
                  {generateFields()}
                </div>
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
              <ButtonPrimary
                text={"save"}
                icon={<FiSave />}
                handleClick={handleGridImageSubmit}
              />
            </div>
            <div className="flex flex-col mt-4 md:bg-gray-100 md:p-5 rounded-3xl">
              <div className="md:flex justify-center gap-3 md:w-4/5 mx-auto h-[30rem]">
                <div className="flex flex-col h-full">
                  <div
                    style={{
                      "--image-url": `url(${
                        gridImages[0] ? gridImages[0] : default_img
                      })`,
                    }}
                    className="h-1/2 w-64 bg-white rounded-2xl flex items-end justify-end p-5 md:mx-2 my-3 h-52 bg-[image:var(--image-url)] bg-cover"
                  >
                    {gridImages[0] ? (
                      <>
                        <label
                          htmlFor="filePicker"
                          className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                        >
                          <BsFillPencilFill />
                        </label>
                        <input
                          id="filePicker"
                          style={{ visibility: "hidden" }}
                          type={"file"}
                          onChange={(e) => handleGridImageChange(e, 0)}
                        ></input>
                      </>
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
                      "--image-url": `url(${
                        gridImages[1] ? gridImages[1] : default_img
                      })`,
                    }}
                    className="h-1/2 w-64 bg-white rounded-2xl flex items-end justify-end p-5 md:mx-2 my-3 h-52 bg-[image:var(--image-url)] bg-cover"
                  >
                    {gridImages[1] ? (
                      <>
                        <label
                          htmlFor="filePicker"
                          className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                        >
                          <BsFillPencilFill />
                        </label>
                        <input
                          id="filePicker"
                          style={{ visibility: "hidden" }}
                          type={"file"}
                          onChange={(e) => handleGridImageChange(e, 1)}
                        ></input>
                      </>
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
                  style={{
                    "--image-url": `url(${
                      gridImages[2] ? gridImages[2] : default_img
                    })`,
                  }}
                  className="h-[97%] md:w-72 w-64 bg-white rounded-2xl flex items-end justify-end p-5 md:mx-2 h-52 bg-[image:var(--image-url)] bg-cover"
                >
                  {gridImages[2] ? (
                    <>
                      <label
                        htmlFor="filePicker"
                        className="bg-gray-800 shadow-xl text-white p-2 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                      >
                        <BsFillPencilFill />
                      </label>
                      <input
                        id="filePicker"
                        style={{ visibility: "hidden" }}
                        type={"file"}
                        onChange={(e) => handleGridImageChange(e, 2)}
                      ></input>
                    </>
                  ) : (
                    <input
                      type="file"
                      onChange={(e) => handleGridImageChange(e, 2)}
                      className={`file:rounded-full file:border-none file:bg-gray-800 file:text-white file:px-4 file:py-2 file:cursor-pointer w-32 file:hover:bg-white file:hover:text-gray-800`}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
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
