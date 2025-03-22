// src/pages/TemplateSelection.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import minimalist from "../assets/minimalist.png";
import modern from "../assets/modern.avif";
import classic from "../assets/classic.png";

const templates = [
  { id: 1, name: "Minimalist", image: minimalist },
  { id: 2, name: "Modern", image: modern },
  { id: 3, name: "Classic", image: classic },
];

const TemplateSelection: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSelect = (id: number) => setSelectedTemplate(id);

  const handleNext = () => {
    if (selectedTemplate) {
      navigate(`/form?template=${selectedTemplate}`); // Redirect to form with template ID
    } else {
      alert("Please select a template!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Choose a Resume Template</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border-4 ${
              selectedTemplate === template.id ? "border-blue-500" : "border-gray-300"
            } rounded-lg p-2 cursor-pointer shadow-md hover:shadow-lg`}
            onClick={() => handleSelect(template.id)}
          >
            <img src={template.image} alt={template.name} className="rounded-lg" />
            <p className="text-center font-medium mt-2">{template.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg mt-6 hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};

export default TemplateSelection;
