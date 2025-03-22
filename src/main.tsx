import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TemplateSelection from "./pages/TemplateSelection";
import UserForm from "./pages/UserForm";
import ResumePreview from "./pages/ResumePreview"; // New page

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TemplateSelection />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/preview" element={<ResumePreview />} /> {/* New Route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
