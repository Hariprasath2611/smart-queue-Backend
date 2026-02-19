import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Ticket, MapPin, ChevronRight, Activity, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { queueApi } from '../api/queue';
import { authApi } from '../api/auth';

interface Branch {
    id: string;
    name: string;
    address: string;
}

interface Service {
    id: string;
    name: string;
    description?: string;
}

interface Token {
    id: string;
    number: number;
    displayId: string;
    waitingAhead: number;
    estimatedWaitTime: number;
}

const CustomerQueue = () => {
    const [step, setStep] = useState<'branch' | 'service' | 'confirm' | 'status'>('branch');
    const [branches, setBranches] = useState<Branch[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [token, setToken] = useState<Token | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = authApi.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }
        fetchOrganizationsAndBranches();
    }, []);

    const fetchOrganizationsAndBranches = async () => {
        setLoading(true);
        try {
            // For now, assuming we use a default org or fetch the first one
            // In a real app, you might select an organization first
            const branchesData = await queueApi.getBranches(); // The API might need orgId
            setBranches(branchesData);
        } catch (err) {
            setError('Failed to load branches.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectBranch = async (branch: Branch) => {
        setSelectedBranch(branch);
        setLoading(true);
        try {
            const servicesData = await queueApi.getServices();
            setServices(servicesData);
            setStep('service');
        } catch (err) {
            setError('Failed to load services.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectService = (service: Service) => {
        setSelectedService(service);
        setStep('confirm');
    };

    const confirmJoin = async () => {
        if (!selectedService || !selectedBranch) return;
        setLoading(true);
        try {
            const data = await queueApi.joinQueue({
                serviceId: selectedService.id,
                branchId: selectedBranch.id,
                priority: 0
            });
            setToken({
                id: data.tokenId,
                number: data.tokenNumber,
                displayId: data.displayId,
                waitingAhead: data.waitingCount,
                estimatedWaitTime: data.estimatedWaitTime
            });
            setStep('status');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to join queue.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => {
                            if (step === 'status') navigate('/');
                            else if (step === 'confirm') setStep('service');
                            else if (step === 'service') setStep('branch');
                            else navigate('/');
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-xl font-bold text-white">
                        {step === 'branch' ? 'Select Branch' : step === 'service' ? 'Select Service' : step === 'confirm' ? 'Confirm' : 'Your Token'}
                    </h2>
                    <div className="w-10" />
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {step === 'branch' && (
                        <motion.div
                            key="branch"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <div className="mb-6">
                                <h3 className="text-white text-lg font-bold mb-2">Available Branches</h3>
                                <p className="text-slate-400 text-sm">Choose a location to join the queue</p>
                            </div>

                            {branches.length === 0 && !loading && (
                                <div className="text-center py-10 text-slate-500">No branches available at the moment.</div>
                            )}

                            {branches.map((branch) => (
                                <motion.div
                                    key={branch.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelectBranch(branch)}
                                    className="glass-morphism p-6 rounded-3xl flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary-400 group-hover:bg-primary-500/10 transition-all">
                                            <Building size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">{branch.name}</h4>
                                            <p className="text-xs text-slate-500 mt-1 flex items-center">
                                                <MapPin size={12} className="mr-1" /> {branch.address}
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-600 group-hover:text-white transition-colors" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {step === 'service' && (
                        <motion.div
                            key="service"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <div className="mb-6 p-6 glass-morphism rounded-3xl border-primary-500/20 bg-primary-500/5">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-2xl bg-primary-500/20 text-primary-400">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{selectedBranch?.name}</h4>
                                        <p className="text-sm text-slate-400">{selectedBranch?.address}</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-white text-lg font-bold mb-4">Select Service</h3>

                            {services.length === 0 && !loading && (
                                <div className="text-center py-10 text-slate-500">No services available for this branch.</div>
                            )}

                            {services.map((service) => (
                                <motion.div
                                    key={service.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelectService(service)}
                                    className="glass-morphism p-6 rounded-3xl flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary-400 group-hover:bg-primary-500/10 transition-all">
                                            <Activity size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">{service.name}</h4>
                                            {service.description && (
                                                <p className="text-xs text-slate-500 mt-1">{service.description}</p>
                                            )}
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
                            <p className="text-slate-400 mb-8">
                                You are joining the <span className="text-primary-400 font-semibold">{selectedService.name}</span> at <span className="text-primary-400 font-semibold">{selectedBranch?.name}</span>.
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={confirmJoin}
                                    disabled={loading}
                                    className="w-full py-4 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-bold transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50"
                                >
                                    {loading ? 'Joining...' : 'Confirm & Get Token'}
                                </button>
                                <button
                                    onClick={() => setStep('service')}
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
                                    {token.displayId}
                                </h1>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                                        <p className="text-primary-400 font-bold text-2xl mb-1">{token.waitingAhead}</p>
                                        <p className="text-xs text-slate-500 uppercase">People Ahead</p>
                                    </div>
                                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                                        <p className="text-amber-400 font-bold text-2xl mb-1">{token.estimatedWaitTime}m</p>
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
                                onClick={() => { setStep('branch'); setToken(null); }}
                                className="w-full py-4 text-slate-500 hover:text-white transition-colors text-sm font-medium"
                            >
                                Leave Queue
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {loading && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center text-white">Loading...</div>}
        </div>
    );
};

export default CustomerQueue;
