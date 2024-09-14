import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full bg-dark-secondary py-6 px-4 text-gray-300">
      <nav className="grid grid-flow-col gap-6 mb-4 text-center md:flex md:gap-8">
        <a
          href="#"
          className="hover:text-white transition duration-300 font-medium"
        >
          About Us
        </a>
        <a
          href="#"
          className="hover:text-white transition duration-300 font-medium"
        >
          Contact
        </a>
        <a
          href="#"
          className="hover:text-white transition duration-300 font-medium"
        >
          Jobs
        </a>
        <a
          href="#"
          className="hover:text-white transition duration-300 font-medium"
        >
          Press Kit
        </a>
      </nav>
      <div className="text-sm text-gray-500">
        © 2024 Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
