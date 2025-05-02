import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const SeverityChart = ({ data }) => {
  const RADIAN = Math.PI / 180;
  
  // Enhanced color palette
  const colors = [
    '#FF5C8D', // High severity (vibrant pink)
    '#FF9F45', // Medium severity (orange)
    '#4CCD99', // Low severity (teal)
    '#7B66FF', // Info severity (purple-blue)
  ];

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        className="text-xs font-semibold drop-shadow-md"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = data.reduce((a, b) => a + b.value, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-gray-800/90 border border-gray-700 rounded-lg shadow-xl p-4 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: payload[0].payload.fill }}
            ></div>
            <p className="text-sm font-medium text-white">{payload[0].name}</p>
          </div>
          <p className="text-lg font-semibold text-indigo-300">
            {payload[0].value} <span className="text-xs text-gray-400">alerts</span>
          </p>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          <p className="text-xs text-gray-400 mt-2">
            {percentage}% of total
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
              Threat Severity
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">Distribution by alert level</p>
        </div>
        <div className="flex items-center px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/50">
          <span className="text-xs text-indigo-300">Real-time</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <defs>
            {data.map((entry, index) => (
              <linearGradient 
                key={`gradient-${index}`} 
                id={`gradient-${index}`} 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="1"
              >
                <stop offset="0%" stopColor={colors[index]} stopOpacity={0.9} />
                <stop offset="100%" stopColor={colors[index]} stopOpacity={0.6} />
              </linearGradient>
            ))}
          </defs>
          
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={90}
            innerRadius={50}
            paddingAngle={2}
            dataKey="value"
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#gradient-${index})`} 
                stroke="#1E293B"
                strokeWidth={2}
              />
            ))}
          </Pie>
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: '#334155', strokeWidth: 1 }}
          />
          
          <Legend 
            layout="horizontal"
            verticalAlign="bottom"
            height={50}
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value, entry, index) => (
              <span className="inline-flex items-center text-xs text-gray-300">
                <span 
                  className="inline-block w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: colors[index] }}
                ></span>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-gray-500 text-right">
        Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </div>
    </div>
  );
};

export default SeverityChart;