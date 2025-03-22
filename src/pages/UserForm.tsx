import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import templateSchema from "../data/templates.json"; // Import JSON schema

type TemplateType = "Classic" | "Minimalist" | "Modern"; // Define valid template keys

// Map numbers to corresponding template names
const templateMapping: Record<number, TemplateType> = {
  1: "Classic",
  2: "Minimalist",
  3: "Modern",
};

const UserForm: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const templateParam = queryParams.get("template") || "1"; // Default to "1" if missing

  // Convert number string to corresponding template name
  const selectedTemplate = templateMapping[parseInt(templateParam)] || "Classic";

  // Fetch the selected template schema from JSON
  const selectedTemplateSchema = templateSchema.templates[selectedTemplate];

  // Handle case when the template is not found
  if (!selectedTemplateSchema) {
    console.error(`Template '${selectedTemplate}' not found in templateSchema.`);
    return <div>Error: Template '{selectedTemplate}' not found. Please select a valid template.</div>;
  }

  const formFields = selectedTemplateSchema.fields;

  // Initialize form data structure
  const initialFormData: Record<string, string> = {};
  Object.keys(formFields).forEach((section) => {
    const sectionFields = formFields[section as keyof typeof formFields];
    if (Array.isArray(sectionFields)) {
      sectionFields.forEach((_, index) => {
        initialFormData[`${section}[${index}]`] = ""; // for array fields
      });
    } else {
      Object.keys(sectionFields).forEach((fieldName) => {
        initialFormData[fieldName] = ""; // for object fields like 'contact'
      });
    }
  });

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataJSON = JSON.stringify(formData);
    navigate(`/preview?template=${templateParam}&data=${encodeURIComponent(formDataJSON)}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>

        {Object.entries(formFields).map(([section, sectionFields]) => (
          <div key={section}>
            <h3 className="text-lg font-bold mb-4">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
            {Array.isArray(sectionFields)
              ? sectionFields.map((_, index) => (
                  <div key={`${section}[${index}]`} className="mb-4">
                    <label htmlFor={`${section}[${index}]`} className="block font-medium mb-1">
                      {`${section} #${index + 1}`}
                    </label>
                    <input
                      type="text"
                      name={`${section}[${index}]`}
                      id={`${section}[${index}]`}
                      value={formData[`${section}[${index}]`]}
                      onChange={handleChange}
                      className="border w-full p-2 rounded-md"
                      placeholder={`Enter ${section} detail...`}
                    />
                  </div>
                ))
              : Object.entries(sectionFields).map(([fieldName, label]) => (
                  <div key={fieldName} className="mb-4">
                    <label htmlFor={fieldName} className="block font-medium mb-1">
                      {label as string}
                    </label>
                    <input
                      type="text"
                      name={fieldName}
                      id={fieldName}
                      value={formData[fieldName]}
                      onChange={handleChange}
                      className="border w-full p-2 rounded-md"
                      placeholder={`Enter ${label as string}`}
                    />
                  </div>
                ))}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg mt-4 hover:bg-blue-700"
        >
          Submit & Preview Resume
        </button>
      </form>
    </div>
  );
};

export default UserForm;
