import React, { useState } from "react";
import LoadingIndicator from "../../loading";
import { FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../../redux/UsersSLices/userSlice";
import axios from "axios";
const LoginForm = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
 

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      onClose();
      dispatch(setAuthUser(res.data));
    } catch (error) {
      console.log(error);
    }
    setUser({
      email: "",
      password: "",
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex space-y-6 my-2 items-center justify-center">
      <form onSubmit={onSubmitHandler} className="flex flex-col">
        <div className="relative">
          <MdAlternateEmail className="absolute left-3 top-[59%] transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="input h-14 w-full pl-10 mt-2 p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="my-1 relative">
          <FaLock className="absolute left-3 top-[45%] mb transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="input min-w-96 h-14 w-full pl-10 mt-2 p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="relative inset-y-0 right-[-21rem] top-[-34px] flex items-center pr-3 text-sm font-medium text-blue-400 hover:underline"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "hide" : "show"}
          </button>
          {error && <p className="text-zinc-500 absolute text-sm">{error}</p>}
        </div>

        <button type="submit" className="btn mt-8 btn-primary">
          {loading ? <LoadingIndicator /> : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
