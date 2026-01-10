import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FOREST_ZONES } from '../data/mockData';

// Fix for default Leaflet markers in React
// We'll use custom DivIcons instead for "clean and minimal" look
const createCustomIcon = (risk) => {
    let colorClass = '';
    switch (risk) {
        case 'high': colorClass = 'bg-red-500'; break;
        case 'medium': colorClass = 'bg-yellow-500'; break;
        case 'low': colorClass = 'bg-green-500'; break;
        default: colorClass = 'bg-gray-400';
    }

    return L.divIcon({
        className: 'custom-marker',
        html: `<div class="${colorClass} w-4 h-4 rounded-full border-2 border-white shadow-md animate-pulse"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
};

const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 13, {
            duration: 2,
            easeLinearity: 0.25
        });
    }, [center, map]);
    return null;
};

const MapComponent = () => {
    // Default center (Mudumalai)
    const defaultCenter = [11.5623, 76.5345];

    return (
        <div className="h-full w-full rounded-lg overflow-hidden shadow-inner border border-gray-200">
            <MapContainer
                center={defaultCenter}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater center={defaultCenter} />

                {FOREST_ZONES.map((zone) => (
                    <Marker
                        key={zone.id}
                        position={[zone.lat, zone.lng]}
                        icon={createCustomIcon(zone.risk)}
                    >
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-forest-dark">{zone.name}</h3>
                                <p className="text-xs uppercase font-semibold text-gray-500">Risk: {zone.risk}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
