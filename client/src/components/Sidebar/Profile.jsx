import React from "react";
import { IoIosArrowDown } from "react-icons/io";

import { useSelector } from "react-redux";

const Profile = () => {
  const { authUser } = useSelector((store) => store.user);
  // Check if user is authenticated and user object is present

  return (
    <div className="btn bg-dark-primary border-none relative min-w-[14rem] min-h-[60px] m-2 btn-md justify-start">
      <div className="avatar placeholder">
        {/* Use user's avatar if available */}
        <div className="bg-purple-600 text-neutral-content w-10 rounded-full">
          <img src={authUser?.data?.user?.avatar} alt="" />
        </div>
      </div>
      <div className="flex ml-1 flex-col items-center justify-center">
        <h2 className="text-md font-semibold">
          {authUser?.data?.user?.fullName}
        </h2>
        <p className="text-sm text-gray-500">
          <span>@</span>
          {authUser?.data?.user?.username}
        </p>
      </div>
      <IoIosArrowDown className="ml-auto" />
    </div>
  );
};

export default Profile;
