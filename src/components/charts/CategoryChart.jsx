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
  // Process data with truncated names and premium colors
  const processedData = data.map((item, index) => ({
    ...item,
    displayCategory: item.category.length > 20 
      ? `${item.category.substring(0, 18)}...` 
      : item.category,
    color: getCategoryColor(index, data.length)
  }));

  // Premium color generator with blue/emerald gradient
  function getCategoryColor(index, total) {
    const baseHue = 200; // Blue base
    const hueVariation = 60; // Range for color variation
    const hue = baseHue + (index * (hueVariation / total));
    return `hsl(${hue}, 80%, 65%)`;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const originalItem = data.find(item => 
        item.category === payload[0].payload.category
      );
      
      return (
        <div className="bg-gray-900/95 border border-gray-700 rounded-lg shadow-2xl p-4 backdrop-blur-md">
          <div className="flex items-center mb-2">
            <div 
              className="w-3 h-3 rounded-full mr-2 shadow-sm"
              style={{ 
                background: `linear-gradient(135deg, ${payload[0].payload.color}, #10b981)`,
                boxShadow: `0 0 0 2px rgba(16, 185, 129, 0.3)`
              }}
            ></div>
            <p className="text-sm font-medium text-white">{originalItem.category}</p>
          </div>
          <p className="text-lg font-semibold bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
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
    <div className="bg-gradient-to-br from-gray-900 to-gray-800/90 border border-gray-700/30 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Threat Categories
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">Distribution by alert type</p>
        </div>
        <div className="flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-900/30 to-emerald-900/30 border border-cyan-700/30 shadow-sm">
          <span className="text-xs bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            Real-time
          </span>
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
                <stop offset="0%" stopColor={item.color} stopOpacity={0.9} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            horizontal={true} 
            vertical={false} 
            stroke="#334155" 
            opacity={0.2}
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
            cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }}
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
                stroke={`url(#gradient-${index})`}
                strokeWidth={0.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-gray-500 text-right">
        <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
          Showing {data.length} of {data.length} categories • Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </span>
      </div>
    </div>
  );
};

export default CategoryChart;