import React, { useState, useEffect, useRef } from "react";

const FullName = ({ onNext }) => {
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName.trim() === "") {
      setError("fullName is required");
    } else {
      try {
        onNext({ fullName });
      } catch (error) {
        console.error("Error in onNext: fullName", error);
      }
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
              htmlFor="fullName"
              className="block text-sm font-medium text-white"
            >
              FullName
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your fullName"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-3 btn-primary btn rounded-xl text-white transition duration-200"
          >
            Continue
          </button>
          <div className="text-center text-sm text-gray-400">
            <p>
              Forgot fullName?{" "}
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

export default FullName;
