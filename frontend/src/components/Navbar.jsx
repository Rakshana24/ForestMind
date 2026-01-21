import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session if any
        navigate('/');
    };

    const linkClass = ({ isActive }) =>
        `px-4 py-2 rounded-md transition-colors duration-200 ${isActive
            ? 'bg-forest-secondary text-white font-medium shadow-sm'
            : 'text-gray-100 hover:bg-forest-secondary/50 hover:text-white'
        }`;

    return (
        <nav className="bg-forest-primary shadow-md h-16 flex items-center justify-between px-6 z-50 relative">
            <div className="flex items-center space-x-3">
                {/* Logo */}
                <img src="/logofm.png" alt="ForestMind Logo" className="w-10 h-10 object-contain rounded-full bg-white" />
                <span className="text-white text-xl font-semibold tracking-wide">ForestMind</span>
            </div>

            <div className="flex items-center space-x-2">
                <NavLink to="/home" className={linkClass}>
                    Home
                </NavLink>
                <NavLink to="/details" className={linkClass}>
                    Forest Details
                </NavLink>
                <NavLink to="/alerts" className={linkClass}>
                    Alerts
                </NavLink>
                <NavLink to="/history" className={linkClass}>
                    History
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 text-red-100 hover:text-red-800 hover:bg-red-100/20 rounded-md transition-colors"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
