import React, { useState } from "react";
import { FaHome, FaRegCompass, FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import RecentChat from "./RecentChat";
import Profile from "./Profile";
import ProfileOptions from "./ProfileOptions";

const Sidebar = () => {
  const [showProfileGroup, SetShowProfileGroup] = useState(false);
  const profileHandle = () => {
    SetShowProfileGroup((prev) => !prev);
  };
  return (
    <div className="w-64 my-3 ml-3 items-center rounded-lg bg-dark-primary p-4 flex flex-col">
      <div
        className="flex items-center flex-col mb-5 w-full bg
        -dark-primary text-white"
      >
        <h1 className="font-semibold text-2xl m-8">fictional.ai</h1>
        <div className="right-8  flex flex-col gap-3 relative">
          {" "}
          <button className="btn md:text-md  md:max-w-48 btn-md justify-start text-lg btn-active hover:bg-dark-secondary mx-12 rounded-full">
            <FiPlus className="text-2xl  text-gray-300" />
            Create
          </button>
          <button className="btn md:text-md md:max-w-48 justify-start w-52 ml-12">
            <FaRegCompass className="text-2xl text-gray-300" />
            Discover
          </button>
          <p className=" relative h-0  left-12">Chats</p>
        </div>

        <div className="flex h-72 flex-col items-center bg-dark-primary ">
          {" "}
          <RecentChat />
        </div>
      </div>
      <div
        className={`transition-all absolute mx-4 z-10 bottom-28 duration-300 ease-in-out ${
          showProfileGroup ? " opacity-100" : "invisible opacity-0"
        } overflow-hidden`}
      >
        <ProfileOptions />
      </div>
      <button type="button" onClick={profileHandle}>
        <Profile />
      </button>
    </div>
  );
};

export default Sidebar;
