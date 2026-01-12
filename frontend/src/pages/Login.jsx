import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getDistricts, getForests, getOffices } from '../services/api';

const Login = () => {
    const navigate = useNavigate();

    const [districts, setDistricts] = useState([]);
    const [forests, setForests] = useState([]);
    const [offices, setOffices] = useState([]);

    const [formData, setFormData] = useState({
        district: "",
        forest: "",
        office: "",
        password: ""
    });

    // Load districts
    useEffect(() => {
        async function loadDistricts() {
            const data = await getDistricts();
            setDistricts(data);
        }
        loadDistricts();
    }, []);

    // Handle district change
    const handleDistrictChange = async (e) => {
        const district = e.target.value;
        setFormData({ ...formData, district });

        const fs = await getForests(district);
        setForests(fs);
        setOffices([]);
    };

    // Handle forest change
    const handleForestChange = async (e) => {
        const forest = e.target.value;
        setFormData({ ...formData, forest });

        const offs = await getOffices(forest);
        setOffices(offs);
    };

    // Submit login
    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await login(formData);

        if (response.token) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("officeName", formData.officeName);  
            alert("Login Successful!");
            navigate('/home');
        } else {
            alert(response.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-forest-dark mb-2">ForestMind</h1>
                    <p className="text-gray-500">AI-Powered Forest Monitoring System</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">

                    {/* District */}
                    <div>
                        <label className="block text-sm font-medium text-forest-dark mb-1">
                            District
                        </label>
                        <select
                            value={formData.district}
                            onChange={handleDistrictChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="">Select District</option>
                            {districts.map((d) => (
                                <option key={d._id} value={d.districtName}>{d.districtName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Forest */}
                    <div>
                        <label className="block text-sm font-medium text-forest-dark mb-1">
                            Forest Name
                        </label>
                        <select
                            value={formData.forest}
                            onChange={handleForestChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="">Select Forest</option>
                            {forests.map((f) => (
                                <option key={f._id} value={f.forestName}>{f.forestName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Office */}
                    <div>
                        <label className="block text-sm font-medium text-forest-dark mb-1">
                            Forest Office Name
                        </label>
                        <select
                            value={formData.office}
                            onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="">Select Office</option>
                            {offices.map((o) => (
                                <option key={o._id} value={o.officeName}>{o.officeName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-forest-dark mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-forest-secondary hover:bg-forest-dark text-white font-semibold rounded-lg shadow-md"
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
