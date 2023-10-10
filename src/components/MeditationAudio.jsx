import React, { useState, useRef } from 'react'
import useRefArray from './useRefArray'
import pause from '../assets/icons/pause.png'
import { FiPlayCircle, FiPauseCircle } from 'react-icons/fi'

const MeditationAudio = ({ data }) => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRefs = useRefArray(data.length, () => React.createRef())

  const togglePlay = (index) => {
    if (index === currentAudioIndex) {
      if (isPlaying) {
        audioRefs[index].current.pause()
      } else {
        audioRefs[index].current.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      if (currentAudioIndex !== null) {
        audioRefs[currentAudioIndex].current.pause()
      }
      setCurrentAudioIndex(index)
      setIsPlaying(true)
      audioRefs[index].current.load()
      audioRefs[index].current.play()
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRefs[currentAudioIndex].current.currentTime)
  }

  const handleTimeSeek = (e, index) => {
    const seekTime = parseFloat(e.target.value)
    audioRefs[index].current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  return (
    <>
      {data.map(({ title, desc, from_grad, audio }, key) => (
        <div
          key={key}
          className={`md:flex gap-4 items-center rounded-3xl px-5 py-3 my-3 shadow-lg bg-gradient-to-l via-white from-${from_grad} to-white`}
        >
          <div className="w-1/5 mb-3 md:mb-0">
            <button
              onClick={() => togglePlay(key)}
              className="text-2xl bg-light-skyblue text-gray-600 p-1 rounded-full"
            >
              {currentAudioIndex === key && isPlaying ? (
                <FiPauseCircle />
              ) : (
                <FiPlayCircle />
              )}
            </button>
          </div>

          <div>
            <h4 className="text-fade-brown text-xl">{title}</h4>
            <p className="text-gray-500">{desc}</p>
            <div>
              <audio ref={audioRefs[key]} onTimeUpdate={handleTimeUpdate}>
                <source src={audio} type="audio/mpeg" />
              </audio>

              {currentAudioIndex === key && (
                <input
                  type="range"
                  min="0"
                  max={
                    audioRefs[key].current
                      ? audioRefs[key].current.duration
                      : "0"
                  }
                  value={currentTime}
                  onChange={(e) => handleTimeSeek(e, key)}
                  className="accent-light-skyblue w-full text-white border-none"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default MeditationAudio
