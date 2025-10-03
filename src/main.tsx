import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Optional slug; when omitted we use sources.json */}
        <Route path="/:slug?" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
