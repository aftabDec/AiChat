import React, { useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCharacterHook } from "../../hooks/ChracterHook/getAllcharacter";
import { setSelectedCharacter } from "../../redux/characterSlice";

const ForYouSection = () => {
  const allCharacters = useGetAllCharacterHook();
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const handleCharacterClick = (character) => {
    if (!authUser || !authUser.user) {
      navigate("/", { state: { showLogin: true } });
      return;
    }
    dispatch(setSelectedCharacter(character));
    navigate(`/chats/${character._id}`);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -240, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
  };

  return (
    <div className="relative h-full bg-dark-primary mt-5 w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-dark-accent mb-6">
        For You
      </h2>
      <div className="flex items-center w-full relative overflow-x-hidden">
        <button
          onClick={scrollLeft}
          className="absolute left-0 transition-all ease-in-out hover:bg-gradient-to-r from-dark-primary to-transparent rounded-3xl z-10 h-full w-16 flex items-center justify-center"
        >
          <FaArrowLeft className="text-white text-2xl" />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 pb-4 mx-2 scrollbar-hide"
        >
          {allCharacters.map((character) => (
            <div
              key={character._id}
              onClick={() => handleCharacterClick(character)}
              className="min-w-[180px] max-w-[180px] md:max-w-[220px] cursor-pointer bg-dark-secondary transition-transform ease-in hover:bg-dark-hover rounded-xl p-4 flex-shrink-0 shadow-lg hover:scale-105"
            >
              <div className="overflow-hidden mb-3 rounded-lg">
                <img
                  src={character?.avatar}
                  className="w-40 h-40 rounded-lg object-cover"
                  alt={`${character?.name} from ${character.game}`}
                />
              </div>
              <h3 className="text-lg font-bold text-dark-accent">
                {character.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {character.greetings}
              </p>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                <span>
                  by{" "}
                  <span className="font-medium">
                    @{character.userId?.username}
                  </span>
                </span>
                <span>{character.likes} likes</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 transition-all ease-in-out hover:bg-gradient-to-l from-dark-primary to-transparent rounded-3xl z-10 h-full w-16 flex items-center justify-center"
        >
          <FaArrowRight className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ForYouSection;
