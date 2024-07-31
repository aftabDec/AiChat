import React, { useEffect, useState } from "react";
import { useCharacter } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import MessageChatSkeleton from "./MessageChatSkeleton";
import { useCharacterChatHook } from "../../../hooks/ChracterHook/ChatCharacter";
import { useSelector } from "react-redux";

const MessageChat = () => {
  const { selectedCharacter } = useCharacter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const messages = useSelector((store) => store.char.characterMessage); // Access messages from Redux store

  useCharacterChatHook(); // Call the hook to fetch messages

  useEffect(() => {
    if (messages.length > 0) {
      setLoading(false); // Set loading to false when messages are fetched
    }
  }, [messages]);

  if (loading) return <MessageChatSkeleton />; // Show a loading skeleton while fetching

  if (error) return <div>Error loading messages.</div>; // Show an error message if needed

  return (
    <section className="flex-1 overflow-y-auto p-4">
      <div className="space-y-5 flex flex-col">
        {/* Render messages dynamically */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mx-20 items-start ${
              message.userId === selectedCharacter._id ? "justify-end" : ""
            }`}
          >
            {message.userId !== selectedCharacter._id && (
              <img
                src={selectedCharacter?.avatar}
                alt="Character"
                className="w-10 object-cover h-10 rounded-full"
              />
            )}
            <div
              className={`mr-2 ${
                message.userId === selectedCharacter._id ? "ml-2" : ""
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${
                  message.userId === selectedCharacter._id
                    ? "bg-blue-600"
                    : "bg-gray-800"
                }`}
              >
                <p>{message.response || message.message}</p>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
            {message.userId === selectedCharacter._id && (
              <img
                src="/assets/tate.webp"
                alt="User"
                className="w-10 object-cover h-10 rounded-full"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MessageChat;
