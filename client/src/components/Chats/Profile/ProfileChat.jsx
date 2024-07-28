import React from "react";
import { useCharacter } from "../../../context/ContextProvider";

const ProfileChat = () => {
  const { selectedCharacter } = useCharacter();
  return (
    <>
      <section className="flex items-center p-4 bg-dark-secondary  ">
        <div className="flex space-y-2 flex-col items-center justify-center">
          <img
            src={selectedCharacter?.avatar}
            alt="Character"
            className="w-14 h-14 object-cover rounded-full"
          />
          <div className="ml-4 space-y-2 flex flex-col items-center justify-center">
            <h2 className="text-xl text-gray-200 font-semibold">
              {selectedCharacter?.name}
            </h2>
            <p className="text-sm text-gray-400">
              {selectedCharacter?.greetings}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileChat;
