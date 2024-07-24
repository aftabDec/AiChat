import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
const ProfileOptions = () => {
  return (
    <ul className="menu transition-all duration-500 ease-in-out bg-base-200 rounded-box w-56">
      <li>
        <a>
          <FaRegUserCircle className="text-xl " />
          Public profile
        </a>
      </li>
      <li>
        <a>
          <IoSettingsOutline className="text-xl " />
          Setting
        </a>
      </li>
      <li>
        <a>
          <MdLogout className="text-xl " />
          Logout
        </a>
      </li>
    </ul>
  );
};

export default ProfileOptions;
