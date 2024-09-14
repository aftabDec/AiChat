import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FiEdit } from "react-icons/fi";

function ProfileDrawer({ isOpen, toggleDrawer, drawerRef }) {
  const { authUser } = useSelector((store) => store.user);

  const [fullName, setFullName] = useState(authUser?.user?.fullName || "");
  const [email, setEmail] = useState(authUser?.user?.email || ""); // State for email
  const [avatar, setAvatar] = useState(authUser?.user?.avatar || null);
  const [avatarPreview, setAvatarPreview] = useState(
    authUser?.user?.avatar || null
  );

  const handleUsernameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update email state
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          "http://localhost:5000/api/v1/users/avatar/new",
          formData,
          config
        );
        console.log(response.data, "response from updated avatar");

        setAvatarPreview(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    }
  };

  const handleSaveDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/auth/update/user",
        { email, fullName },
        config
      );
      console.log(response.data, "response from updated user");
      // Optionally: Refresh user data or show a success message
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("avatar-input").click(); // Trigger file input click
  };

  return (
    <div
      ref={drawerRef}
      className={`fixed top-0 right-0 h-full w-80 bg-zinc-800 p-6 shadow-md transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <h2 className="text-zinc-300 text-lg mb-4">Edit Profile</h2>

      {/* Avatar Section */}
      <div className="flex relative items-center mb-4">
        <div onClick={handleAvatarClick}>
          {" "}
          <img
            src={avatarPreview}
            alt="User Avatar"
            className="w-16 hover:bg-zinc-400  h-16 rounded-full object-cover mr-4 border-2 border-indigo-500 cursor-pointer"
            // Click handler for avatar image
          />
          <button
            onClick={handleAvatarClick}
            className="absolute bottom-0  bg-indigo-600 text-zinc-100 p-2 rounded-full hover:bg-indigo-500"
          >
            <FiEdit className="w-5 h-5" />
          </button>
        </div>

        <input
          type="file"
          id="avatar-input" // ID to trigger click event
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden" // Hide the file input
        />
      </div>

      {/* Username Section */}
      <div className="mb-4">
        <label className="block text-zinc-300 mb-2">Username</label>
        <input
          type="text"
          value={fullName}
          onChange={handleUsernameChange}
          className="w-full p-2 rounded bg-zinc-700 text-zinc-300 border border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Email Section */}
      <div className="mb-4">
        <label className="block text-zinc-300 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-2 rounded bg-zinc-700 text-zinc-300 border border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Save Changes Button */}
      <button
        onClick={handleSaveDetails}
        className="bg-indigo-600 text-zinc-100 p-2 rounded-md w-full hover:bg-indigo-500"
      >
        Save Changes
      </button>
    </div>
  );
}

export default ProfileDrawer;
