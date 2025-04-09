import React from "react";
import ReactDOM from "react-dom/client"; // Importa createRoot desde react-dom/client
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

// Busca el div con id="root" y crea el root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);