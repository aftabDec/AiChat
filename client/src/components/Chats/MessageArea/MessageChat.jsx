import React, { useEffect, useState } from "react";
import { useCharacter } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import MessageChatSkeleton from "./MessageChatSkeleton";

const MessageChat = () => {
  const { selectedCharacter } = useCharacter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setError(true);
      }
      if (selectedCharacter) {
        loading(false);
        clearTimeout(timer);
      }
      return () => clearTimeout(timer);
    }, 4000);
  }, [selectedCharacter, loading]);
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400 font-semibold text-lg">
          Error: Failed to load character data.
        </p>
      </div>
    );
  }
  return (
    <>
      {loading ? (
        <MessageChatSkeleton />
      ) : (
        <section className="flex-1 overflow-y-auto p-4">
          {/* Button to navigate to the home page */}
          <div className="space-y-5 flex flex-col">
            <div className="flex mx-20 items-start">
              <img
                src={selectedCharacter?.avatar}
                alt="Character"
                className="w-10 object-cover h-10 rounded-full"
              />
              <div className="ml-2">
                <div className="bg-gray-800 rounded-2xl p-3">
                  <p>Hello! How can I help you today?</p>
                </div>
                <p className="text-sm text-gray-400 mt-1">12:00 PM</p>
              </div>
            </div>

            <div className="flex mx-20 items-start justify-end">
              <div className="mr-2">
                <div className="bg-blue-600 p-3 rounded-2xl">
                  <p>I'm looking for information about your abilities.</p>
                </div>
                <p className="text-sm text-gray-400 mt-1">12:01 PM</p>
              </div>
              <img
                src="/assets/tate.webp"
                alt="User"
                className="w-10 object-cover h-10 rounded-full"
              />
            </div>

            {/* More messages... */}
          </div>
        </section>
      )}
    </>
  );
};

export default MessageChat;
