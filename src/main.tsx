import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "@/theme/global.css";
import "@/theme/tailwind.css";
import "@/theme/variables.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
