import React from 'react';
import Navbar from '../components/Navbar';
import MapComponent from '../components/MapComponent';
import AlertPanel from '../components/AlertPanel';

const Home = () => {
    return (
        <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
            <Navbar />

            <main className="flex-1 p-6 flex gap-6 overflow-hidden">
                {/* Left Section - Map (60%) */}
                <section className="flex-[6] h-full relative">
                    <MapComponent />
                    {/* Overlay Overlay Title */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md shadow-sm z-[400] border-l-4 border-forest-primary">
                        <h2 className="text-sm font-bold text-forest-dark">Live Monitoring</h2>
                        <p className="text-xs text-gray-500">Mutumalai Core Zone</p>
                    </div>
                </section>

                {/* Right Section - Alerts (40%) */}
                <section className="flex-[4] h-full">
                    <AlertPanel />
                </section>
            </main>
        </div>
    );
};

export default Home;
