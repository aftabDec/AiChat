import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const ProfileOptions = ({ onClosed }) => {
  const { logout } = useAuth();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        onClosed(); // Close the form on successful logout
      } else {
        setError(response.message || "Logout failed");
      }
    } catch (error) {
      setError("Logout failed. Please try again.");
    }
  };

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
        <button onClick={handleLogout}>
          <MdLogout className="text-xl " />
          Logout
        </button>
      </li>
    </ul>
  );
};

export default ProfileOptions;
