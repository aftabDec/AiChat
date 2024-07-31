import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import store from "../../utils/store";

const Navbar = () => {
  const { authUser } = useSelector((store) => store.user);
  return (
    <div className="navbar w-full mx-3 mt-3 min-w-[90%] max-w-[98%] rounded-lg bg-dark-primary">
      <a className="btn btn-ghost text-xl">
        Welcome back<span>{authUser?.data?.user?.fullName}</span>
      </a>
      <div className="navbar bg-dark-primary">
        <div className="flex-1"></div>
        <div className="flex-none gap-2">
          <div className="form-control form-width">
            <input
              type="text"
              placeholder="Search"
              className="input border-none w-full max-w-xs bg-dark-secondary rounded-full input-bordered"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
