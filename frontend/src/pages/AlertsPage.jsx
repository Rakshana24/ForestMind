import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const AlertsPage = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const office = localStorage.getItem("officeName");
                // Fetch alerts (assuming existing endpoint supports filtering or returns all)
                // If the backend filters by office in query, we use that. 
                // Using existing getAlerts endpoint structure.
                // Fetch all alerts for now to ensure visibility
                const res = await fetch(`http://localhost:5000/alerts`);
                const data = await res.json();
                console.log("Fetched Alerts:", data); // Debug log
                setAlerts(data);
            } catch (err) {
                console.error("Failed to load alerts", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
        
        // Optional: Set up polling or socket listener here if real-time is needed immediately
        // For now, fetching on load as per standard React pattern
        const interval = setInterval(fetchAlerts, 5000); // Poll every 5 seconds for new alerts
        return () => clearInterval(interval);

    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 p-6 lg:p-10 max-w-[1920px] mx-auto w-full">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-red-600 mb-2 flex items-center gap-2">
                            ⚠️ Live Alert Feed
                        </h1>
                        <p className="text-gray-500">Real-time detection of forest threats</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm font-medium">
                        Live Monitoring Active
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alerts.length === 0 ? (
                            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-400 text-lg">No active alerts detected.</p>
                                <p className="text-gray-300 text-sm">System is monitoring...</p>
                            </div>
                        ) : (
                            alerts.map((alert) => (
                                <div key={alert._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-48 bg-gray-100 relative">
                                        {alert.imageUrl ? (
                                            <img 
                                                src={alert.imageUrl} 
                                                alt="Alert Detection" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                                <span>No Image Captured</span>
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            {alert.alertType || "Unknown Threat"}
                                        </div>
                                    </div>
                                    
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-lg mb-1">
                                                    {alert.message || "Suspicious Activity Detected"}
                                                </h3>
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    📷 Camera: {alert.cameraId || "Unknown"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-sm">
                                            <span className="text-gray-400">
                                                {new Date(alert.timestamp).toLocaleString()}
                                            </span>
                                            <button className="text-blue-600 font-medium hover:text-blue-700">
                                                View Details →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AlertsPage;
