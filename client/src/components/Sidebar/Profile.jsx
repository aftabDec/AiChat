import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { authState } = useAuth();
  // Check if user is authenticated and user object is present
  if (!authState.isAuthenticated || !authState.user) {
    return <div>Couldn't load the data</div>; // Or any fallback UI
  }
  return (
    <div className="btn bg-dark-primary border-none relative min-w-[14rem] min-h-[60px] m-2 btn-md justify-start">
      <div className="avatar placeholder">
        {/* Use user's avatar if available */}
        <div className="bg-purple-600 text-neutral-content w-10 rounded-full">
          <img src={authState?.user?.avatar} alt="" />
         
        </div>
      </div>
      <div className="flex ml-1 flex-col items-center justify-center">
        <h2 className="text-md font-semibold">{authState?.user?.fullName}</h2>
        <p className="text-sm text-gray-500"><span>@</span>{authState?.user?.username}</p>
      </div>
      <IoIosArrowDown className="ml-auto" />
    </div>
  );
};

export default Profile;
