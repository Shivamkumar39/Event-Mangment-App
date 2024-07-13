// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, AcademicCapIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
    return (

        <div className="fixed top-[10%] left-0 w-[20%] h-[90%] bg-gray-50 text-black shadow-xl border-4">
            <div>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <nav className="mt-10">
                <Link to="/" className="block py-2.5 px-4 hover:bg-gray-700 flex items-center">
                    <HomeIcon className="h-4 w-4 mr-2" /> Home
                </Link>
                <Link to="/colleges" className="block py-2.5 px-4 hover:bg-gray-700 flex items-center">
                    <AcademicCapIcon className="h-4 w-4 mr-2" /> Colleges
                </Link>
                <Link to="/events" className="block py-2.5 px-4 hover:bg-gray-700 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" /> Events
                </Link>
                <Link to="/profile" className="block py-2.5 px-4 hover:bg-gray-700 flex items-center">
                    <UserIcon className="h-5 w-5 mr-2" /> Profile
                </Link>
                {/* Add more links as needed */}
            </nav>
            </div>
            
        </div>

    );
};

export default Sidebar;
