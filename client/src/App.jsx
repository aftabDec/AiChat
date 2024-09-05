import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Sidebar } from "./components"; // Update this line according to your file structure
import UsernameForm from "./components/Auth/UsernameForm";
import Chats from "./components/Chats/AllChatsComo/Chats";
import Contents from "./components/MainContents/Contents";
import UserCharAllComp from "./components/UserProfile/UserCharAllComp";
import AllCompo from "./components/Character-creation/All-compo";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authState } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  return (
    <>
      <Router>
        <div className="flex h-screen text-dark-accent">
          <Sidebar />

          <div className="flex bg-dark-secondary flex-1 flex-col">
            <Routes>
              <Route path="/" element={<Contents />} />
              <Route path="/chats/:id" element={<Chats />} />
              <Route path="/users/profile" element={<UserCharAllComp />} />
              <Route path="/character/new" element={<AllCompo />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
