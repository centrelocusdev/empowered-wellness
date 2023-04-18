import React from "react";
import LargeHeading from "../../components/LargeHeading";
import Navbar from "../../components/Navbar";

const VisionBoard = () => {
  return (
    <>
    <Navbar />
      <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4">
      <LargeHeading text={'Vision Board'} desc={'Visualization is one of the most powerful mind exercises you can do. Your Vision Board should focus on how you want to feel, not just on things that you want!'} />
    </div>
    </>
  )
}

export default VisionBoard