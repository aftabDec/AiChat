import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { authUser } = useSelector((store) => store.user);

  return (
    <div className="navbar w-full mx-3 mt-3 min-w-[90%] max-w-[98%] rounded-lg bg-dark-primary px-6 py-3 flex justify-between items-center">
      <a className="text-xl font-bold text-white">
        Welcome back, <span>{authUser?.data?.user?.fullName}</span>
      </a>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="input border-none w-full max-w-xs bg-dark-secondary rounded-full input-bordered"
          />
        </div>
        <FaBell className="text-white text-xl cursor-pointer" />
        <FaUser className="text-white text-xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
