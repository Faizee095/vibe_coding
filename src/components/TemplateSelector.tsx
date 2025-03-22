// src/components/TemplateSelector.tsx
import React from "react";

type TemplateProps = {
  id: number;
  name: string;
  image: string; // URL for template preview image
};

const templates: TemplateProps[] = [
  { id: 1, name: "Classic", image: "/templates/classic.png" },
  { id: 2, name: "Modern", image: "/templates/modern.avif" },
  { id: 3, name: "Minimalist", image: "/templates/minimalist.png" },
];

const TemplateSelector: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{template.name}</h3>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Select Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
