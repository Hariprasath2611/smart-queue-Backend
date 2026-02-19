import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Play, CheckCircle, Users, Activity, Clock, Bell } from 'lucide-react';

const StaffDashboard = () => {
    const [activeQueue, setActiveQueue] = useState({
        id: 'q1',
        name: 'Main Service',
        waitingCount: 12,
        currentToken: 'A104',
        history: ['A103', 'A102', 'A101']
    });

    const [isCalling, setIsCalling] = useState(false);

    const handleCallNext = () => {
        setIsCalling(true);
        // Simulation
        setTimeout(() => {
            setIsCalling(false);
            setActiveQueue(prev => ({
                ...prev,
                waitingCount: prev.waitingCount - 1,
                currentToken: `A${parseInt(prev.currentToken.substring(1)) + 1}`,
                history: [prev.currentToken, ...prev.history].slice(0, 5)
            }));
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8">
            {/* Header */}
            <nav className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <ShieldCheck className="text-emerald-400" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Staff Portal</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-medium text-white">Hariprasath</p>
                        <p className="text-xs text-slate-500">Service Supervisor</p>
                    </div>
                    <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400">
                        <LogOut size={20} />
                    </button>
                </div>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Controls */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-morphism rounded-3xl p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Live</span>
                            </div>
                        </div>

                        <h3 className="text-slate-400 mb-2 font-medium">Currently Serving</h3>
                        <motion.div
                            key={activeQueue.currentToken}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-8xl md:text-9xl font-bold text-white mb-8 tracking-tighter"
                        >
                            {activeQueue.currentToken}
                        </motion.div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCallNext}
                                disabled={isCalling}
                                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all ${isCalling ? 'bg-slate-700 text-slate-500' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                    }`}
                            >
                                {isCalling ? <Clock className="animate-spin" size={24} /> : <Bell size={24} />}
                                <span>{isCalling ? 'Calling...' : 'Call Next Token'}</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/5"
                            >
                                <CheckCircle size={24} />
                                <span>Mark Completed</span>
                            </motion.button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <Users size={20} />, label: 'Waiting', value: activeQueue.waitingCount, color: 'text-primary-400' },
                            { icon: <Clock size={20} />, label: 'Avg Wait', value: '12m', color: 'text-amber-400' },
                            { icon: <Activity size={20} />, label: 'Efficiency', value: '94%', color: 'text-emerald-400' },
                            { icon: <CheckCircle size={20} />, label: 'Served', value: '42', color: 'text-blue-400' }
                        ].map((stat, i) => (
                            <div key={i} className="glass-morphism rounded-2xl p-5">
                                <div className={`${stat.color} mb-3`}>{stat.icon}</div>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar / History */}
                <div className="space-y-8">
                    <div className="glass-morphism rounded-3xl p-6 h-full border-white/5">
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                            <Activity size={20} className="mr-2 text-primary-400" />
                            Recent Activity
                        </h4>
                        <div className="space-y-4">
                            <AnimatePresence initial={false}>
                                {activeQueue.history.map((token, i) => (
                                    <motion.div
                                        key={token}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-300">
                                                {token}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Completed</p>
                                                <p className="text-xs text-slate-500">2 mins ago</p>
                                            </div>
                                        </div>
                                        <div className="text-emerald-500">
                                            <CheckCircle size={18} />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <button className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-slate-400 transition-colors">
                            View All Activity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
import { ShieldCheck } from 'lucide-react';
