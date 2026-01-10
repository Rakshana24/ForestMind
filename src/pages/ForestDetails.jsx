import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { CURRENT_FOREST_DETAILS } from '../data/mockData';

const ForestDetails = () => {
    const [alertType, setAlertType] = useState('Human detection');
    const [participants, setParticipants] = useState([
        { id: 1, name: "Ranger Kumar", role: "Field Officer", contact: "+91 98765 43210" },
        { id: 2, name: "DFO Sharma", role: "District Officer", contact: "dfo.nilgiris@forest.gov.in" },
    ]);
    const [newParticipant, setNewParticipant] = useState({ name: '', contact: '' });

    const handleAddParticipant = (e) => {
        e.preventDefault();
        if (!newParticipant.name || !newParticipant.contact) return;
        setParticipants([...participants, {
            id: Date.now(),
            name: newParticipant.name,
            role: "Responder",
            contact: newParticipant.contact
        }]);
        setNewParticipant({ name: '', contact: '' });
    };

    const removeParticipant = (id) => {
        setParticipants(participants.filter(p => p.id !== id));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">
                {/* Header Section */}
                <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-forest-dark mb-2">{CURRENT_FOREST_DETAILS.name}</h1>
                            <p className="text-gray-500 max-w-2xl">{CURRENT_FOREST_DETAILS.description}</p>
                        </div>
                        <div className="text-right bg-gray-50 p-4 rounded-md border border-gray-100">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Coordinates</p>
                            <p className="font-mono text-forest-secondary font-medium">
                                {CURRENT_FOREST_DETAILS.lat.toFixed(4)}° N, {CURRENT_FOREST_DETAILS.lng.toFixed(4)}° E
                            </p>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mt-3 mb-1">District</p>
                            <p className="font-medium text-gray-700">{CURRENT_FOREST_DETAILS.district}</p>
                        </div>
                    </div>
                </section>

                {/* Configuration Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Alert Configuration */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-forest-dark mb-6 border-b pb-2 border-gray-100">
                            Alert Configuration
                        </h2>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Configure Triggers For</label>
                            <select
                                value={alertType}
                                onChange={(e) => setAlertType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-forest-primary focus:border-forest-primary"
                            >
                                <option>Human detection</option>
                                <option>Chainsaw sound</option>
                                <option>Tree cutting</option>
                                <option>Fire / smoke</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-2">
                                * Adjusting sensitivity thresholds for {alertType.toLowerCase()} algorithm.
                            </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                            <h3 className="text-blue-800 font-semibold mb-2 text-sm">Active Rules</h3>
                            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                                <li>Instant notification to all responders.</li>
                                <li>Drone auto-dispatch enabled.</li>
                                <li>Local siren activation: <span className="font-bold">Manual Approval Req.</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Alert Recipients */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-forest-dark mb-6 border-b pb-2 border-gray-100">
                            Response Team
                        </h2>

                        {/* List */}
                        <div className="space-y-4 mb-8">
                            {participants.map(p => (
                                <div key={p.id} className="flex justify-between items-center group p-3 hover:bg-gray-50 rounded-md transition-colors border border-transparent hover:border-gray-100">
                                    <div>
                                        <p className="font-bold text-gray-800">{p.name}</p>
                                        <p className="text-xs text-gray-500">{p.role} • {p.contact}</p>
                                    </div>
                                    <button
                                        onClick={() => removeParticipant(p.id)}
                                        className="text-gray-300 hover:text-red-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add Form */}
                        <form onSubmit={handleAddParticipant} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <h3 className="text-sm font-bold text-gray-700 mb-3">Add New Responder</h3>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={newParticipant.name}
                                    onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-forest-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone or Email"
                                    value={newParticipant.contact}
                                    onChange={(e) => setNewParticipant({ ...newParticipant, contact: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-forest-primary"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-forest-dark text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                                >
                                    Add Participant
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ForestDetails;
