import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, ArrowLeft, Ticket, MapPin, ChevronRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
    id: string;
    name: string;
    waitTime: string;
    users: number;
    icon: React.ReactNode;
}

interface Token {
    number: string;
    queueName: string;
    waitingAhead: number;
    estTime: string;
}

const CustomerQueue = () => {
    const [step, setStep] = useState<'select' | 'confirm' | 'status'>('select');
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [token, setToken] = useState<Token | null>(null);

    const services: Service[] = [
        { id: '1', name: 'General Consultation', waitTime: '15 min', users: 4, icon: <Users size={24} /> },
        { id: '2', name: 'Document Verification', waitTime: '45 min', users: 12, icon: <Ticket size={24} /> },
        { id: '3', name: 'Payment & Billing', waitTime: '5 min', users: 2, icon: <Activity size={24} /> },
        { id: '4', name: 'Technical Support', waitTime: '30 min', users: 7, icon: <Clock size={24} /> },
    ];

    const handleJoin = (service: Service) => {
        setSelectedService(service);
        setStep('confirm');
    };

    const confirmJoin = () => {
        if (!selectedService) return;
        // Simulation
        setToken({
            number: 'A105',
            queueName: selectedService.name,
            waitingAhead: 5,
            estTime: '25 min'
        });
        setStep('status');
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <h2 className="text-xl font-bold text-white">
                        {step === 'select' ? 'Select Service' : step === 'confirm' ? 'Confirm' : 'Your Token'}
                    </h2>
                    <div className="w-10" />
                </div>

                <AnimatePresence mode="wait">
                    {step === 'select' && (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <div className="mb-8 p-6 glass-morphism rounded-3xl border-primary-500/20 bg-primary-500/5">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-2xl bg-primary-500/20 text-primary-400">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Main Headquarters</h4>
                                        <p className="text-sm text-slate-400">123 Business Ave, Tech City</p>
                                    </div>
                                </div>
                            </div>

                            {services.map((service) => (
                                <motion.div
                                    key={service.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleJoin(service)}
                                    className="glass-morphism p-6 rounded-3xl flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary-400 group-hover:bg-primary-500/10 transition-all">
                                            {service.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">{service.name}</h4>
                                            <div className="flex items-center space-x-3 mt-1 text-xs text-slate-500">
                                                <span className="flex items-center"><Clock size={12} className="mr-1" /> {service.waitTime} wait</span>
                                                <span className="flex items-center"><Users size={12} className="mr-1" /> {service.users} waiting</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-600 group-hover:text-white transition-colors" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {step === 'confirm' && selectedService && (
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-morphism rounded-[40px] p-8 text-center border-white/10"
                        >
                            <div className="w-20 h-20 bg-primary-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                <Ticket size={40} className="text-primary-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2 font-display">Join Queue?</h3>
                            <p className="text-slate-400 mb-8">You are joining the <span className="text-primary-400 font-semibold">{selectedService.name}</span>. Estimated wait time is approximately {selectedService.waitTime}.</p>

                            <div className="space-y-4">
                                <button
                                    onClick={confirmJoin}
                                    className="w-full py-4 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-bold transition-all shadow-lg shadow-primary-500/25"
                                >
                                    Confirm & Get Token
                                </button>
                                <button
                                    onClick={() => setStep('select')}
                                    className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'status' && token && (
                        <motion.div
                            key="status"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="glass-morphism rounded-[40px] p-10 text-center relative overflow-hidden border-primary-500/20 shadow-2xl shadow-primary-500/10">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

                                <p className="text-slate-400 font-medium mb-4 uppercase tracking-[0.2em] text-xs">Your Token Number</p>
                                <h1 className="text-8xl md:text-9xl font-black text-white mb-8 text-gradient tabular-nums">
                                    {token.number}
                                </h1>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                                        <p className="text-primary-400 font-bold text-2xl mb-1">{token.waitingAhead}</p>
                                        <p className="text-xs text-slate-500 uppercase">People Ahead</p>
                                    </div>
                                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                                        <p className="text-amber-400 font-bold text-2xl mb-1">{token.estTime}</p>
                                        <p className="text-xs text-slate-500 uppercase">Est. Wait</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-morphism p-6 rounded-3xl flex items-center justify-between border-white/5">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <Activity size={24} className="animate-pulse" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm">Live Updates Active</h4>
                                        <p className="text-xs text-slate-500">You'll be notified when called</p>
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-emerald-500/40" />)}
                                </div>
                            </div>

                            <p className="text-center text-slate-500 text-sm px-6">
                                Please stay near the service area. A notification will appear here when your turn arrives.
                            </p>

                            <button
                                onClick={() => { setStep('select'); setToken(null); }}
                                className="w-full py-4 text-slate-500 hover:text-white transition-colors text-sm font-medium"
                            >
                                Leave Queue
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CustomerQueue;
