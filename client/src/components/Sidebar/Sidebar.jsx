import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaRegCompass, FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import RecentChat from "./RecentChat";
import Profile from "./Profile";
import ProfileOptions from "./ProfileOptions";
import { Link, useNavigate } from "react-router-dom";
import ProfileLogin from "./ProfileLogin";
import Login from "../Auth/Login";
import api from "../../utils/axiosSetup";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [showProfileGroup, setShowProfileGroup] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const closeOptionsRef = useRef();
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.user);

  const profileHandle = () => {
    setShowProfileGroup((prev) => !prev);
  };

  const showFormHandle = () => {
    setShowForm((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      closeOptionsRef.current &&
      !closeOptionsRef.current.contains(event.target)
    ) {
      setShowProfileGroup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <Login onClose={showFormHandle} />
        </div>
      )}
      <div className="w-64 bg-dark-primary text-white p-4 flex flex-col space-y-6">
        <Link to="/" className="text-2xl font-semibold mb-8">
          fictional.ai
        </Link>
        <div className="flex flex-col space-y-4">
          <Link
            to="/character/new"
            className="btn w-44 btn-md text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 text-zinc-300"
          >
            <FiPlus className="text-2xl" />
            Create
          </Link>
          <button className="btn btn-md text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 text-zinc-300">
            <FaRegCompass className="text-2xl" />
            Discover
          </button>
          <p className="text-zinc-300">Chats</p>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <RecentChat />
        </div>
        <div
          ref={closeOptionsRef}
          className={`absolute bottom-24 transition-opacity duration-300 ${
            showProfileGroup ? "opacity-100" : "opacity-0 invisible"
          }`}
        >
          <ProfileOptions onClosed={() => setShowProfileGroup(false)} />
        </div>
        <div className="fixed bottom-8 ">
          {authUser ? (
            <button type="button" onClick={profileHandle}>
              <Profile />
            </button>
          ) : (
            <button type="button" onClick={showFormHandle}>
              <ProfileLogin />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
