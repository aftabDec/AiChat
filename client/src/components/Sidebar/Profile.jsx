import React from "react";
import { IoIosArrowDown } from "react-icons/io";
const Profile = () => {
  return (
    <>
      <div className="btn  mx-12 bg-dark-primary border-none right-8 relative min-w-[14rem] min-h-[60px] mt-10 btn-md justify-start">
        <div className="avatar placeholder">
          <div className="bg-purple-600 text-neutral-content w-10 rounded-full">
            <span>A</span>
          </div>
        </div>
        <div className="mr-16">
          <h2 className="text-lg font-semibold">Aftab</h2>
          <p className="text-sm text-gray-500">@aftab5</p>
        </div>
        <IoIosArrowDown />
      </div>
    </>
  );
};

export default Profile;
