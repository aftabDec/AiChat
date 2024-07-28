import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { useCharacter } from "../../../context/ContextProvider";

const NavbarChat = () => {
  const { selectedCharacter } = useCharacter();
  return (
    <>
      <header className="flex bg-dark-secondary items-center justify-between p-4 ">
        <div className="flex p-2 mx-5 items-center">
          <img
            src={selectedCharacter?.avatar}
            alt="Character"
            className="w-10 object-cover h-10 rounded-full"
          />
          <div className="ml-2">
            <h2 className="text-lg font-semibold">{selectedCharacter?.name}</h2>
            <p className="text-sm text-gray-400">
              <span className="mr-1">by</span><span>@</span>
              {selectedCharacter?.userId?.username}
            </p>
          </div>
        </div>
        <button className="p-2 mx-10 border rounded-full border-gray-700 hover:bg-zinc-800 transition-all ease-in bg-dark-secondary text-gray-400 ">
          <SlOptionsVertical />
        </button>
      </header>
    </>
  );
};

export default NavbarChat;
