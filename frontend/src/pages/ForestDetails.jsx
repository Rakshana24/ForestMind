import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { CURRENT_FOREST_DETAILS } from '../data/mockData';

const ForestDetails = () => {

    // Cameras from backend
    const [cameras, setCameras] = useState([]);
    const [newCamera, setNewCamera] = useState({ name: '', location: '' });

    // Alert Receivers from backend
    const [receivers, setReceivers] = useState([]);
    const [newReceiver, setNewReceiver] = useState({ name: '', phone: '', role: 'Responder' });
    useEffect(() => {
  const office = localStorage.getItem("officeName");

  async function loadReceivers() {
    const response = await fetch(
      `http://localhost:5000/alert-receivers/${office}`
    );
    const data = await response.json();
    setReceivers(data);
  }

  loadReceivers();
}, []);

    // Fetch data on page load
  useEffect(() => {
  fetchCameras();
}, []);

    // ============================
    // FETCH CAMERAS
    // ============================
    const fetchCameras = async () => {
        try {
            const res = await fetch("http://localhost:5000/cameras");
            const data = await res.json();
            setCameras(data);
        } catch (err) {
            console.error("Error loading cameras", err);
        }
    };

    // ============================
    // ADD CAMERA
    // ============================
    const handleAddCamera = async (e) => {
        e.preventDefault();
        if (!newCamera.name || !newCamera.location) return;

        await fetch("http://localhost:5000/cameras/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cameraId: newCamera.name,
                location: newCamera.location
            })
        });

        setNewCamera({ name: "", location: "" });
        fetchCameras();
    };

    // ============================
    // DELETE CAMERA
    // ============================
    const handleDeleteCamera = async (id) => {
        await fetch(`http://localhost:5000/cameras/${id}`, {
            method: "DELETE"
        });

        fetchCameras();
    };

    // ============================
    // FETCH RECEIVERS
    // ============================
const fetchReceivers = async () => {
    try {
        const office = localStorage.getItem("officeName");

        const res = await fetch(`http://localhost:5000/alert-receivers/${office}`);
        const data = await res.json();

        setReceivers(
    data.map(r => ({
        id: r._id,
        officerName: r.officerName,
        phoneNumber: r.phoneNumber,
        role: r.role
    }))
);

        console.log("MAPPED RECEIVERS:", data.map(r => ({
    id: r._id,
    name: r.officerName,
    phone: r.phoneNumber,
    role: r.role
})));
    } catch (err) {
        console.error("Failed to load receivers", err);
    }
};


    // ============================
    // ADD RECEIVER
    // ============================
   const handleAddReceiver = async (e) => {
    e.preventDefault();

    const office = localStorage.getItem("officeName");

const res = await fetch(`http://localhost:5000/alert-receivers/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        officerName: newReceiver.name,
        phoneNumber: newReceiver.phone,
        role: newReceiver.role,
        office: office     // << SEND OFFICE HERE
    })
});


    const data = await res.json();
    fetchReceivers();
};

    // ============================
    // DELETE RECEIVER
    // ============================
    const handleDeleteReceiver = async (id) => {
        if (!window.confirm("Are you sure you want to delete this alert receiver?")) return;

        await fetch(`http://localhost:5000/alert-receivers/${id}`, {
            method: "DELETE"
        });

        fetchReceivers();
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 p-6 lg:p-10 max-w-[1920px] mx-auto w-full space-y-8 flex flex-col">
                
                {/* Header Section */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-forest-dark mb-2">
                                {CURRENT_FOREST_DETAILS.name}
                            </h1>
                            <p className="text-gray-500 max-w-2xl">
                                {CURRENT_FOREST_DETAILS.description}
                            </p>
                        </div>
                        <div className="text-right bg-gray-50 p-4 rounded-lg border border-gray-100 hidden md:block">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">District</p>
                            <p className="font-medium text-gray-700">{CURRENT_FOREST_DETAILS.district}</p>
                        </div>
                    </div>
                </section>

                {/* Grid Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">

                    {/* Cameras Section */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
                        <h2 className="text-xl font-bold text-forest-dark mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                            <span>Camera Network</span>
                            <span className="bg-forest-secondary/10 text-forest-secondary text-xs px-2 py-1 rounded-full">
                                {cameras.length} Active
                            </span>
                        </h2>

                        <div className="flex-1 overflow-y-auto space-y-3 mb-6 max-h-[500px] pr-2 custom-scrollbar">
                            {cameras.map(cam => (
                                <div key={cam._id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition-all">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-forest-primary/10 flex items-center justify-center text-forest-primary">
                                            📷
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{cam.cameraId}</p>
                                            <p className="text-xs text-gray-500 font-medium">📍 {cam.location}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteCamera(cam._id)}
                                        className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                                        title="Delete Camera"
                                    >
                                        🗑
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
                                    placeholder="Camera ID / Name"
                                    value={newCamera.name}
                                    onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={newCamera.location}
                                    onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-forest-primary text-white font-semibold rounded-md"
                                >
                                    + Add Camera
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Alert Receivers */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
                        <h2 className="text-xl font-bold text-forest-dark mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                            <span>Alert Receivers</span>
                            <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
                                {receivers.length} People
                            </span>
                        </h2>

                        <div className="flex-1 overflow-y-auto space-y-3 mb-6 max-h-[500px] pr-2 custom-scrollbar">
    {receivers.map(receiver => (
    <div key={receiver.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition-all">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {receiver.officerName?.charAt(0)}
            </div>
            <div>
                <p className="font-bold text-gray-800">{receiver.officerName}</p>
                <p className="text-xs text-gray-500">
                    {receiver.role} • {receiver.phoneNumber}
                </p>
            </div>
        </div>

        <button
            onClick={() => handleDeleteReceiver(receiver.id)}
            className="text-gray-300 hover:text-red-500 p-2 transition-colors"
            title="Remove Person"
        >
            🗑
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={newReceiver.phone}
                                    onChange={(e) => setNewReceiver({ ...newReceiver, phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>

                            <select
                                value={newReceiver.role}
                                onChange={(e) => setNewReceiver({ ...newReceiver, role: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm mb-3 bg-white"
                            >
                                <option value="Responder">Responder</option>
                                <option value="Forest Officer">Forest Officer</option>
                                <option value="Admin">Admin</option>
                                <option value="Viewer">Viewer</option>
                            </select>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-forest-dark text-white font-semibold rounded-md"
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
