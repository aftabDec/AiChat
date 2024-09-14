import React from "react";
import { IoChatbubbleOutline, IoThumbsUp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCharacter } from "../../../redux/characterSlice";
import { useGetUserCharacterHook } from "../../../hooks/ChracterHook/getUserCharacter";

const UserCharList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetUserCharacterHook();
  const { userCharacter } = useSelector((store) => store.char);

  const handleCharacterClick = (character) => {
    dispatch(setSelectedCharacter(character));
    navigate(`/chats/${character.id}`);
  };

  return (
    <div className="max-h-[55vh] overflow-y-auto space-y-2">
      {userCharacter && userCharacter.length > 0 ? (
        userCharacter.map((character) => (
          <div
            key={character._id}
            onClick={() => handleCharacterClick(character)}
            className="flex items-center justify-between p-3 bg-zinc-800 rounded-xl shadow-md hover:bg-zinc-700 transition duration-300 cursor-pointer"
          >
            <img
              src={character?.avatar}
              className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover shadow-md"
              alt="Character"
            />
            <div className="flex-grow mx-2 md:mx-4">
              <p className="text-sm md:text-base font-semibold text-zinc-300">
                {character.name}
              </p>
              <p className="text-xs md:text-sm text-zinc-400 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {character.greetings}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <button className="flex items-center justify-center p-1 bg-zinc-700 hover:bg-zinc-600 rounded-full transition duration-300">
                <IoChatbubbleOutline className="text-lg md:text-xl text-indigo-400" />
                <p className="ml-1 text-xs md:text-sm text-white">
                  {character.chats}
                </p>
              </button>
              <button className="flex items-center justify-center p-1 bg-zinc-700 hover:bg-zinc-600 rounded-full transition duration-300">
                <IoThumbsUp className="text-lg md:text-xl text-indigo-400" />
                <p className="ml-1 text-xs md:text-sm text-white">
                  {character.likes}
                </p>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-zinc-400">No characters found.</p>
      )}
    </div>
  );
};

export default UserCharList;
