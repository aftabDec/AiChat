import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { CharacterProvider } from "./context/ContextProvider.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </AuthProvider>
);
