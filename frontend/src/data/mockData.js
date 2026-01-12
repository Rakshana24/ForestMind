export const DISTRICTS = [
    "Nilgiris",
    "Coimbatore",
    "Erode",
    "Dindigul",
    "Tirunelveli",
    "Salem",
    "Theni",
    "Kanyakumari"
];

export const FOREST_ZONES = [
    { id: 1, name: "Mudumalai Core", lat: 11.5623, lng: 76.5345, risk: "high" },
    { id: 2, name: "Bandipur Border", lat: 11.6623, lng: 76.6345, risk: "medium" },
    { id: 3, name: "Silent Valley Edge", lat: 11.4623, lng: 76.4345, risk: "low" },
    { id: 4, name: "Ooty Buffer", lat: 11.4000, lng: 76.7000, risk: "low" },
    { id: 5, name: "Gudalur Range", lat: 11.5000, lng: 76.4000, risk: "medium" },
];

export const ALERTS = [
    {
        id: 101,
        type: "Fire",
        timestamp: "2026-01-10 10:45 AM",
        location: "Mudumalai Core - Zone A",
        severity: "high",
        description: "Thermal anomaly detected by satellite sensor. Possible wildfire starting."
    },
    {
        id: 102,
        type: "Chainsaw",
        timestamp: "2026-01-10 10:30 AM",
        location: "Bandipur Border - Sector 4",
        severity: "medium",
        description: "Audio sensor pattern match: Chainsaw activity consistent with illegal logging."
    },
    {
        id: 103,
        type: "Intrusion",
        timestamp: "2026-01-10 09:15 AM",
        location: "Gudalur Range - Gate 2",
        severity: "medium",
        description: "Motion detected in restricted vehicle path."
    },
    {
        id: 104,
        type: "Movement",
        timestamp: "2026-01-10 08:00 AM",
        location: "Ooty Buffer - Zone C",
        severity: "low",
        description: "Minor movement detected, likely animal crossing."
    },
    {
        id: 105,
        type: "Fire",
        timestamp: "2026-01-10 07:55 AM",
        location: "Mudumalai Core - Zone B",
        severity: "high",
        description: "Smoke sensor triggered. Visual verification needed."
    }
];

export const HISTORY_LOGS = [
    { id: 1, date: "2026-01-09", location: "Mudumalai Core", type: "Intrusion", severity: "high", action: "Patrol Dispatched" },
    { id: 2, date: "2026-01-09", location: "Ooty Buffer", type: "Chainsaw", severity: "medium", action: "Drone Deployed" },
    { id: 3, date: "2026-01-08", location: "Gudalur Range", type: "Fire", severity: "low", action: "False Alarm - Controlled Burn" },
    { id: 4, date: "2026-01-08", location: "Bandipur Border", type: "Movement", severity: "low", action: "Logged" },
    { id: 5, date: "2026-01-07", location: "Silent Valley Edge", type: "Intrusion", severity: "high", action: "Apprehended" },
];

export const CURRENT_FOREST_DETAILS = {
    name: "Mudumalai Tiger Reserve",
    district: "Nilgiris",
    lat: 11.5623,
    lng: 76.5345,
    description: "A protected area in the prompt Nilgiris District, known for its tiger population and diverse flora. Critical zone for monitoring poaching and wildfires."
};
