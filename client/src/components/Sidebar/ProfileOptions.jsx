import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthUser } from "../../redux/UsersSLices/userSlice";

const ProfileOptions = ({ onClosed }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearAuthUser());
    onClosed();
  };
  const handleProfileClick = () => {
    navigate("/users/profile");
    onClosed();
  };
  return (
    <ul className="menu transition-all duration-500 ease-in-out bg-base-200 rounded-box w-56">
      <li>
        <button onClick={handleProfileClick}>
          <FaRegUserCircle className="text-xl " />
          Public profile
        </button>
      </li>
      <li>
        <a>
          <IoSettingsOutline className="text-xl " />
          Setting
        </a>
      </li>
      <li>
        <button onClick={handleLogout}>
          <MdLogout className="text-xl " />
          Logout
        </button>
      </li>
    </ul>
  );
};

export default ProfileOptions;
