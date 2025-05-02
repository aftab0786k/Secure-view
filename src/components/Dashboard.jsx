import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiShield, FiBell, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { processChartData, getStatistics } from '../data/securityData';

import StatCard from './StatCard';
import SeverityChart from './charts/SeverityChart';
import ActionChart from './charts/ActionChart';
import TopPortsChart from './charts/TopPortsChart';
import CategoryChart from './charts/CategoryChart';
import TimelineChart from './charts/TimelineChart';
import AlertTable from './AlertTable';

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartData(processChartData());
      setStats(getStatistics());
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-full min-h-[80vh]"
      >
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              transition: { 
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
            Loading Dashboard
          </h3>
          <p className="text-gray-400 mt-2">Analyzing security data...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-6 px-4 sm:px-6"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-200 mb-2"
        >
          Security Alert Dashboard
        </motion.h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard 
          title="Total Alerts" 
          value={stats.totalAlerts}
          icon={<FiBell className="text-cyan-400" size={20} />}
          trend={"+12%"}
          trendUp={false}
          color="cyan"
        />
        <StatCard 
          title="Alerts Blocked" 
          value={stats.blockedAlerts}
          icon={<FiShield className="text-emerald-400" size={20} />}
          trend={"+8%"}
          trendUp={true}
          color="emerald"
        />
        <StatCard 
          title="High Severity" 
          value={stats.highSeverity}
          icon={<FiAlertTriangle className="text-rose-400" size={20} />}
          trend={"-5%"}
          trendUp={false}
          color="rose"
        />
        <StatCard 
          title="TCP Connections" 
          value={stats.topProtocols.TCP || 0}
          icon={<div className="text-sky-400">🌐</div>}
          trend={"+20%"}
          trendUp={true}
          color="sky"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <TimelineChart data={chartData.hourlyData} />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-900/80 to-blue-900/50 rounded-xl border border-slate-800/50 shadow-xl backdrop-blur-sm"
        >
          <SeverityChart data={chartData.severityData} />
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-900/80 to-blue-900/50 rounded-xl border border-slate-800/50 shadow-xl backdrop-blur-sm"
        >
          <ActionChart data={chartData.actionData} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-slate-900/80 to-blue-900/50 rounded-xl border border-slate-800/50 shadow-xl backdrop-blur-sm"
        >
          <TopPortsChart data={chartData.topPortsData} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-slate-900/80 to-blue-900/50 rounded-xl border border-slate-800/50 shadow-xl backdrop-blur-sm"
        >
          <CategoryChart data={chartData.categoryData} />
        </motion.div>
      </div>

      {/* Alert Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-slate-900/80 to-blue-900/50 rounded-xl border border-slate-800/50 shadow-2xl backdrop-blur-sm overflow-hidden"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 mb-6">
            Recent Security Alerts
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mt-2"></div>
          </h3>
          <AlertTable />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;