import React from "react";
import ReactDOM from "react-dom/client";
import PopupApp from "./popup-app";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>
);
