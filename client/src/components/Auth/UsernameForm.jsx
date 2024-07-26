import React, { useState, useEffect, useRef } from "react";

const UsernameForm = ({ onNext }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setError("Username is required");
    } else {
      onNext();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setError("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={formRef}
        className="bg-dark-secondary p-6 w-full max-w-md rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold text-center text-white mb-6">
          Enter Your Username
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary p-3 text-white rounded-2xl  transition duration-200"
          >
            Continue
          </button>
          <div className="text-center text-sm text-gray-400">
            <p>
              Forgot username?{" "}
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

export default UsernameForm;
