// src/pages/HomePage.js
import React from 'react';

const HomePage = () => {
  const statistics = {
    colleges: 10,
    events: 5,
    visitors: 200,
  };

  return (
    <div className="p-4 h-full">

      
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl">Colleges Attached</h2>
          <p className="text-3xl">{statistics.colleges}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl">Events Posted</h2>
          <p className="text-3xl">{statistics.events}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl">Visitors</h2>
          <p className="text-3xl">{statistics.visitors}</p>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;
