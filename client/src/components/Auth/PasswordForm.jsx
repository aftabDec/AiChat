import React, { useState } from "react";

const PasswordForm = ({ onNext }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Added error state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === "") {
      setError("Password is required");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long");
    } else {
      setError("");
      try {
        onNext({ password });
      } catch (error) {
        console.error("Error in onNext: password", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-dark-secondary p-6 w-full max-w-md rounded-3xl shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-6">
          Create a Secure Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="input w-full mt-2 p-3 rounded-2xl focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute mt-7 inset-y-0 right-3 flex items-center text-sm font-medium text-blue-400 hover:underline"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div className="text-gray-400 text-sm">
            <p>Password strength: {password.length < 8 ? "Weak" : "Strong"}</p>
            <ul className="list-disc list-inside mt-2">
              <li>Must contain at least 8 characters</li>
              <li>Must contain at least 1 lowercase character</li>
              <li>Must contain at least 1 special character</li>
            </ul>
          </div>
          <button
            type="submit"
            className="w-full p-3 btn btn-primary text-white rounded-2 transition duration-200"
          >
            Continue
          </button>
          <div className="text-center text-sm text-gray-400">
            <p>
              Forgot password?{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Click here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
