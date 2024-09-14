import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

const Profile = () => {
  const { authUser } = useSelector((store) => store.user);

  return (
    <div className="relative flex items-center p-2 bg-dark-secondary text-zinc-300 rounded-lg hover:bg-dark-accent cursor-pointer lg:w-56 md:w-56 sm:56 max-w-xs w-56">
      <div className="avatar w-12 h-12 rounded-full overflow-hidden mr-3">
        <img
          src={authUser?.user?.avatar || "/default-avatar.png"} // Fallback if avatar URL is not available
          alt="User avatar"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col truncate">
        <span className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg text-zinc-300 font-semibold truncate">
          {authUser?.user?.fullName || "Username"}
        </span>
        <span className="text-sm text-zinc-400 truncate">
          @{authUser?.user?.username || "username"}
        </span>
      </div>
      <IoIosArrowDown className="ml-auto text-lg" />
    </div>
  );
};

export default Profile;
