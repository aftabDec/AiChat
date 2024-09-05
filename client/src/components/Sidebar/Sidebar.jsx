import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaRegCompass, FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import RecentChat from "./RecentChat";
import Profile from "./Profile";
import ProfileOptions from "./ProfileOptions";
import { Link, useNavigate } from "react-router-dom";
import ProfileLogin from "./ProfileLogin";
import Login from "../Auth/Login"; // Import Login component
import Register from "../Auth/form";

import api from "../../utils/axiosSetup";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [showProfileGroup, setShowProfileGroup] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const closeOptionsRef = useRef();
  const navigate = useNavigate();
  // const fetchData = async () => {
  //   try {
  //     const response = await api.get("/protected-endpoint");
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data",);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
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
        <div>
          <Login onClose={showFormHandle} />
        </div>
      )}
      <div className="w-64 items-center bg-dark-primary p-4 flex flex-col">
        <div className="flex items-center flex-col mb-5 w-full bg-dark-primary text-white">
          <Link to="/">
            <h1 className="font-semibold cursor-pointer text-2xl m-8">
              fictional.ai
            </h1>
          </Link>

          <div className="right-8 flex flex-col gap-3 relative">
            <Link
              to="/character/new"
              className="btn md:text-md md:max-w-48 btn-md justify-start text-lg btn-active hover:bg-dark-secondary mx-12 rounded-full"
            >
              <FiPlus className="text-2xl text-gray-300" />
              Create
            </Link>
            <button className="btn md:text-md md:max-w-48 justify-start w-52 ml-12">
              <FaRegCompass className="text-2xl text-gray-300" />
              Discover
            </button>
            <p className="relative h-0 left-12">Chats</p>
          </div>

          <div className="flex h-72 flex-col items-center bg-dark-primary">
            <RecentChat />
          </div>
        </div>
        <div
          ref={closeOptionsRef}
          className={`transition-all absolute mx-4 z-10 bottom-28 duration-300 ease-in-out ${
            showProfileGroup ? "opacity-100" : "invisible opacity-0"
          } overflow-hidden`}
        >
          <ProfileOptions onClosed={() => setShowProfileGroup(false)} />
        </div>
        <div className="fixed block bottom-0 mb-8">
          {authUser ? (
            <button type="button" onClick={profileHandle}>
              <Profile /> {/* Display ProfileLogin if authenticated */}
            </button>
          ) : (
            <button type="button" onClick={showFormHandle}>
              <ProfileLogin /> {/* Display Profile if not authenticated */}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
