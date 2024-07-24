import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Welcome back aftab</h1>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded bg-dark-primary text-white"
        />
      </div>
    </div>
  );
};

export default Navbar;
