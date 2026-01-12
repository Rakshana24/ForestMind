import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { CURRENT_FOREST_DETAILS } from '../data/mockData';

const ForestDetails = () => {
    // State for Cameras
    const [cameras, setCameras] = useState([
        { id: 1, name: "Cam-01", location: "North Gate Detection Zone" },
        { id: 2, name: "Cam-02", location: "River Path Crossing" },
        { id: 3, name: "Cam-03", location: "Watch Tower Beta" },
    ]);
    const [newCamera, setNewCamera] = useState({ name: '', location: '' });

    // State for Alert Receivers (Participants)
    const [receivers, setReceivers] = useState([
        { id: 1, name: "Ranger Kumar", role: "Field Officer", phone: "+91 98765 43210" },
        { id: 2, name: "DFO Sharma", role: "District Officer", phone: "+91 98989 89898" },
    ]);
    const [newReceiver, setNewReceiver] = useState({ name: '', phone: '', role: 'Responder' });

    // Camera Handlers
    const handleAddCamera = (e) => {
        e.preventDefault();
        if (!newCamera.name || !newCamera.location) return;
        setCameras([...cameras, {
            id: Date.now(),
            name: newCamera.name,
            location: newCamera.location
        }]);
        setNewCamera({ name: '', location: '' });
    };

    const handleDeleteCamera = (id) => {
        setCameras(cameras.filter(c => c.id !== id));
    };

    // Receiver Handlers
    const handleAddReceiver = (e) => {
        e.preventDefault();
        if (!newReceiver.name || !newReceiver.phone || !newReceiver.role) return;
        setReceivers([...receivers, {
            id: Date.now(),
            ...newReceiver
        }]);
        setNewReceiver({ name: '', phone: '', role: 'Responder' });
    };

    const handleDeleteReceiver = (id) => {
        if (window.confirm("Are you sure you want to delete this alert receiver?")) {
            setReceivers(receivers.filter(r => r.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 p-6 lg:p-10 max-w-[1920px] mx-auto w-full space-y-8 flex flex-col">
                {/* Header Section */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-forest-dark mb-2">{CURRENT_FOREST_DETAILS.name}</h1>
                            <p className="text-gray-500 max-w-2xl">{CURRENT_FOREST_DETAILS.description}</p>
                        </div>
                        <div className="text-right bg-gray-50 p-4 rounded-lg border border-gray-100 hidden md:block">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">District</p>
                            <p className="font-medium text-gray-700">{CURRENT_FOREST_DETAILS.district}</p>
                        </div>
                    </div>
                </section>

                {/* Main Content Grid - Cameras & Receivers */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">

                    {/* Camera Management Column */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
                        <h2 className="text-xl font-bold text-forest-dark mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                            <span>Camera Network</span>
                            <span className="bg-forest-secondary/10 text-forest-secondary text-xs px-2 py-1 rounded-full">{cameras.length} Active</span>
                        </h2>

                        {/* Camera List */}
                        <div className="flex-1 overflow-y-auto space-y-3 mb-6 max-h-[500px] pr-2 custom-scrollbar">
                            {cameras.map(cam => (
                                <div key={cam.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition-all">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-forest-primary/10 flex items-center justify-center text-forest-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{cam.name}</p>
                                            <p className="text-xs text-gray-500 font-medium">📍 {cam.location}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteCamera(cam.id)}
                                        className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                                        title="Delete Camera"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {cameras.length === 0 && (
                                <p className="text-center text-gray-400 py-8">No cameras added yet.</p>
                            )}
                        </div>

                        {/* Add Camera Form */}
                        <form onSubmit={handleAddCamera} className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-auto">
                            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Add New Camera</h3>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Camera ID / Name (e.g. Cam-04)"
                                    value={newCamera.name}
                                    onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-forest-primary focus:border-forest-primary outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Location (e.g. Western Ridge)"
                                    value={newCamera.location}
                                    onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-forest-primary focus:border-forest-primary outline-none"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-forest-primary hover:bg-forest-dark text-white font-semibold rounded-md shadow-sm hover:shadow transition-all"
                                >
                                    + Add Camera
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Alert Receivers Column */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
                        <h2 className="text-xl font-bold text-forest-dark mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                            <span>Alert Receivers</span>
                            <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">{receivers.length} People</span>
                        </h2>

                        {/* Receivers List */}
                        <div className="flex-1 overflow-y-auto space-y-3 mb-6 max-h-[500px] pr-2 custom-scrollbar">
                            {receivers.map(receiver => (
                                <div key={receiver.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition-all group">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                            {receiver.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{receiver.name}</p>
                                            <div className="text-xs text-gray-500 flex items-center space-x-2">
                                                <span className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-700">{receiver.role}</span>
                                                <span>•</span>
                                                <span>{receiver.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteReceiver(receiver.id)}
                                        className="text-gray-300 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100"
                                        title="Remove Person"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {receivers.length === 0 && (
                                <p className="text-center text-gray-400 py-8">No receivers added yet.</p>
                            )}
                        </div>

                        {/* Add Receiver Form */}
                        <form onSubmit={handleAddReceiver} className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-auto">
                            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Add New Receiver</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={newReceiver.name}
                                    onChange={(e) => setNewReceiver({ ...newReceiver, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-forest-primary focus:border-forest-primary outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={newReceiver.phone}
                                    onChange={(e) => setNewReceiver({ ...newReceiver, phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-forest-primary focus:border-forest-primary outline-none"
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    value={newReceiver.role}
                                    onChange={(e) => setNewReceiver({ ...newReceiver, role: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-forest-primary focus:border-forest-primary outline-none bg-white"
                                >
                                    <option value="Responder">Responder (Ground Unit)</option>
                                    <option value="Forest Officer">Forest Officer</option>
                                    <option value="Admin">System Admin</option>
                                    <option value="Viewer">Observer</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-forest-dark hover:bg-black text-white font-semibold rounded-md shadow-sm hover:shadow transition-all"
                            >
                                + Add Person
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ForestDetails;
