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
        <div className="bg-gray-800/90 border border-gray-700 rounded-lg shadow-xl p-4 backdrop-blur-sm">
          <p className="text-sm font-medium text-indigo-300 mb-1">{`${label}:00`}</p>
          <p className="text-lg font-semibold text-white">
            {payload[0].value} <span className="text-xs text-gray-400">alerts</span>
          </p>
          <div className="mt-1 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Alert Timeline
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">Last 24 hours activity</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/50">
            <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
            <span className="text-xs text-indigo-300">Live Data</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
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
              <stop offset="0%" stopColor="#818CF8" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#6366F1" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#334155" 
            strokeOpacity={0.3}
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
              stroke: '#6366F1',
              strokeWidth: 1,
              strokeDasharray: '4 4',
              fill: 'rgba(99, 102, 241, 0.05)'
            }}
          />
          
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="url(#lineGradient)"
            strokeWidth={3}
            fill="url(#areaGradient)" 
            activeDot={{
              r: 6,
              stroke: '#FFFFFF',
              strokeWidth: 2,
              fill: '#6366F1'
            }}
            animationDuration={2000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
            <span className="text-xs text-gray-400">Peak Hours</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;