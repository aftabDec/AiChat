import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCharacterChatHook } from "../../../hooks/ChracterHook/ChatCharacter";
import { addCharacterMessage } from "../../../redux/characterSlice";

const MessageChat = () => {
  const sendMessage = useCharacterChatHook();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const messages = useSelector((store) => store.char.characterMessage);
  const { authUser } = useSelector((store) => store.user);
  const { selectedCharacter } = useSelector((store) => store.char);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (Array.isArray(messages) && messages.length > 0) {
      setLoading(false);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const userMessage = {
      userId: authUser.user._id,
      message: message,
      timestamp: new Date().toISOString(),
    };

    // Dispatch the user message to the Redux store
    dispatch(addCharacterMessage(userMessage));

    try {
      // Send message and handle the response
      const response = await sendMessage(message);

      // Log the entire response object to see its structure
      console.log("API Response:", response);

      // Check the structure of the response data
      if (response && response.data) {
        console.log("Response Data:", response.data);

        // Ensure response.data is an object
        const responseData = response.data;
        const aiMessage = {
          userId: selectedCharacter._id,
          message: responseData.response,
          timestamp: responseData.timestamp || new Date().toISOString(),
        };
        console.log(aiMessage, "ai Message");

        // Dispatch the AI message to the Redux store
        dispatch(addCharacterMessage(aiMessage));
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      setError(true);
      console.error("Failed to send message:", error);
    }

    setMessage("");
  };

  // Ensure messages is an array before filtering
  const filteredMessages = Array.isArray(messages)
    ? messages.filter(
        (msg) =>
          msg.userId === selectedCharacter._id ||
          msg.userId === authUser.user._id
      )
    : [];

  return (
    <section className="flex-1 overflow-y-auto p-4">
      <div className="space-y-5 flex flex-col">
        {Array.isArray(filteredMessages) && filteredMessages.length > 0 ? (
          filteredMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex mx-20 items-start ${
                msg.userId === selectedCharacter._id ? "justify-end" : ""
              }`}
            >
              {msg.userId !== selectedCharacter._id && (
                <img
                  src={selectedCharacter?.avatar}
                  alt="Character"
                  className="w-10 object-cover h-10 rounded-full"
                />
              )}
              <div
                className={`mr-2 ${
                  msg.userId === selectedCharacter._id ? "ml-2" : ""
                }`}
              >
                <div
                  className={`p-3 rounded-2xl ${
                    msg.userId === selectedCharacter._id
                      ? "bg-blue-600"
                      : "bg-gray-800"
                  }`}
                >
                  <p>{msg.message}</p>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
              {msg.userId === selectedCharacter._id && (
                <img
                  src={msg.userId.avatar}
                  alt="User"
                  className="w-10 object-cover h-10 rounded-full"
                />
              )}
            </div>
          ))
        ) : (
          <p>No messages to display</p>
        )}

        <div className="flex mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            className="ml-2 py-2 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default MessageChat;
