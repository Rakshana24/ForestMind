import React, { useState } from 'react';
import { ALERTS } from '../data/mockData';

const AlertItem = ({ alert }) => {
    const [expanded, setExpanded] = useState(false);

    // Border color based on severity
    const borderClass = {
        high: 'border-l-4 border-red-500',
        medium: 'border-l-4 border-yellow-500',
        low: 'border-l-4 border-green-500'
    }[alert.severity];

    return (
        <div
            className={`bg-white mb-2 rounded-r-md shadow-sm hover:shadow-md transition-shadow cursor-pointer ${borderClass}`}
            onClick={() => setExpanded(!expanded)}
        >
            <div className="p-3 flex justify-between items-center">
                <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{alert.location}</h4>
                    <span className="text-xs text-gray-400">{alert.timestamp}</span>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded capitalize ${alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                    }`}>
                    {alert.type}
                </div>
            </div>

            {/* Expanded Details */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-3 bg-gray-50 text-sm border-t border-gray-100">
                    <p className="text-gray-700 mb-1"><strong>Details:</strong> {alert.description}</p>
                    <div className="flex justify-end mt-2">
                        <button className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-gray-100">
                            View Feed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AlertSection = ({ title, severity, alerts, color }) => {
    const [showAll, setShowAll] = useState(false);

    const filteredAlerts = alerts.filter(a => a.severity === severity);
    const displayAlerts = showAll ? filteredAlerts : filteredAlerts.slice(0, 3);
    const hasMore = filteredAlerts.length > 3;

    if (filteredAlerts.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 flex items-center ${color}`}>
                <span className="w-2 h-2 rounded-full mr-2 bg-current"></span>
                {title} Risk Alerts ({filteredAlerts.length})
            </h3>
            <div className="space-y-2">
                {displayAlerts.map(alert => (
                    <AlertItem key={alert.id} alert={alert} />
                ))}
            </div>
            {hasMore && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-2 text-xs font-medium text-gray-500 hover:text-forest-primary transition-colors focus:outline-none"
                >
                    {showAll ? 'Show Less' : `Show ${filteredAlerts.length - 3} More`}
                </button>
            )}
        </div>
    );
};

const AlertPanel = () => {
    return (
        <div className="bg-white h-full p-6 rounded-lg shadow-sm border border-gray-100 overflow-y-auto">
            <h2 className="text-xl font-bold text-forest-dark mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-gray-100">
                Alert Intelligence
            </h2>

            <AlertSection
                title="High"
                severity="high"
                alerts={ALERTS}
                color="text-red-600"
            />

            <AlertSection
                title="Medium"
                severity="medium"
                alerts={ALERTS}
                color="text-yellow-600"
            />

            <AlertSection
                title="Low"
                severity="low"
                alerts={ALERTS}
                color="text-green-600"
            />
        </div>
    );
};

export default AlertPanel;
