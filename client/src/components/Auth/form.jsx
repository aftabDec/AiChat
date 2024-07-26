import React, { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import PasswordForm from "./PasswordForm";
import LoginForm from "./forms/LoginForm";
const Register = ({ onNext }) => {
  return (
    <>
      {" "}
      <div className=" bg-dark-secondary p-6 w-full max-w-md rounded-3xl shadow-lg">
        <h1 className="text-2xl font-semibold text-white mb-6">fictional.ai</h1>
        <form className="flex flex-col items-center" action="">
          <div className="bg-zinc-800 items-center justify-center flex w-full h-14 rounded-2xl">
            <button onClick={onNext} className="flex ">
              <FaGoogle className="text-3xl mx-1 text-white" />
              <p className="text-white">Sign Up with Google</p>
            </button>
          </div>
          <div className="w-80 h-[1px] my-4 bg-zinc-500"></div>
          <div className="bg-zinc-800 items-center justify-center flex w-full h-14 rounded-2xl">
            <button className="flex ">
              <FaApple className="text-3xl text-white" />
              <p className="text-white mx-1">Sign Up with Apple</p>
            </button>
          </div>
        </form>
        <div className="flex mt-3 items-center justify-center">
          {" "}
          <div className="w-16  flex h-[1px] my-4 bg-zinc-500"></div>
          <p className="mx-3 text-center">or sign up with email</p>
          <div className="w-16  h-[1px] my-4 bg-zinc-500"></div>
        </div>
        <LoginForm />
        <p className="text-center text-sm mt-4">
          by <span className="font-bold">login</span> or{" "}
          <span className="font-bold">registering</span> your'e{" "}
          <span className="font-bold">Applying</span> for the{" "}
          <span className="text-blue-500 font-bold">
            <a href="/">term</a>
          </span>{" "}
          and{" "}
          <span className="font-bold text-blue-500">
            <a href="/">conditions</a>
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
