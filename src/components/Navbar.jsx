import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import { BsTextLeft } from "react-icons/bs";
import logo from "../assets/images/logo.png";
import ButtonPrimary from "./ButtonPrimary";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../API";

const Navbar = ({ loggedin }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const currentTab = window.location.href.split("/")[3];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSidebar = () => {
    setSidebar((sidebar) => !sidebar);
    setIsOpen(false)
  };

  const handleClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    const access_token = Cookies.get("access-token");
    access_token && setIsLoggedIn(true);
  }, []);

  const handleLogoutClick = async () => {
    const res = await logout();
    res && setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <section className="transition-all">
      <div className="md:hidden bg-fade-pink text-gray-50 p-4 flex justify-between text-gray-200">
        <div className="flex gap-1 md:hidden">
          <img
            onClick={(e) => navigate('/')}
            src={logo}
            alt="logo"
            className="w-16 cursor-pointer text-3xl font-bold"
          />
          {isLoggedIn && (
            <button onClick={handleSidebar} className="text-2xl">
              <BsTextLeft />
            </button>
          )}
        </div>
        <button onClick={handleClick} className="text-4xl">
          {isOpen ? <BiX /> : <BiMenu />}
        </button>
      </div>
      <div className={`bg-white text-gray-700  md:flex justify-between`}>
        <div
          className={`py-3 md:px-16 px-8 md:h-auto h-screen transition-all md:flex justify-between w-full  ${
            isOpen ? "block w-full fixed z-40 bg-fade-pink text-white" : "hidden"
          }`}
        >
          <div className="md:flex hidden">
            <img
              onClick={(e) => navigate('/')}
              src={logo}
              alt="logo"
              className="w-20 cursor-pointer text-3xl font-normal"
            />
           {isLoggedIn && (
            <button onClick={handleSidebar} className="text-2xl ml-2">
              <BsTextLeft />
            </button>
          )}
          </div>

          <div className="flex md:flex-row flex-col gap-4 justify-start md:items-center md:mt-0 mt-5 ">
            <Link
              to={"/feedback"}
              className="w-fit cursor-pointer hover:text-sky-400"
            >
              Feedback
            </Link>
            <Link
              to={"/crisis-support"}
              className="w-fit cursor-pointer hover:text-sky-400"
            >
              Crisis support
            </Link>
            {isLoggedIn ? (
              <ButtonPrimary text={"Logout"} handleClick={handleLogoutClick} />
            ) : (
              <>
                <Link
                  to={"/register"}
                  className="w-fit cursor-pointer hover:text-sky-400"
                >
                  Register
                </Link>
                <ButtonPrimary
                  text={"Login"}
                  handleClick={(e) => navigate("/login")}
                />
              </>
            )}
          </div>
        </div>

        {sidebar && (
          <div
            onClick={handleSidebar}
            className="bg-[rgba(0,0,0,0.4)] -translate-y-24 md:translate-y-0 w-full fixed z-10"
          >
            <div className="h-screen mt-20 mx-2 w-[300px] bg-gray-200 rounded-3xl p-8 text-center">
              {actions.map((action, key) => (
                <Link to={`/${action}`} key={key}>
                  <div
                    className={`w-full text-lg font-semibold px-6 py-2 my-1 rounded-full hover:bg-gray-800 hover:text-white hover:font-normal capitalize ${
                      currentTab == action &&
                      "bg-gray-800 text-white border font-light"
                    }`}
                  >
                    {action}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const actions = [
  "assessments",
  "journal",
  "wellness-measure",
  "vision-board",
  "mindfulness",
  "message-professional",
  "support-circle",
  "settings",
  "my-statistics",
];

export default Navbar;
