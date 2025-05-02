import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TimelineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 border border-gray-700 rounded-xl shadow-2xl p-4 backdrop-blur-md">
          <p className="text-sm font-medium bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent mb-1">
            {`${label}:00`}
          </p>
          <p className="text-2xl font-bold text-white">
            {payload[0].value} <span className="text-xs text-gray-400">alerts</span>
          </p>
          <div className="mt-2 h-1 w-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full opacity-80"></div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">Previous: {payload[0].payload.previous || 0}</span>
            <span className="text-xs text-emerald-400">
              {payload[0].payload.trend > 0 ? '↑' : '↓'} {Math.abs(payload[0].payload.trend)}%
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800/90 border border-gray-700/30 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-white">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Alert Timeline
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">Last 24 hours activity</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-900/30 to-emerald-900/30 border border-cyan-700/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            <span className="text-xs bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Live Data
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5EEAD4" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#047857" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#334155" 
            strokeOpacity={0.2}
          />
          
          <XAxis 
            dataKey="hour" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickMargin={10}
            tickFormatter={(value) => `${value}h`}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            width={30}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{
              stroke: '#10B981',
              strokeWidth: 1,
              strokeDasharray: '4 4',
              fill: 'rgba(16, 185, 129, 0.05)'
            }}
          />
          
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="url(#lineGradient)"
            strokeWidth={3}
            fill="url(#areaGradient)" 
            activeDot={{
              r: 8,
              stroke: '#FFFFFF',
              strokeWidth: 2,
              fill: '#10B981'
            }}
            animationDuration={2000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-3">
          <div className="flex items-center px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/50">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 mr-2"></span>
            <span className="text-xs text-gray-300">Peak Hours</span>
          </div>
          <div className="flex items-center px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/50">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 mr-2"></span>
            <span className="text-xs text-gray-300">Critical Periods</span>
          </div>
        </div>
        <div className="text-xs bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
          Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;