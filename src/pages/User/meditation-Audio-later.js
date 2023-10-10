import React, { useState, useRef } from 'react'
import pause from '../assets/icons/pause.png'
import { FiPlayCircle, FiPauseCircle } from 'react-icons/fi'

const MeditationAudio = ({ data }) => {
  console.log()
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef(null)

  const togglePlay = (index) => {
    if (index === currentAudioIndex) {
      setIsPlaying(!isPlaying)
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    } else {
      setCurrentAudioIndex(index)
      setIsPlaying(true)
      audioRef.current.load()
      audioRef.current.play()
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleTimeSeek = (e) => {
    const seekTime = parseFloat(e.target.value)
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  return (
    <>
      {data.map(
        (
          { title: name, desc: description, from_grad, audio: file_link },
          key
        ) => (
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
                <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}>
                  <source src={audio} type="audio/mpeg" />
                </audio>

                {currentAudioIndex === key && (
                  <input
                    type="range"
                    min="0"
                    max={audioRef.current ? audioRef.current.duration : '0'}
                    value={currentTime}
                    onChange={handleTimeSeek}
                    className="accent-light-skyblue w-full text-white border-none"
                  />
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default MeditationAudio
