import React, { useState } from 'react';
import templates from './data/templates.json'; // Importing templates JSON

type TemplateKeys = keyof typeof templates['templates'];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKeys>('Classic');
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  // Dynamically initialize form data based on the selected template
  const initializeFormData = (template: TemplateKeys) => {
    const fields: { [key: string]: any } = templates.templates[template].fields;
    const initialData: any = {};

    Object.keys(fields).forEach((field) => {
      initialData[field] = Array.isArray(fields[field]) ? [] : '';
    });

    return initialData;
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTemplate = e.target.value as TemplateKeys;
    setSelectedTemplate(newTemplate);
    setFormData(initializeFormData(newTemplate)); // Reset form fields dynamically
  };

  const handleChange = (field: string, value: string, index?: number) => {
    setFormData((prevData: any) => {
      const updatedData = { ...prevData };
      if (index !== undefined) {
        updatedData[field][index] = value;
      } else {
        updatedData[field] = value;
      }
      return updatedData;
    });
  };

  const renderFormFields = () => {
    const fields = templates.templates[selectedTemplate].fields;

    return Object.entries(fields).map(([field, fieldType]) => {
      if (Array.isArray(fieldType)) {
        // Handle array fields (like Skills or Work Experience)
        return (
          <div key={field}>
            <h3>{field}</h3>
            {formData[field]?.map((_: any, index: number) => (
              <input
                key={`${field}-${index}`}
                type="text"
                placeholder={`${field} ${index + 1}`}
                value={formData[field][index] || ''}
                onChange={(e) => handleChange(field, e.target.value, index)}
                className="border p-2 mb-2 block w-full"
              />
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData((prevData: any) => ({
                  ...prevData,
                  [field]: [...prevData[field], ''],
                }));
              }}
              className="bg-blue-500 text-white p-2"
            >
              Add {field}
            </button>
          </div>
        );
      } else {
        // Handle standard text fields
        return (
          <div key={field}>
            <label>{field}</label>
            <input
              type="text"
              placeholder={`Enter ${field}`}
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              className="border p-2 mb-2 block w-full"
            />
          </div>
        );
      }
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dynamic Resume Builder</h1>

      <select
        value={selectedTemplate}
        onChange={handleTemplateChange}
        className="border p-2 mb-4"
      >
        {Object.keys(templates.templates).map((template) => (
          <option key={template} value={template}>
            {template}
          </option>
        ))}
      </select>

      <div className="border p-4">
        <h2 className="text-2xl mb-4">{selectedTemplate} Template Form</h2>
        {renderFormFields()}
      </div>

      <pre className="mt-4 bg-gray-100 p-4">{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}

export default App;
