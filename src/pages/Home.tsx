// src/pages/Home.tsx
import React from "react";
import TemplateSelector from "../components/TemplateSelector";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Resume Builder</h1>
      <TemplateSelector />
    </div>
  );
};

export default Home;
