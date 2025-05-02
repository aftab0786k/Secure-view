import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ActionChart = ({ data }) => {
  const RADIAN = Math.PI / 180;
  
  // Enhanced color palette with gradients
  const colorPalette = [
    { name: 'Blocked', start: '#FF5C8D', end: '#FF2D6F' },
    { name: 'Allowed', start: '#4CCD99', end: '#2DCC70' },
    { name: 'Monitored', start: '#3B82F6', end: '#2563EB' },
    { name: 'Quarantined', start: '#F59E0B', end: '#D97706' }
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
        className="text-xs font-bold drop-shadow-md"
        style={{ 
          fontSize: '0.75rem',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-gray-800/90 border border-gray-700 rounded-xl shadow-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ 
                background: `linear-gradient(135deg, ${
                  colorPalette.find(c => c.name === payload[0].name)?.start || '#8884d8'
                }, ${
                  colorPalette.find(c => c.name === payload[0].name)?.end || '#8884d8'
                })`
              }}
            ></div>
            <p className="text-sm font-medium text-white">{payload[0].name}</p>
          </div>
          <p className="text-xl font-bold text-white">
            {payload[0].value.toLocaleString()}
            <span className="text-xs text-gray-400 ml-1">alerts</span>
          </p>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          <p className="text-xs text-gray-300 mt-2">
            {percentage}% of total actions
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
              Security Actions
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">Distribution by response type</p>
        </div>
        <div className="flex items-center px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/50">
          <span className="text-xs text-indigo-300">Live</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <defs>
            {colorPalette.map((color, index) => (
              <linearGradient 
                key={`gradient-${index}`} 
                id={`gradient-${index}`} 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="1"
              >
                <stop offset="0%" stopColor={color.start} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color.end} stopOpacity={0.7} />
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
            animationDuration={1800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => {
              const color = colorPalette.find(c => c.name === entry.name) || colorPalette[index % colorPalette.length];
              return (
                <Cell 
                  key={`cell-${index}`}
                  fill={`url(#gradient-${colorPalette.findIndex(c => c.name === color.name)})`}
                  stroke="#1E293B"
                  strokeWidth={2}
                />
              );
            })}
          </Pie>
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: '#334155', strokeWidth: 1 }}
          />
          
          <Legend 
            layout="horizontal"
            verticalAlign="bottom"
            height={60}
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value, entry, index) => {
              const color = colorPalette.find(c => c.name === value) || colorPalette[index % colorPalette.length];
              return (
                <span className="inline-flex items-center text-xs text-gray-300">
                  <span 
                    className="inline-block w-2 h-2 rounded-full mr-2" 
                    style={{ 
                      background: `linear-gradient(135deg, ${color.start}, ${color.end})`
                    }}
                  ></span>
                  {value}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {data.length} action types
        </div>
        <div className="text-xs text-gray-500">
          Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
};

export default ActionChart;