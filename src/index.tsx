import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Importa gli stili (qui stanno anche le animazioni!)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
