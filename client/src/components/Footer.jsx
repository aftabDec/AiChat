import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex my-5 items-center justify-center h-24 bg-dark-secondary">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover text-gray-300 font-medium">About us</a>
          <a className="link link-hover text-gray-300 font-medium">Contact</a>
          <a className="link link-hover text-gray-300 font-medium">Jobs</a>
          <a className="link link-hover text-gray-300 font-medium">Press kit</a>
        </nav>
      </div>
      
    </>
  );
};

export default Footer;
