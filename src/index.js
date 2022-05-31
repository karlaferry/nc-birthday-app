import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./Contexts/User";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
