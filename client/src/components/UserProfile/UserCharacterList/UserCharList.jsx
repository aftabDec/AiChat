import React from "react";
import { IoChatbubbleOutline, IoThumbsUp } from "react-icons/io5";
import { useCharacter } from "../../../context/ContextProvider";
import { useGetUserCharacterHook } from "../../../hooks/ChracterHook/getUserCharacter";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCharacter } from "../../../redux/characterSlice";
import { useNavigate } from "react-router-dom";

const UserCharList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCharacterClick = (character) => {
    dispatch(setSelectedCharacter(character));

    navigate(`/chats/${character.id}`);
  };
  useGetUserCharacterHook();

  const { userCharacter } = useSelector((store) => store.char);

  return (
    <>
      {userCharacter && userCharacter.length > 0 ? (
        userCharacter.map((character) => (
          <div
            onClick={() => handleCharacterClick(character)}
            key={character._id} // Ensure to use the correct key
            className="flex my-2 hover:bg-zinc-800 items-center justify-between p-3 text-white rounded-3xl shadow-lg max-w-lg mx-auto w-full"
          >
            <img
              src={character?.avatar}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover"
              alt="Character"
            />
            <div className="flex flex-col flex-grow mx-4">
              <p className="text-lg md:text-xl font-bold">{character.name}</p>
              <p className="text-gray-400 text-sm  text-ellipsis whitespace-nowrap w-72 overflow-hidden  md:text-base">
                {character.greetings}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <button className="flex hover:bg-zinc-700 ease-in transition-all rounded-full p-2 items-center space-x-1 text-sm md:text-base">
                <IoChatbubbleOutline className="text-2xl md:text-3xl" />
                <p className="text-[15px]">{character.chats}</p>
              </button>
              <button className="flex items-center ease-in transition-all hover:bg-zinc-700 rounded-full p-2 space-x-1 text-sm md:text-base">
                <IoThumbsUp className="text-2xl md:text-3xl" />
                <p className="text-[15px]">{character.likes}</p>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No characters found.</p>
      )}
    </>
  );
};

export default UserCharList;
