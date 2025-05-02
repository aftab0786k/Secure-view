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
  // Calculate percentages for tooltip if not provided in data
  const chartData = data.map(item => {
    const total = data.reduce((sum, d) => sum + d.count, 0);
    return {
      ...item,
      percentage: (item.count / total) * 100
    };
  });

  // Premium gradient colors with glow effects
  const barColors = [
    { start: "#8B5CF6", end: "#7C3AED", shadow: "rgba(139, 92, 246, 0.4)" },  // Purple
    { start: "#3B82F6", end: "#2563EB", shadow: "rgba(59, 130, 246, 0.4)" },  // Blue
    { start: "#10B981", end: "#059669", shadow: "rgba(16, 185, 129, 0.4)" },  // Emerald
    { start: "#F59E0B", end: "#D97706", shadow: "rgba(245, 158, 11, 0.4)" }, // Amber
    { start: "#EF4444", end: "#DC2626", shadow: "rgba(239, 68, 68, 0.4)" },  // Red
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const colorIndex = chartData.findIndex(item => item.port === label) % barColors.length;
      const color = barColors[colorIndex];
      
      return (
        <div className="bg-gray-900/95 border border-gray-700 rounded-xl shadow-2xl p-4 backdrop-blur-md">
          <div className="flex items-center mb-2">
            <div 
              className="w-3 h-3 rounded-full mr-2 shadow-sm"
              style={{ 
                background: `linear-gradient(135deg, ${color.start}, ${color.end})`,
                boxShadow: `0 0 6px ${color.shadow}`
              }}
            ></div>
            <p className="font-medium text-white">{`Port: ${label}`}</p>
          </div>
          <p className="text-xl font-bold text-white">
            {payload[0].value.toLocaleString()}
            <span className="text-xs text-gray-400 ml-1">alerts</span>
          </p>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <p className="text-xs text-gray-300 mt-2">
            {(payload[0].payload.percentage || 0).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/30 rounded-xl p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-900/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-900/20 blur-3xl"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-semibold text-white">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Top Targeted Ports
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">Most frequently attacked ports</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center px-2 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/50 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></div>
            <span className="text-xs text-indigo-300">Live Data</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300} className="relative z-10">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 15,
          }}
          barSize={32}
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
                <stop offset="0%" stopColor={color.start} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color.end} stopOpacity={0.8} />
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#334155" 
            opacity={0.2}
          />
          
          <XAxis 
            dataKey="port" 
            scale="band" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickMargin={12}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            width={35}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
          />
          
          <Bar 
            dataKey="count" 
            radius={[6, 6, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={`url(#colorGradient-${index % barColors.length})`}
                stroke="#111827"
                strokeWidth={1.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-between items-center relative z-10">
        <div className="flex space-x-4">
          {barColors.slice(0, 2).map((color, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2 shadow-sm"
                style={{ 
                  background: `linear-gradient(135deg, ${color.start}, ${color.end})`,
                  boxShadow: `0 0 6px ${color.shadow}`
                }}
              ></div>
              <span className="text-xs text-gray-400">
                {index === 0 ? 'High Risk' : 'Medium Risk'}
              </span>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500">
          Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
};

export default TopPortsChart;