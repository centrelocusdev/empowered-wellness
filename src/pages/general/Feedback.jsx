import React, { useState } from "react";
import LargeHeading from "../../components/LargeHeading";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import {
  BsEmojiFrown,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsEmojiLaughing,
} from "react-icons/bs";

const Feedback = () => {
  const [reaction, setReaction] = useState()

  const handleReactChange = (reaction) => {
    toast.success('Thanks for your feedback')
    setReaction(reaction)
  }

  return (
    <>
      <Navbar />
      <div className="md:my-8 m-4 md:w-4/5 md:mx-auto">
        <LargeHeading
          text={"feedback"}
          goTo={"/"}
          desc={
            "help us making Empowered wellness more better by providing your valuable feedback"
          }
        />

        <div className="flex gap-6 text-6xl text-[#ffbc1a] justify-center">
          <BsEmojiFrown onClick={() => handleReactChange('Unsatisfied')} className="hover:text-[#ffd05c] cursor-pointer" title="Unsatisfied" />
          <BsEmojiNeutral onClick={() => handleReactChange('Neutral')} className="hover:text-[#ffd05c] cursor-pointer" title="Neutral" />
          <BsEmojiSmile onClick={() => handleReactChange('Satisfied')} className="hover:text-[#ffd05c] cursor-pointer" title="Satisfied" />
        </div>
      </div>
    </>
  );
};

export default Feedback;
