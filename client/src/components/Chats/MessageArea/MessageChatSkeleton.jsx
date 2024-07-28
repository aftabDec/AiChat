import React from "react";

const MessageChatSkeleton = () => {
  return (
    <div>
      <section className="flex-1 overflow-y-auto p-4 animate-pulse">
        <div className="space-y-5 flex flex-col">
          <div className="flex mx-20 items-start">
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            <div className="ml-2 w-full">
              <div className="bg-gray-700 rounded-2xl p-3 w-3/4 h-6"></div>
              <div className="mt-1 w-1/4 h-4 bg-gray-600 rounded"></div>
            </div>
          </div>

          <div className="flex mx-20 items-start justify-end">
            <div className="mr-2 w-full">
              <div className="bg-gray-700 p-3 rounded-2xl w-3/4 h-6"></div>
              <div className="mt-1 w-1/4 h-4 bg-gray-600 rounded"></div>
            </div>
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          </div>

          {/* Add more skeleton messages if needed */}
        </div>
      </section>
    </div>
  );
};

export default MessageChatSkeleton;
