import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Context from "./Componenet/Context.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
    <ToastContainer  autoClose={3000}  closeOnClick  />
      <App />
    </Context>
  </StrictMode>
);
