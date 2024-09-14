import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthUser } from "../../redux/UsersSLices/userSlice";

const ProfileOptions = ({ onClosed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuthUser());
    navigate("/");
    onClosed();
  };

  const handleProfileClick = () => {
    navigate("/users/profile");
    onClosed();
  };

  return (
    <ul className="menu bg-zinc-700 rounded-lg w-56 text-zinc-300">
      <li>
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2 p-2 hover:bg-zinc-600 rounded-md"
        >
          <FaRegUserCircle className="text-xl" />
          Public profile
        </button>
      </li>
      <li>
        <a className="flex items-center gap-2 p-2 hover:bg-zinc-600 rounded-md">
          <IoSettingsOutline className="text-xl" />
          Settings
        </a>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 hover:bg-zinc-600 rounded-md"
        >
          <MdLogout className="text-xl" />
          Logout
        </button>
      </li>
    </ul>
  );
};

export default ProfileOptions;
