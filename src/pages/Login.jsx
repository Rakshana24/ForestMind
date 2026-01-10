import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DISTRICTS } from '../data/mockData';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        district: DISTRICTS[0],
        areaName: '',
        office: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login logic -> simple navigation
        console.log("Logged in with:", formData);
        navigate('/home');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-forest-dark mb-2">ForestMind</h1>
                    <p className="text-gray-500">AI-Powered Forest Monitoring System</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-forest-dark mb-1">
                            District
                        </label>
                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-primary focus:border-forest-primary outline-none transition-all bg-white"
                        >
                            {DISTRICTS.map((dist) => (
                                <option key={dist} value={dist}>{dist}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-forest-dark mb-1">
                            Forest Area Name
                        </label>
                        <input
                            type="text"
                            name="areaName"
                            value={formData.areaName}
                            onChange={handleChange}
                            placeholder="e.g. Mudumalai Core"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-primary focus:border-forest-primary outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-forest-dark mb-1">
                            Forest Office
                        </label>
                        <input
                            type="text"
                            name="office"
                            value={formData.office}
                            onChange={handleChange}
                            placeholder="e.g. Range Office 1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-primary focus:border-forest-primary outline-none transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-forest-secondary hover:bg-forest-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        Enter Dashboard
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400">
                    Authorized Personnel Only | Secure System
                </div>
            </div>
        </div>
    );
};

export default Login;
