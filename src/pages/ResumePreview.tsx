// src/pages/ResumePreview.tsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ResumeTemplates from "../components/ResumeTemplates";

// Function to map template IDs to template names
const getTemplateName = (templateId: string) => {
  switch (templateId) {
    case "1": return "Classic";
    case "2": return "Modern";
    case "3": return "Minimalist";
    default: return "Classic";
  }
};

// Function to parse form data and organize it into a structured resume data object
const parseFormData = (rawData: Record<string, string>) => {
  const data: Record<string, any> = {
    contact: {},
    experience: [],
    education: [],
    skills: [],
    certifications: []
  };

  // Extract basic contact info
  Object.entries(rawData).forEach(([key, value]) => {
    // Handle contact fields
    if (key === "name" || key === "email" || key === "phone" || key === "location" || key === "linkedin" || key === "title") {
      data.contact[key] = value;
      data[key] = value; // Also store at top level for easy access
    }
    
    // Handle summary
    else if (key === "summary") {
      data.summary = value;
    }
    
    // Handle array fields like skills
    else if (key.startsWith("skills[")) {
      if (value) data.skills.push(value);
    }
    
    // Handle experience fields
    else if (key.match(/experience\[\d+\]/)) {
      const index = parseInt(key.match(/\[(\d+)\]/)![1]);
      const field = key.split(".")[1] || "description";
      
      if (!data.experience[index]) {
        data.experience[index] = {};
      }
      
      data.experience[index][field] = value;
    }
    
    // Handle education fields
    else if (key.match(/education\[\d+\]/)) {
      const index = parseInt(key.match(/\[(\d+)\]/)![1]);
      const field = key.split(".")[1] || "degree";
      
      if (!data.education[index]) {
        data.education[index] = {};
      }
      
      data.education[index][field] = value;
    }
    
    // Handle certification fields
    else if (key.match(/certifications\[\d+\]/)) {
      const index = parseInt(key.match(/\[(\d+)\]/)![1]);
      const field = key.split(".")[1] || "title";
      
      if (!data.certifications[index]) {
        data.certifications[index] = {};
      }
      
      data.certifications[index][field] = value;
    }
  });

  return data;
};

const ResumePreview: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const templateId = queryParams.get("template") || "1";
  const templateName = getTemplateName(templateId);
  
  // Parse the form data from URL
  const rawFormData = JSON.parse(queryParams.get("data") || "{}");
  const formData = parseFormData(rawFormData);
  
  const [showPdf, setShowPdf] = useState(true);
  
  // Get the correct template component
  const TemplateComponent = ResumeTemplates[templateName as keyof typeof ResumeTemplates];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Resume Preview</h1>
      
      {/* Toggle between preview modes */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setShowPdf(true)}
          className={`px-4 py-2 rounded-lg ${
            showPdf ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          PDF Preview
        </button>
        <button
          onClick={() => setShowPdf(false)}
          className={`px-4 py-2 rounded-lg ${
            !showPdf ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Web Preview
        </button>
      </div>
      
      {/* PDF Preview */}
      {showPdf ? (
        <div className="w-full max-w-4xl h-[800px] bg-white border shadow-lg">
          <PDFViewer width="100%" height="100%" className="border">
            <TemplateComponent data={formData} />
          </PDFViewer>
        </div>
      ) : (
        // Web Preview - A simplified representation using Tailwind
        <div className="w-full max-w-4xl bg-white border shadow-lg p-8">
          {templateName === "Modern" && (
            <div className="bg-blue-900 text-white p-8 text-center">
              <h1 className="text-3xl font-bold text-yellow-300">{formData.name || "YOUR NAME"}</h1>
              <p>{formData.title || "Your Professional Title"}</p>
              <div className="flex justify-center mt-2 text-sm">
                <span className="mx-2">{formData.email || "email@example.com"}</span>
                <span className="mx-2">{formData.phone || "123-456-7890"}</span>
                <span className="mx-2">{formData.location || "City, State"}</span>
              </div>
            </div>
          )}
          
          {(templateName === "Classic" || templateName === "Minimalist") && (
            <div className="mb-6">
              <h1 className={`${templateName === "Classic" ? "text-3xl" : "text-2xl"} font-bold`}>
                {formData.name || "YOUR NAME"}
              </h1>
              <p className="text-gray-600">{formData.title || "Your Professional Title"}</p>
              <div className="flex flex-wrap mt-2 text-sm text-gray-700">
                <span className="mr-4">{formData.email || "email@example.com"}</span>
                <span className="mr-4">{formData.phone || "123-456-7890"}</span>
                <span className="mr-4">{formData.location || "City, State"}</span>
              </div>
            </div>
          )}
          
          {/* Rest of resume sections - simplified for web preview */}
          <div className={`${templateName === "Modern" ? "p-8" : ""}`}>
            {formData.summary && (
              <div className="mb-6">
                <h2 className={`font-bold ${templateName === "Modern" ? "text-blue-900 border-b border-gray-300 pb-1" : ""} uppercase text-lg mb-2`}>
                  Profile
                </h2>
                <p className="text-sm">{formData.summary}</p>
              </div>
            )}
            
            <div className="mb-6">
              <h2 className={`font-bold ${templateName === "Modern" ? "text-blue-900 border-b border-gray-300 pb-1" : ""} uppercase text-lg mb-2`}>
                Experience
              </h2>
              {formData.experience.length > 0 ? (
                formData.experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-3">
                    <div className="font-bold">{exp.jobTitle || "Job Title"}</div>
                    <div className="text-sm">
                      {exp.companyName || "Company"} | {exp.location || "Location"} | 
                      {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                    </div>
                    <p className="text-sm mt-1">{exp.description || "Job description"}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No experience data provided</p>
              )}
            </div>
            
            <div className="mb-6">
              <h2 className={`font-bold ${templateName === "Modern" ? "text-blue-900 border-b border-gray-300 pb-1" : ""} uppercase text-lg mb-2`}>
                Education
              </h2>
              {formData.education.length > 0 ? (
                formData.education.map((edu: any, index: number) => (
                  <div key={index} className="mb-2">
                    <div className="font-bold">{edu.degree || "Degree"}</div>
                    <div className="text-sm">
                      {edu.university || "University"} | {edu.year || "Graduation Year"}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No education data provided</p>
              )}
            </div>
            
            <div className="mb-6">
              <h2 className={`font-bold ${templateName === "Modern" ? "text-blue-900 border-b border-gray-300 pb-1" : ""} uppercase text-lg mb-2`}>
                Skills
              </h2>
              <div className="flex flex-wrap">
                {formData.skills.length > 0 ? (
                  formData.skills.map((skill: string, index: number) => (
                    <span 
                      key={index}
                      className={`${
                        templateName === "Modern" 
                          ? "bg-gray-200 mr-2 mb-2 px-2 py-1 rounded text-xs" 
                          : "mr-4 text-sm"
                      }`}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No skills provided</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Download button */}
      <div className="mt-6">
        <PDFDownloadLink 
          document={<TemplateComponent data={formData} />} 
          fileName={`${formData.name || "resume"}_${templateName}.pdf`}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download Resume")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ResumePreview;