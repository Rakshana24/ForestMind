import React, { useState, useRef, useEffect } from 'react';

const AIChat = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: 'ForestMind Intelligent Assistant online. How can I assist with decision support today?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI Response
        setTimeout(() => {
            let responseText = '';
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('report') || lowerInput.includes('summary')) {
                // Structured Report Response
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    sender: 'ai',
                    type: 'report',
                    data: {
                        total: 24,
                        high: 4,
                        medium: 12,
                        major: ["Fire detected in Zone B (Controlled)", "Illegal Logging - Mudumalai Border"],
                        hotspots: ["Gudalur Range", "Bandipur Border"]
                    }
                }]);
            } else {
                // Generic Professional Response
                responseText = "I've logged that query. Please specify if you need a specific incident report or risk assessment.";
                setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: responseText }]);
            }
        }, 1000);
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 bg-forest-dark text-white rounded-t-lg flex items-center justify-between">
                <h3 className="font-semibold text-sm tracking-wide">AI Assistant</h3>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm ${msg.sender === 'user'
                                ? 'bg-forest-secondary text-white rounded-br-none'
                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                            }`}>
                            {msg.type === 'report' ? (
                                <div className="space-y-2">
                                    <p className="font-bold border-b pb-1 mb-1 border-gray-100">Monthly Incident Report</p>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="bg-gray-50 p-2 rounded">Total Alerts: <span className="font-bold">{msg.data.total}</span></div>
                                        <div className="bg-red-50 p-2 rounded text-red-700">High Risk: <span className="font-bold">{msg.data.high}</span></div>
                                    </div>
                                    <p className="font-semibold text-xs mt-2">Major Incidents:</p>
                                    <ul className="list-disc pl-4 text-xs space-y-1">
                                        {msg.data.major.map((m, i) => <li key={i}>{m}</li>)}
                                    </ul>
                                    <p className="font-semibold text-xs mt-2">High Risk Zones:</p>
                                    <p className="text-xs text-forest-primary">{msg.data.hotspots.join(', ')}</p>
                                </div>
                            ) : (
                                <p>{msg.text}</p>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white rounded-b-lg flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask for reports or intelligence..."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-forest-primary"
                />
                <button
                    type="submit"
                    className="bg-forest-dark text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default AIChat;
