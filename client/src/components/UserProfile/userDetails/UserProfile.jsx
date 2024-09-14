import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { authUser } = useSelector((store) => store.user);

  return (
    <div className="flex flex-col items-center justify-center space-y-2  p-4 rounded-xl shadow-md max-h-[40vh] overflow-hidden">
      {/* User Profile */}
      <div className="flex flex-col items-center space-y-2">
        <img
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-md"
          src={authUser?.user?.avatar}
          alt="User Avatar"
        />
        <p className="text-sm md:text-base font-semibold text-indigo-300">
          {authUser?.user?.fullName}
        </p>
      </div>

      {/* Followers and Chats */}
      <div className="flex items-center justify-center space-x-4 text-center">
        <div>
          <button className="text-sm md:text-base font-medium text-white">
            <span className="block">1000</span>
            <span className="text-xs md:text-sm text-zinc-400">followers</span>
          </button>
        </div>
        <div>
          <button className="text-sm md:text-base font-medium text-white">
            <span className="block">18m</span>
            <span className="text-xs md:text-sm text-zinc-400">chats</span>
          </button>
        </div>
        <div>
          <button className="text-sm md:text-base font-medium text-white">
            <span className="block">108</span>
            <span className="text-xs md:text-sm text-zinc-400">following</span>
          </button>
        </div>
      </div>

      {/* Follow Button */}
      <button className="px-4 py-1 transition-all duration-300 bg-indigo-500 text-white rounded-full hover:bg-indigo-400">
        Follow
      </button>
    </div>
  );
};

export default UserProfile;
