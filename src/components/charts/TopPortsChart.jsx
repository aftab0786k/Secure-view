import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const TopPortsChart = ({ data }) => {
  // Custom gradient colors for each bar
  const barColors = [
    { start: "#6366F1", end: "#A855F7" },  // Purple gradient
    { start: "#3B82F6", end: "#60A5FA" },  // Blue gradient
    { start: "#10B981", end: "#34D399" },  // Emerald gradient
    { start: "#F59E0B", end: "#FBBF24" },  // Amber gradient
    { start: "#EF4444", end: "#F87171" },  // Red gradient
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-3 backdrop-blur-sm">
          <p className="font-medium text-indigo-300">{`Port: ${label}`}</p>
          <p className="text-gray-200">{`Alerts: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-5 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Top Targeted Ports
          </span>
        </h3>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></span>
            <span className="text-xs text-gray-400">High Risk</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
            <span className="text-xs text-gray-400">Medium Risk</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 15,
          }}
          barSize={28}
        >
          <defs>
            {barColors.map((color, index) => (
              <linearGradient 
                key={`gradient-${index}`} 
                id={`colorGradient-${index}`} 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="1"
              >
                <stop offset="0%" stopColor={color.start} stopOpacity={0.8} />
                <stop offset="100%" stopColor={color.end} stopOpacity={0.6} />
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#334155" 
            opacity={0.3}
          />
          
          <XAxis 
            dataKey="port" 
            scale="band" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickMargin={10}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            width={30}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          
          <Bar 
            dataKey="count" 
            radius={[6, 6, 0, 0]}
            animationDuration={1800}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={`url(#colorGradient-${index % barColors.length})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-end">
        <div className="text-xs text-gray-500">
          Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default TopPortsChart;