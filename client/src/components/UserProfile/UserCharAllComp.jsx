import React, { useState, useRef, useEffect } from "react";
import UserProfile from "./userDetails/UserProfile";
import UserCharList from "./UserCharacterList/UserCharList";
import ProfileDrawer from "./ProfileDrawer"; // Import the Profile Drawer component
import { FiMoreVertical } from "react-icons/fi"; // Importing 3-dot icon

const UserCharAllComp = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null); // Create a ref for the drawer

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // Close the drawer when clicking outside
  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false); // Close the drawer
    }
  };

  useEffect(() => {
    // Add event listener when the drawer is open
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDrawerOpen]);

  return (
    <div className="relative flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden bg-zinc-900 min-h-screen">
      {/* 3-Dot Menu Icon */}
      <button
        className="absolute top-4 border items-center justify-center flex hover:bg-zinc-700 transition-all ease-in border-zinc-400 rounded-full p-1 h-10 w-10 right-4 text-zinc-300 text-2xl"
        onClick={toggleDrawer}
      >
        <FiMoreVertical  />
      </button>

      {/* User Profile Section */}
      <div className="w-full md:w-3/4 lg:w-1/2 mb-4">
        <UserProfile />
      </div>

      {/* Character List Section */}
      <div className="w-full md:w-3/4 lg:w-1/2 max-h-[60vh] overflow-y-auto">
        <UserCharList />
      </div>

      {/* Right Side Drawer */}
      <ProfileDrawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        drawerRef={drawerRef} // Pass ref to the drawer
      />
    </div>
  );
};

export default UserCharAllComp;
