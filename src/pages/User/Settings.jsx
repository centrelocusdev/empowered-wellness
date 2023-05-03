import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow_circle from "../../assets/icons/left_arrow_circle.png";
import user_temp from "../../assets/images/user_temp.png";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import LoginInfo from "./ChangePassword";
import UserBasicInfo from "./UserBasicInfo";
import { getUserBasicInfo, getUserProfile } from "../../API";

const Settings = () => {
  const navigate = useNavigate();
  const tabs = ["basic info", "user profile", "change password"];
  const [tab, setTab] = useState(tabs[0]);
  const [user, setUser] = useState('')
  const [pic, setPic] = useState('')
  useEffect(() => {
    const runIt = async () => {
      const res = await getUserBasicInfo();
      setUser(res)
      const profile = await getUserProfile()
      setPic(`https://ew.thedelvierypointe.com${profile.profile_picture}`)
    };

    runIt();
  }, []);

  const handleTab = (e) => {
    setTab(e.target.textContent);
  };

  return (
    <>
      <Navbar />
      <div className="md:px-8 py-6 p-4 md:w-4/5 mx-auto">
        {/* profile and tabs */}
        <div className="flex gap-7 w-full">
          <button onClick={(e) => navigate("/dashboard")}>
            <img src={arrow_circle} className="w-12" />
          </button>
          <div className="flex gap-3">
            <img src={pic ? pic: user_temp } className="rounded-full w-20" />

            <div>
              <h5 className="text-4xl">Settings</h5>
              <p className="text-lg mt-1">{user?.email}</p>
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
        {tab == tabs[0] && <UserBasicInfo user={user} />}
        {tab == tabs[1] && <Profile user={user} />}
        {tab == tabs[2] && <LoginInfo user={user} />}
      </div>
    </>
  );
};

export default Settings;
