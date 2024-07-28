import React from "react";
import NavbarChat from "../Navbar/NavbarChat";
import ProfileChat from "../Profile/ProfileChat";
import InputChat from "../Input/InputChat";
import MessageChat from "../MessageArea/MessageChat";

const Chats = () => {
  return (
    <>
      <div className="flex flex-col  bg-gray-900 text-white"></div>

      <NavbarChat />
      <div className="flex flex-col items-center">
        {" "}
        <ProfileChat />
      </div>

      <MessageChat />

      <InputChat />
    </>
  );
};

export default Chats;
