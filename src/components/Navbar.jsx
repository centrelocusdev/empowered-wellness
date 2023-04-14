import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {BiMenu, BiX} from "react-icons/bi"
import logo from "../assets/images/logo.png"
import ButtonPrimary from "./ButtonPrimary";

const Navbar = ({isWhite}) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(isOpen => !isOpen)
  }

  return (
    <section className="transition-all">
    <div className="md:hidden block bg-fade-pink text-gray-50 p-4 flex justify-between text-gray-200">
      <img src={logo} alt="logo" className="w-20" />
      <button onClick={handleClick} className="text-4xl">{isOpen ? <BiX /> : <BiMenu />}</button>
    </div>
    <div className={`bg-white text-gray-700  md:flex justify-between py-3 md:px-16 px-8 md:h-auto h-screen transition-all ${isOpen ? 'block w-full fixed z-40 bg-fade-pink' : 'hidden'}`}>
    <img src={logo} alt="logo" className="w-20 cursor-pointer text-3xl font-bold hidden md:block" />

      <div className="flex md:flex-row flex-col gap-4 justify-start md:items-center md:mt-0 mt-5 ">
        <button onClick={(e) => navigate('#')} className="w-fit cursor-pointer hover:text-sky-400">Feedback</button>
        <button onClick={(e) => navigate('#')} className="w-fit cursor-pointer hover:text-sky-400">Crises support</button>
        <button onClick={(e) => navigate('/register')} className="w-fit cursor-pointer hover:text-sky-400">Register</button>
       <ButtonPrimary text={'Login'} handleClick={(e) => navigate('/login')} />
      </div>
    </div>
    </section>
  );
};

export default Navbar;
