import React from 'react';
import Navbar from '../components/Navbar';
import HistoryTable from '../components/HistoryTable';
import AIChat from '../components/AIChat';

const History = () => {
    return (
        <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
            <Navbar />

            <main className="flex-1 p-6 flex gap-6 overflow-hidden">
                {/* Left Section - History Table (70%) */}
                <section className="flex-[7] h-full overflow-hidden">
                    <HistoryTable />
                </section>

                {/* Right Section - AI Chat (30%) */}
                <section className="flex-[3] h-full overflow-hidden">
                    <AIChat />
                </section>
            </main>
        </div>
    );
};

export default History;
