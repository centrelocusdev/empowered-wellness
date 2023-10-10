import React, { useState } from 'react'
import LargeHeading from '../../components/LargeHeading'
import GradientText from '../../components/GradientText'
import ButtonPrimary from '../../components/ButtonPrimary'
import Navbar from '../../components/Navbar'
import { moodTest } from '../../API'
import { Navigate, useNavigate } from 'react-router-dom'

const WellnessMeasure = () => {
  const navigate = useNavigate()
  const [avg, setAvg] = useState(0)

  const [toggleModal, setToggleModal] = useState(true)

  const handleModalClick = () => {
    console.log(toggleModal)
    setToggleModal((toggleModal) => !toggleModal)
  }

  const [formData, setFormData] = useState({
    stress: '0',
    anxiety: '0',
    depression: '0',
  })

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await moodTest(formData)
    const { stress, depression, anxiety } = res
    const newavg = Math.ceil((stress + depression + anxiety) / 3)
    setAvg(newavg)
    console.log(avg)
    handleModalClick()
    // if(avg >= 1 && avg <= 3) {
    //   navigate('/mindfulness')
    // } else if(avg >= 4 && avg <= 5) {
    //   navigate('/vision-board')
    // } else if(avg >= 6 && avg <= 7) {
    //   navigate('/journal')
    // } else if(avg >= 8 && avg <= 9) {
    //   navigate('/message-professional')
    // } else if(avg >= 10) {
    //   navigate('/support-circle')
    // }
  }

  const inputs = ['stress', 'anxiety', 'depression']

  return (
    <>
      <div
        className={`${toggleModal && 'hidden'}
    h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed flex justify-center items-center`}
      >
        <div className="bg-white shadow-lg rounded-3xl md:w-2/5  md:h-3/5 md:m-auto m-5 md:p-12 p-5  ">
          <div className=" mx-auto  ">
            <h2 className="md:text-3xl text-lg my-5 ">Wellness Measure</h2>
            <GradientText
              text={`Your welleness measure is ${avg}`}
              fontSize={'2xl'}
            />
            {/* <h2 className="text-lg">{`Your welleness measure is ${avg}`}</h2> */}

            <div className=" pt-5 max-h-fit max-w-full grid  gap-2">
              <button
                type={'button'}
                text={'Mindfulness'}
                onClick={() => navigate('/mindfulness')}
                class=" text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Mindfulness
              </button>
              <button
                text={'message-professional'}
                onClick={() => navigate('/message-professional')}
                type="button"
                class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Message Professional
              </button>
              <button
                type="button"
                text={'support-circle'}
                onClick={() => navigate('/support-circle')}
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Support-Circle
              </button>

              {/* <ButtonPrimary
                text={'Mindfulness'}
                handleClick={() => navigate('/mindfulness')}
              />
              <ButtonPrimary
                text={'message-professional'}
                handleClick={() => navigate('/message-professional')}
              />
              <ButtonPrimary
                text={'support-circle'}
                handleClick={() => navigate('/support-circle')}
              /> */}
              <button
                type={'button'}
                text={'close'}
                onClick={handleModalClick}
                class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Close
              </button>
            </div>
            <div className=" max-h-fit max-w-full">
              {/* <ButtonPrimary
                text={'Vision-Board'}
                handleClick={() => navigate('/vision-board')}
              />
              <ButtonPrimary
                text={'journal'}
                handleClick={() => navigate('/journal')}
              /> */}
              {/* <ButtonPrimary text={'close'} handleClick={handleModalClick} /> */}
            </div>
          </div>
        </div>
      </div>
      <Navbar />
      <div className="px-8 md:w-4/5 mx-auto py-4">
        <LargeHeading
          text={'wellness measure'}
          desc={
            ' Wellness measures are used to track how you are feeling from moment to moment and can be used to track varying moods by users. Measures range from zero (0) as being the least stressed to ten (10) being the most stressed.'
          }
        />

        <div className=" bg-gray-50 p-8 rounded-3xl flex flex-col justify-center items-center">
          <GradientText
            text={'indicate where your levels are'}
            fontSize={'3xl'}
          />

          <form
            onChange={handleChange}
            onSubmit={handleSubmit}
            className="md:w-1/2"
          >
            {inputs.map((input, key) => (
              <div key={key} className="md:flex gap-3 items-center mt-5">
                <label className="text-xl md:w-2/5 capitalize">{input}</label>
                <div className="flex gap-1">
                  <span className="">{formData[input]}</span>
                  <input
                    type="range"
                    name={input}
                    value={formData[input]}
                    max={10}
                    className="w-full accent-gray-800 bg-gray-300 rounded-full range"
                  />{' '}
                  <span>10</span>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-3">
              <ButtonPrimary text={'Track how are you feeling'} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default WellnessMeasure
