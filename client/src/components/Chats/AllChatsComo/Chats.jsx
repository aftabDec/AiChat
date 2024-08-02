import React, { Suspense } from "react";
import NavbarChat from "../Navbar/NavbarChat";
import ProfileChat from "../Profile/ProfileChat";
import InputChat from "../Input/InputChat";
import MessageChatSkeleton from "../MessageArea/MessageChatSkeleton";
const MessageChat = React.lazy(() => import("../MessageArea/MessageChat"));

const Chats = () => {
  return (
    <>
      <div className="flex flex-col  bg-gray-900 text-white"></div>

      <NavbarChat />
      <div className="flex flex-col items-center">
        {" "}
        <ProfileChat />
      </div>
      <Suspense fallback={<MessageChatSkeleton />}>
        <MessageChat />
      </Suspense>

      {/* <InputChat /> */}
    </>
  );
};

export default Chats;
