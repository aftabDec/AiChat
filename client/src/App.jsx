import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Sidebar } from "./components"; // Update this line according to your file structure
import UsernameForm from "./components/Auth/UsernameForm";
import Chats from "./components/Chats/AllChatsComo/Chats";
import Contents from "./components/MainContents/Contents";
import UserCharAllComp from "./components/UserProfile/UserCharAllComp";
import AllCompo from "./components/Character-creation/All-compo";
import Error404 from "./pages/error404";

// Protected Route Component for Route Guarding
const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth();
  return authState.isAuthenticated ? children : <Navigate to="/login" />;
};

// Main Layout Component with Sidebar
const MainLayout = ({ children }) => (
  <div className="flex  lg:flex-row md:flex-row sm:flex-row flex-row h-screen text-dark-accent">
    <Sidebar />
    <div className="flex-1 flex flex-col bg-dark-secondary overflow-auto p-4 lg:p-8">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Sidebar */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Contents />
            </MainLayout>
          }
        />
        <Route
          path="/chats/:id"
          element={
            <MainLayout>
              <Chats />
            </MainLayout>
          }
        />
        <Route
          path="/users/profile"
          element={
            <MainLayout>
              <UserCharAllComp />
            </MainLayout>
          }
        />
        <Route
          path="/character/new"
          element={
            <MainLayout>
              <AllCompo />
            </MainLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <MainLayout>{/* Protected Component */}</MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 Error Page Route without Sidebar */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
