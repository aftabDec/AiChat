import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCharacter } from "../../redux/characterSlice";
import { useGetAllCharacterHook } from "../../hooks/ChracterHook/getAllcharacter";

const RecentChat = () => {
  const [conversations, setConversations] = useState([]);
  const { authUser } = useSelector((store) => store.user);
  const allCharacters = useGetAllCharacterHook();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    // Fetch recent conversations when the component loads
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

        // Extract the conversations array from the response data
        const conversationsData = response.data.data;

        // Check if the extracted data is an array
        if (Array.isArray(conversationsData)) {
          setConversations(conversationsData);
        } else {
          console.error("Expected an array but got:", conversationsData);
          setConversations([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching recent conversations:", error);
        setConversations([]); // Fallback to an empty array
      }
    };

    fetchConversations();
  }, [authUser]);

  const handleCharacterClick = (character) => {
    dispatch(setSelectedCharacter(character));
    navigate(`/chats/${character._id}`); // Use navigate instead of Navigate
  };

  return (
    <div className="flex-1 mt-10 scrollbar-thin scrollbar-thumb-custom overflow-y-auto">
      {/* Map through recent chats */}
      {conversations.length > 0 ? (
        conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => handleCharacterClick(conversation.characterDetails)} // Pass the correct character object
            className="justify-start border-none items-center hover:bg-slate-800 bg-dark-primary min-w-[13rem] max-w-14 btn mb-3"
          >
            <img
              src={conversation.characterDetails.avatar} // Access avatar property
              alt={`${conversation.characterDetails.name} profile picture`} // Descriptive alt text
              className="w-9 h-9 rounded-full mr-1 object-cover"
            />
            <h1 className="text-md text-gray-50 font-normal">
              {conversation.characterDetails.name}
            </h1>
          </div>
        ))
      ) : (
        <p>No recent conversations available.</p>
      )}
    </div>
  );
};

export default RecentChat;
