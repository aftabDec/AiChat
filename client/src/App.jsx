import React, { useState } from "react";
import { Sidebar, Navbar, HeroSection, Contents } from "./components/index";
import UsernameForm from "./components/Auth/UsernameForm";
import PasswordForm from "./components/Auth/PasswordForm";
import Login from "./components/Auth/Login";

function App() {
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <>
      {/* {showUsernameForm && <UsernameForm />} */}
      {showUsernameForm && <Login />}
      {showPasswordForm && <PasswordForm />}
      <div className="flex h-screen text-dark-accent">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <Contents />
        </div>
      </div>
      <div className="fixed bottom-5 right-5 space-y-3">
        <button
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg"
          onClick={() => setShowUsernameForm(!showUsernameForm)}
        >
          {showUsernameForm ? "Close Username Form" : "Open Username Form"}
        </button>
        <button
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg"
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          {showPasswordForm ? "Close Password Form" : "Open Password Form"}
        </button>
      </div>
    </>
  );
}

export default App;
