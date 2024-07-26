import React, { useState } from "react";
import LoadingIndicator from "../../loading";
import { FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

const LoginForm = ({ onNext }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.trim() === "" || password.trim() === "") {
        setError("Email and password are required");
      } else {
        setError("");
        onNext();
      }
    }, 500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex space-y-6 my-2 items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="relative">
          <MdAlternateEmail className="absolute left-3 top-[59%] transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input h-14 w-full pl-10 mt-2 p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="my-1 relative">
          <FaLock className="absolute left-3 top-[45%] mb transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input min-w-96 h-14 w-full pl-10 mt-2 p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="relative inset-y-0 right-[-21rem] top-[-34px] flex items-center pr-3 text-sm font-medium text-blue-400 hover:underline"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "hide" : "show"}
          </button>
          {error && <p className="text-red-500 absolute text-sm">{error}</p>}
        </div>

        <button type="submit" className="btn mt-8 btn-primary">
          {loading ? <LoadingIndicator /> : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
