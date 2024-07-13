// src/layouts/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
    <div className="h-[10%]">
      <Navbar/>
    </div>
    <div className="flex flex-1 h-[90%]">
      <div className='h-[90%]'>
      <Sidebar />
      </div>
      <div className="flex-1 p-4 ml-[20%] h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  </div>

  );
};

export default MainLayout;
