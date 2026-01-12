import React, { useState } from 'react';
import { HISTORY_LOGS } from '../data/mockData';

const HistoryTable = () => {
    const [filterType, setFilterType] = useState('All');
    const [dateRange, setDateRange] = useState('');

    const filteredLogs = HISTORY_LOGS.filter(log => {
        return filterType === 'All' || log.type === filterType;
    });

    return (
        <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header / Filters */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
                <h2 className="font-bold text-forest-dark">Alert History</h2>
                <div className="flex space-x-2">
                    <select
                        title="Filter by Type"
                        className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">All Types</option>
                        <option value="Intrusion">Intrusion</option>
                        <option value="Fire">Fire</option>
                        <option value="Chainsaw">Chainsaw</option>
                        <option value="Movement">Movement</option>
                    </select>
                    <input
                        type="date"
                        title="Filter by Date"
                        className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                        onChange={(e) => setDateRange(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-auto flex-1">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600 font-semibold sticky top-0">
                        <tr>
                            <th className="p-3">Date & Time</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Alert Type</th>
                            <th className="p-3">Severity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredLogs.map(log => (
                            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-3 text-gray-600">{log.date}</td>
                                <td className="p-3 font-medium text-gray-800">{log.location}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${log.type === 'Fire' ? 'bg-red-100 text-red-700' :
                                        log.type === 'Intrusion' ? 'bg-orange-100 text-orange-700' :
                                            log.type === 'Chainsaw' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {log.type}
                                    </span>
                                </td>
                                <td className="p-3 capitalize">{log.severity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryTable;
