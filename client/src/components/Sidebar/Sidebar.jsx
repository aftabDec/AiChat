import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaRegCompass } from "react-icons/fa6";
import RecentChat from "./RecentChat";
import Profile from "./Profile";
import ProfileOptions from "./ProfileOptions";
const Sidebar = () => {
  const [showProfileGroup, SetShowProfileGroup] = useState(false);
  const profileHandle = () => {
    SetShowProfileGroup((prev) => !prev);
  };
  return (
    <>
      {" "}
      <div className="fixed m-3 top-0 left-0  h-[calc(99%-1rem)] w-64 rounded-xl flex flex-col bg-dark-primary text-white shadow-lg">
        <h1 className="font-semibold text-lg m-8">fictional.ai</h1>
        {/*Create and discover section*/}
        <div
          className="flex flex-col mb-5 w-full bg
        -dark-primary text-white"
        >
          <div className="right-8  flex flex-col gap-3 relative">
            {" "}
            <button className="btn btn-md justify-start text-lg btn-active hover:bg-dark-secondary mx-12 rounded-full">
              <FiPlus className="text-2xl text-gray-300" />
              Create
            </button>
            <button className="btn justify-start w-52 ml-12">
              <FaRegCompass className="text-2xl text-gray-300" />
              Discover
            </button>
          </div>
        </div>
        {/*chat section*/}
        <div
          className="flex flex-col h-[46%] w-full bg-dark-primary text-white
        "
        >
          <p className="mb-3 relative left-4">Chats</p>
          <RecentChat />
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
    </>
  );
};

export default Sidebar;
