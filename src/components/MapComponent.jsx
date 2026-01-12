import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, CircleMarker, Popup, useMap, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FOREST_ZONES } from '../data/mockData';

// Helper for colors
const getRiskColor = (risk) => {
    switch (risk) {
        case 'high': return { color: '#ef4444', fillColor: '#ef4444' }; // Red-500
        case 'medium': return { color: '#eab308', fillColor: '#eab308' }; // Yellow-500
        case 'low': return { color: '#22c55e', fillColor: '#22c55e' }; // Green-500
        default: return { color: '#9ca3af', fillColor: '#9ca3af' };
    }
};

const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 12, {
            duration: 2.5,
            easeLinearity: 0.25
        });
    }, [center, map]);
    return null;
};

const MapComponent = () => {
    const defaultCenter = [11.5623, 76.5345];
    const [activeZone, setActiveZone] = useState(null);

    return (
        <div className="h-full w-full rounded-lg overflow-hidden shadow-inner border border-gray-200 relative">
            <MapContainer
                center={defaultCenter}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
            >
                <MapUpdater center={defaultCenter} />

                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Satellite View">
                        <TileLayer
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Standard Map">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Terrain View">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenTopoMap</a>'
                            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                {FOREST_ZONES.map((zone) => {
                    const { color, fillColor } = getRiskColor(zone.risk);
                    const isHighRisk = zone.risk === 'high';

                    return (
                        <LayerGroup key={zone.id}>
                            {/* Coverage Area (Zone) */}
                            <Circle
                                center={[zone.lat, zone.lng]}
                                radius={isHighRisk ? 1200 : 800} // Larger radius for high risk
                                pathOptions={{
                                    color: color,
                                    fillColor: fillColor,
                                    fillOpacity: isHighRisk ? 0.3 : 0.15,
                                    weight: 1,
                                    dashArray: isHighRisk ? '5, 5' : null
                                }}
                            />

                            {/* Central Pulse Point for High Risk */}
                            {isHighRisk && (
                                <Circle
                                    center={[zone.lat, zone.lng]}
                                    radius={100}
                                    className="animate-ping origin-center box-border"
                                    pathOptions={{
                                        color: color,
                                        fillColor: fillColor,
                                        fillOpacity: 0.8,
                                        weight: 0
                                    }}
                                />
                            )}

                            {/* Interactive Core Marker */}
                            <CircleMarker
                                center={[zone.lat, zone.lng]}
                                radius={8}
                                pathOptions={{
                                    color: 'white',
                                    weight: 2,
                                    fillColor: fillColor,
                                    fillOpacity: 1
                                }}
                                eventHandlers={{
                                    click: () => setActiveZone(zone),
                                    mouseover: (e) => e.target.openPopup(),
                                    mouseout: (e) => e.target.closePopup(),
                                }}
                            >
                                <Popup closeButton={false} offset={[0, -10]}>
                                    <div className="text-center">
                                        <h3 className="font-bold text-gray-800 text-sm mb-1">{zone.name}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full text-white capitalize ${zone.risk === 'high' ? 'bg-red-500' :
                                            zone.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}>
                                            {zone.risk} Risk
                                        </span>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        </LayerGroup>
                    );
                })}
            </MapContainer>

            {/* Visual Legend */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg border border-gray-100 z-[1000] text-xs">
                <h4 className="font-bold text-gray-600 mb-2 uppercase tracking-wider">Risk Zones</h4>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-red-500 mr-2 shadow-sm border border-white"></span>
                        <span className="text-gray-700">Critical (Action Req.)</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2 shadow-sm border border-white"></span>
                        <span className="text-gray-700">Warning (Monitor)</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-2 shadow-sm border border-white"></span>
                        <span className="text-gray-700">Safe</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
