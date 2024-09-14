import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCharacterChatHook } from "../../../hooks/ChracterHook/ChatCharacter";
import { addCharacterMessage } from "../../../redux/characterSlice";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";

const MessageChat = () => {
  const sendMessage = useCharacterChatHook();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const messages = useSelector((store) => store.char.characterMessage);
  const { authUser } = useSelector((store) => store.user);
  const { selectedCharacter } = useSelector((store) => store.char);
  const dispatch = useDispatch();
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (Array.isArray(messages) && messages.length > 0) {
      setLoading(false);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return; // Don't send empty messages
    const userMessage = {
      userId: authUser.user._id,
      characterId: selectedCharacter._id,
      message: message,
      timestamp: new Date().toISOString(),
    };

    dispatch(addCharacterMessage(userMessage));
    setLoadingResponse(true);

    try {
      const response = await sendMessage(message);
      if (response && response.data) {
        const responseData = response.data.data;
        const aiMessage = {
          userId: selectedCharacter._id, // Set AI's userId
          message: responseData.response,
          characterId: selectedCharacter._id,
          timestamp: responseData.timestamp || new Date().toISOString(),
        };
        dispatch(addCharacterMessage(aiMessage));
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      setError(true);
      console.error("Failed to send message:", error);
    }
    setLoadingResponse(false);
    setMessage("");
  };

  const filteredMessages = Array.isArray(messages)
    ? messages.filter(
        (msg) =>
          msg.characterId === selectedCharacter._id &&
          (msg.userId === selectedCharacter._id ||
            msg.userId === authUser.user._id)
      )
    : [];

  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [filteredMessages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <section
        ref={scrollRef}
        className="flex-1 justify-center items-center overflow-y-auto p-4"
      >
        <div className="space-y-5 flex flex-col">
          {Array.isArray(filteredMessages) && filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => {
              const isUserMessage = msg.userId === authUser.user._id;

              return (
                <div
                  key={msg._id} // Use a unique ID if available
                  className={`flex ${
                    isUserMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`flex items-center ${
                      isUserMessage ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 ${
                        isUserMessage ? "ml-2" : "mr-2"
                      }`}
                    >
                      <img
                        src={
                          isUserMessage
                            ? authUser.user.avatar
                            : selectedCharacter.avatar
                        }
                        alt={isUserMessage ? "User" : "Character"}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </div>
                    {/* Chat Bubble */}
                    <div
                      className={`max-w-[70%] ${
                        isUserMessage ? "ml-2" : "mr-2"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-2xl ${
                          isUserMessage
                            ? "bg-blue-800 text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        <p>{msg.message}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No messages to display</p>
          )}
          {loadingResponse && <MessageLoadingSkeleton />}
          {error && (
            <p className="text-red-500">
              Failed to send message. Please try again.
            </p>
          )}
        </div>
      </section>
      <div className="flex my-5 mx-10">
        <input
          type="text"
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full rounded-lg px-4 py-3  bg-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
        />
        <button
          className="ml-3 py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors duration-300"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default MessageChat;
