import React from "react";
import { useCharacterChatHook } from "../../../hooks/ChracterHook/ChatCharacter";
import { useSelector } from "react-redux";

const ProfileChat = () => {
  // Fetch character messages when the component mounts or when the selected character changes
  useCharacterChatHook();

  // Get the selected character from the Redux store
  const selectedCharacter = useSelector(
    (store) => store.char.selectedCharacter
  );

  // Get the character messages from the Redux store (if needed)
  const messages = useSelector((store) => store.char.characterMessage);

  // Render the profile section
  return (
    <>
      <section className="flex items-center p-4 bg-dark-secondary">
        <div className="flex space-y-2 flex-col items-center justify-center">
          {/* Display character avatar */}
          <img
            src={selectedCharacter?.avatar } // Fallback to a default image if needed
            alt="Character"
            className="w-14 h-14 object-cover rounded-full"
          />
          <div className="ml-4 space-y-2 flex flex-col items-center justify-center">
            {/* Display character name */}
            <h2 className="text-xl text-gray-200 font-semibold">
              {selectedCharacter?.name }
            </h2>
            {/* Display character greetings */}
            <p className="text-sm text-gray-400">
              {selectedCharacter?.greetings || "No greetings available"}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileChat;
