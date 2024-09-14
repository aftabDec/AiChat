import React from "react";
import {Link} from "react-router-dom";
const Error404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900">
      <div className="text-center bg-zinc-800 p-10 rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <p className="mt-4 text-lg text-indigo-400">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-indigo-500 text-zinc-900 font-medium rounded hover:bg-indigo-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
