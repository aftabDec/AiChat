import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const ProfileLogin = () => {
  return (
    <div className="btn bg-indigo-600 text-zinc-300 text-lg min-w-[14rem] min-h-[60px] flex items-center justify-center rounded-md hover:bg-indigo-500">
      Login
      <IoIosArrowDown className="ml-2" />
    </div>
  );
};

export default ProfileLogin;
