import React, { useEffect, useState } from 'react'
import * as htmlToImage from 'html-to-image'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'
import LargeHeading from '../../components/LargeHeading'
import Navbar from '../../components/Navbar'
import menBack from '../../assets/images/men_back.png'
import centeredGrid from '../../assets/images/centered_grid.png'
import ButtonPrimary from '../../components/ButtonPrimary'
import arrow_circle from '../../assets/icons/left_arrow_circle.png'
import collage from '../../assets/icons/collage.png'
import image from '../../assets/icons/image.png'
import ticon from '../../assets/icons/ticon.png'
import default_img from '../../assets/images/default_msg.png'
import { useCallback, useRef } from 'react'

import {
  createVisionBoard,
  getAllVisionBoard,
  removeVisionBoard,
  updateVisionBoard,
} from '../../API'
import { BsFillPencilFill, BsFillImageFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'

const showMatrix = () => {
  const [texts, setTexts] = useState([])
  const [images, setImages] = useState([])
  // const [Gridtexts, setGridTexts] = useState([])
  const [textValue, setTextValue] = useState('')
  const [numColumns, setNumColumns] = useState(2)
  const [numRows, setNumRows] = useState(2)
  const [alldates, setAllDates] = useState([])
  const [dateIndex, setDateIndex] = useState(0)
  const elementRef = useRef(null)


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
  useEffect(() => {
    const runIt = async () => {
      //   const res = await getAllVisionBoard()
      let data = await getAllVisionBoard()
      // console.log(res[0].vbcode_data,"resss")
      let  dates = data.map((item)=> item.date)
      setAllDates(dates)
      console.log(dates,"i am dates")
      const res = data[dateIndex].vbcode_data
      console.log(dateIndex)
      console.log(data, res,"in show matrix useffect")
       const { response, vbcode } = res[0]?.vbcode == 1 ? res[0] : res[1]

       // console.log( res[0].vbcode,res[1].vbcode)

       console.log(response, vbcode, 'in matrix')
       if (vbcode == 1) {
         response.map(({ placeholder_id, image,text, id }) => {
           console.log(placeholder_id, image, id, text,'in loop')
           if (image !== 'NO! IMAGE FOUND') {
             setImages((prevState) => {
               const newState = [...prevState]
               newState[placeholder_id] = {
                 image: `https://ew.thedelvierypointe.com${image}`,
                 id,
               }
               return newState
             })
            }
        if(text!==null){
           setTexts((prevState)=>{
            const newState =  [...prevState]
            newState[placeholder_id]={
                text:text,
                id,    
            }
            return newState
           })

        }
         })
       }

    }
    runIt()
  }, [dateIndex])

 const handleDateSelection =(event)  =>{
    const {value} = event.target
    setDateIndex(value)
    setTexts([])
    setImages([])


 }
    const handleSelection = (event) => {
      const { value } = event.target
      const [rows, columns] = value.split('x').map(Number)
      setNumColumns(columns)
      setNumRows(rows)
    }

  const generateFields = () => {
    const fields = []
    console.log(images,"images to check index")
    console.log(texts,"texts to check index")
    for (let row = 0; row < numRows; row++) {
      const rowFields = []
      for (let col = 0; col < numColumns; col++) {
        const index = row * numColumns + col
        rowFields.push(
          <div
            key={index}
            className="w-64 rounded-2xl flex items-end justify-end p-2 md:mx-2 my-3 h-52"
          >
            <div className="w-full h-full bg-white rounded-2xl  relative">
              {images[index] ? (
                <img
                  src={images[index].image}
                  alt={`Image ${index}`}
                  className="w-full h-full rounded-2xl"
                />
              ) : (
                <textarea
                  type="text"
                  //   placeholder="Enter text..."
                  value={texts[index]?.text || ''}
                  //   value={texts[index] || ''}
                  //   onChange={(e) => {
                  //     setTextValue(e.target.value)
                  //   }}
                  className="w-full h-full rounded-2xl bg-yellow-200 text-black px-4 py-2"
                ></textarea>
              )}
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
      <select
        onChange={handleDateSelection}
        className="bg-gray-800 text-white rounded px-3 py-2"
      >{alldates.map((date,index)=>{

        return <option value={index} >{date}</option>
      })}
      </select>

      <div className="mt-3">
        <div className="flex items-center gap-2">
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
        </div>
        {
          <div>
            <div
              ref={elementRef}
              id="check"
              className="flex flex-col mt-4 md:bg-gray-100 md:p-5 rounded-3xl  w-fit"
            >
              {generateFields()}
            </div>
            <button
              class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={htmlToImageConvert}
            >
              Download Vision Board
            </button>
          </div>
        }
      </div>
    </>
  )
}

export default showMatrix;
