// src/pages/ResumePreview.tsx
import React from "react";
import { useLocation } from "react-router-dom";

const ResumePreview: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedTemplate = queryParams.get("template");

  // Hardcoded form data for now (in a real app, you'd pass this via state or context)
  const formData = JSON.parse(queryParams.get("data") || "{}");

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "1": // Minimalist Template
        return (
          <div className="bg-white shadow-lg p-8 rounded-lg w-full">
            <h1 className="text-4xl font-bold">{formData.name}</h1>
            <p className="text-gray-700">{formData.email} | {formData.phone}</p>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Skills</h2>
              <p>{formData.skills}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Work Experience</h2>
              <p>{formData.experience}</p>
            </div>
          </div>
        );
      case "2": // Modern Template
        return (
          <div className="bg-gray-800 text-white p-8 rounded-lg w-full">
            <h1 className="text-4xl font-bold">{formData.name}</h1>
            <p className="text-gray-400">{formData.email} | {formData.phone}</p>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Skills</h2>
              <p>{formData.skills}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Work Experience</h2>
              <p>{formData.experience}</p>
            </div>
          </div>
        );
      case "3": // Classic Template
        return (
          <div className="bg-blue-100 shadow-md p-8 rounded-lg w-full">
            <h1 className="text-4xl font-serif">{formData.name}</h1>
            <p className="text-blue-700">{formData.email} | {formData.phone}</p>
            <div className="mt-4">
              <h2 className="text-xl font-medium">Skills</h2>
              <p>{formData.skills}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-medium">Work Experience</h2>
              <p>{formData.experience}</p>
            </div>
          </div>
        );
      default:
        return <p>Please select a valid template.</p>;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Resume Preview</h1>
        {renderTemplate()}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => window.print()} // Print/download functionality
            className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
