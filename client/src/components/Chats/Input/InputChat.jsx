import React from "react";
import { GoPaperAirplane } from "react-icons/go";
const InputChat = () => {
  return (
    <>
      <footer className="p-4 my-10 flex w-full  items-end  justify-center bg-dark-secondary">
        <div className="flex  w-full justify-center items-center space-x-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-3/4 p-4 pl-10 rounded-3xl outline-none text-white"
          />
          <button className="p-4   relative right-14 bg-blue-600 rounded-full">
            <GoPaperAirplane />
          </button>
        </div>
      </footer>
    </>
  );
};

export default InputChat;
