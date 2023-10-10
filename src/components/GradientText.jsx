import React from "react";

const GradientText = ({ text, isUppercase, fontSize }) => {
  return (
    <h5 className={`text-transparent bg-clip-text bg-gradient-to-r from-light-blue via-fade-pink to-fade-pink text-shadow capitalize text-${fontSize ? fontSize : 'lg'} ${isUppercase && 'uppercase' }`}>
      {text}
    </h5>
  );
};

export default GradientText;
