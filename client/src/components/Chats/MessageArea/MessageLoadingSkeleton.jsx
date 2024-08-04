import React from "react";

const MessageLoadingSkeleton = () => {
  return (
    <div className="flex mx-20 items-start justify-start animate-pulse">
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton bg-gray-700 h-10 w-10 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageLoadingSkeleton;
