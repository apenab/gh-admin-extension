import React from "react";
import ReactDOM from "react-dom/client";
import OptionsApp from "./options-app";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <OptionsApp />
  </React.StrictMode>
);
