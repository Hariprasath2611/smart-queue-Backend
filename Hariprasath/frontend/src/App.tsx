import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users, ShieldCheck, ArrowRight, Activity, Clock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Screens (To be implemented in separate files)
const LandingPage = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#020617] overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="z-10 text-center"
    >
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm mb-6">
        <Activity size={16} />
        <span>Smart Queue Management</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
        Streamline Your <span className="text-gradient">Experience</span>
      </h1>
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
        Join queues virtually, track your status in real-time, and save hours of waiting. The future of service management is here.
      </p>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <Link to="/customer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group glass-morphism p-8 rounded-3xl w-full md:w-80 text-left transition-all hover:bg-white/10 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors">
              <Users className="text-primary-400 group-hover:text-white" size={28} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Customer</h3>
            <p className="text-slate-400 mb-6">Join a queue and get your virtual token in seconds.</p>
            <div className="flex items-center text-primary-400 font-medium pt-4 border-t border-white/5">
              Get Started <ArrowRight className="ml-2" size={18} />
            </div>
          </motion.div>
        </Link>

        <Link to="/staff">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group glass-morphism p-8 rounded-3xl w-full md:w-80 text-left transition-all hover:bg-white/10 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
              <ShieldCheck className="text-emerald-400 group-hover:text-white" size={28} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Staff Portal</h3>
            <p className="text-slate-400 mb-6">Manage queues, call next tokens, and view analytics.</p>
            <div className="flex items-center text-emerald-400 font-medium pt-4 border-t border-white/5">
              Login as Staff <LogIn className="ml-2" size={18} />
            </div>
          </motion.div>
        </Link>
      </div>

      <div className="mt-20 flex items-center justify-center space-x-8 text-slate-500">
        <div className="flex items-center space-x-2">
          <Clock size={18} />
          <span>Real-time Tracking</span>
        </div>
        <div className="w-1 h-1 bg-slate-700 rounded-full" />
        <div className="flex items-center space-x-2">
          <Users size={18} />
          <span>Priority Queues</span>
        </div>
      </div>
    </motion.div>
  </div>
);

import CustomerQueue from './components/CustomerQueue';
import StaffDashboard from './components/StaffDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customer" element={<CustomerQueue />} />
        <Route path="/staff" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
