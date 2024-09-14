import React from "react";

const HeroSection = () => {
  return (
    <div className="flex-1 mt-6 mx-4">
      <div className="hero h-64 rounded-lg bg-dark-primary min-h-80 flex items-center justify-center">
        <div className="hero-content flex-col lg:flex-row items-center text-center lg:text-left">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Hero"
            className="max-w-xs md:max-w-sm rounded-lg shadow-lg object-cover mb-6 lg:mb-0 lg:mr-8"
          />
          <div className="text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold">
              Discover Your Favorite Characters!
            </h1>
            <p className="py-4 text-sm md:text-md">
              Dive into a world of endless possibilities! Chat with unique AI
              characters, explore different personalities, and create your own.
            </p>
            <button className="btn btn-primary px-6 py-2 rounded-full shadow-md transform transition-transform hover:scale-105 hover:bg-blue-600">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
