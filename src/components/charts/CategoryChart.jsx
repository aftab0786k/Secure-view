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

const CategoryChart = ({ data }) => {
  // Process data with truncated names and custom colors
  const processedData = data.map((item, index) => ({
    ...item,
    displayCategory: item.category.length > 20 
      ? `${item.category.substring(0, 18)}...` 
      : item.category,
    color: getCategoryColor(index, data.length)
  }));

  // Dynamic color generator based on index
  function getCategoryColor(index, total) {
    const hue = (index * (360 / total)) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const originalItem = data.find(item => 
        item.category === payload[0].payload.category
      );
      
      return (
        <div className="bg-gray-800/90 border border-gray-700 rounded-lg shadow-xl p-4 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: payload[0].payload.color }}
            ></div>
            <p className="text-sm font-medium text-white">{originalItem.category}</p>
          </div>
          <p className="text-lg font-semibold text-indigo-300">
            {payload[0].value} <span className="text-xs text-gray-400">alerts</span>
          </p>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          <p className="text-xs text-gray-400 mt-2">
            {((payload[0].value / data.reduce((a, b) => a + b.count, 0)) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Threat Categories
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">Distribution by alert type</p>
        </div>
        <div className="flex items-center px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/50">
          <span className="text-xs text-indigo-300">Real-time</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={data.length * 40 + 100}>
        <BarChart
          data={processedData}
          layout="vertical"
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 15,
          }}
          barCategoryGap={12}
        >
          <defs>
            {processedData.map((item, index) => (
              <linearGradient 
                key={`gradient-${index}`}
                id={`gradient-${index}`}
                x1="0" 
                y1="0" 
                x2="1" 
                y2="0"
              >
                <stop offset="0%" stopColor={item.color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={item.color} stopOpacity={0.4} />
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            horizontal={true} 
            vertical={false} 
            stroke="#334155" 
            opacity={0.3}
          />
          
          <XAxis 
            type="number" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          
          <YAxis 
            type="category"
            dataKey="displayCategory" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#e2e8f0', fontSize: 12 }}
            width={140}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          
          <Bar 
            dataKey="count" 
            radius={[0, 6, 6, 0]}
            animationDuration={1800}
          >
            {processedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`}
                stroke={entry.color}
                strokeWidth={1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-gray-500 text-right">
        Showing {data.length} of {data.length} categories • Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </div>
    </div>
  );
};

export default CategoryChart;