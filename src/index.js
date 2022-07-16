import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./Contexts/User";
import { ScreenSizeProvider } from "./Contexts/ScreenSize";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <UserProvider>
    <ScreenSizeProvider>
      <App />
    </ScreenSizeProvider>
  </UserProvider>
);
