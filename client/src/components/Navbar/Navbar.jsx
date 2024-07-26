import React from "react";
import { FaBell, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar mx-3 mt-3 min-w-[90%] max-w-[98%] rounded-lg bg-dark-primary">
      <a className="btn btn-ghost text-xl">Welcome back aftab</a>
      <div className="navbar bg-dark-primary">
        <div className="flex-1"></div>
        <div className="flex-none gap-2">
          <div className="form-control form-width">
            <input
              type="text"
              placeholder="Search"
              className="input  input-bordered"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
