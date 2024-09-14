import React from "react";
import { Link } from "react-router-dom";

const C_footer = () => {
  return (
    <div className="space-y-4 my-6 max-w-[480px] w-full flex flex-col items-center text-center">
      <h1 className="text-2xl font-medium text-white">Create a Character</h1>
      <p className="text-gray-400 text-md">
        Not vibing with any Characters? Create one of your own! Customize their
        voice, conversation starters, tone, and more!
      </p>
      <Link to="/character/new">
        <button className="text-white text-lg py-2 px-4 rounded-full bg-primary hover:bg-primary/90 transition-all">
          Create Character
        </button>
      </Link>
    </div>
  );
};

export default C_footer;
