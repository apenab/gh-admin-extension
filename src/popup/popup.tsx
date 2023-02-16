import React from "react";
import ReactDOM from "react-dom/client";
import PopupApp from "./popup-app";

import "./popup.css";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>
);
