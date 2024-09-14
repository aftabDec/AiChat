import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCharacter } from "../../redux/characterSlice";
import { useGetAllCharacterHook } from "../../hooks/ChracterHook/getAllcharacter";

const RecentChat = () => {
  const [conversations, setConversations] = useState([]);
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCharacters = useGetAllCharacterHook();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userId = authUser.user._id;
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5000/api/v1/recent-conversations/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConversations(response.data.data || []);
      } catch (error) {
        console.error("Error fetching recent conversations:", error);
        setConversations([]);
      }
    };

    fetchConversations();
  }, [authUser]);

  const handleCharacterClick = (character) => {
    dispatch(setSelectedCharacter(character));
    navigate(`/chats/${character._id}`);
  };

  return (
    <div className="flex-1 mt-4 scrollbar-thin scrollbar-thumb-zinc-600 overflow-y-auto">
      {conversations.length > 0 ? (
        conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => handleCharacterClick(conversation.characterDetails)}
            className="flex items-center gap-2 p-2 bg-zinc-800 ease-in transition-all hover:bg-zinc-700 rounded-md cursor-pointer mb-2"
          >
            <img
              src={conversation.characterDetails.avatar}
              alt={`${conversation.characterDetails.name} avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <h1 className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg text-zinc-300">
              {conversation.characterDetails.name}
            </h1>
          </div>
        ))
      ) : (
        <p className="text-zinc-400 text-xs sm:text-sm md:text-base">
          No recent conversations available.
        </p>
      )}
    </div>
  );
};

export default RecentChat;
