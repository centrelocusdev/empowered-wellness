import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { countries } from "countries-list";
import arrow_circle from "../../assets/icons/left_arrow_circle.png";
import user_temp from "../../assets/images/user_temp.png";
import Navbar from "../../components/Navbar";
import { BiEditAlt } from "react-icons/bi";
import ButtonPrimary from "../../components/ButtonPrimary";
import SettingsInput from "../../components/SettingsInput";
import Profile from "./Profile";
import LoginInfo from "./ChangePassword";
import UserBasicInfo from "./UserBasicInfo";

// REMINDER
//fetch user data here and then pass it to the components

const Settings = () => {
  const navigate = useNavigate();
  const tabs = ["basic info", "user profile", "change password"];
  const [tab, setTab] = useState(tabs[0]);
 
  const temp_user = {
    email: 'user@example.com',
    profilePic: user_temp,
    fullname: 'test user',
    username: 'testuser',
    gender: 'female',
    age: '23',
    zip: '1233',
    country: 'IN',
    password: '123123'
  }

  const handleTab = (e) => {
    setTab(e.target.textContent);
  };

  return (
    <>
      <Navbar />
      <div className="md:px-8 py-6 p-4 md:w-4/5 mx-auto">
        {/* profile and tabs */}
        <div className="flex gap-7 w-full">
          <button onClick={(e) => navigate("/user")}>
            <img src={arrow_circle} className="w-12" />
          </button>
          <div className="flex gap-3">
            <img src={temp_user.profilePic} className="rounded-full w-20" />

            <div>
              <h5 className="text-4xl">Settings</h5>
              <p className="text-lg mt-1">{temp_user.email}</p>
            </div>
          </div>
        </div>

        <div className="w-fit rounded-full md:px-6 px-3 py-3 mt-6 mb-12 shadow-lg flex md:gap-3 gap-1 justify-between item-center">
          {tabs.map((t, i) => (
            <button
              onClick={handleTab}
              className={`${
                t == tab && "bg-gray-800 text-white"
              } rounded-full  px-4 md:py-2 text-gray-800 hover:bg-gray-800 hover:text-white capitalize`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* forms */}
        {tab == tabs[0] && <UserBasicInfo user={temp_user} />}
        {tab == tabs[1] && <Profile user={temp_user} />}
        {tab == tabs[2] && <LoginInfo user={temp_user} />}
      </div>
    </>
  );
};

export default Settings;
