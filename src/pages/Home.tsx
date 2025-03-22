// src/pages/Home.tsx
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Resume Builder</h1>
      <p className="text-lg text-gray-700 mb-6">
        Create a professional resume with our free templates.
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Start Building Your Resume
      </button>
    </div>
  );
};

export default Home;
