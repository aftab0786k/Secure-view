import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const SeverityChart = ({ data }) => {
  const RADIAN = Math.PI / 180;
  
  // Premium gradient color palette with glow effects
  const colorPalette = [
    { 
      name: 'High', 
      start: '#FF3860', 
      end: '#FF144D',
      shadow: 'rgba(255, 56, 96, 0.5)'
    },
    { 
      name: 'Medium', 
      start: '#FF9F1C', 
      end: '#FF8C00',
      shadow: 'rgba(255, 159, 28, 0.5)'
    },
    { 
      name: 'Low', 
      start: '#2EC4B6', 
      end: '#20A39E',
      shadow: 'rgba(46, 196, 182, 0.5)'
    },
    { 
      name: 'Info', 
      start: '#7B66FF', 
      end: '#5E4AE3',
      shadow: 'rgba(123, 102, 255, 0.5)'
    }
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
        className="text-xs font-bold"
        style={{
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
          filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.5))'
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = data.reduce((a, b) => a + b.value, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      const color = colorPalette.find(c => c.name === payload[0].name);
      
      return (
        <div className="bg-gray-900/95 border border-gray-700 rounded-xl shadow-2xl p-4 backdrop-blur-md">
          <div className="flex items-center mb-2">
            <div 
              className="w-3 h-3 rounded-full mr-2 shadow-sm"
              style={{ 
                background: `linear-gradient(135deg, ${color?.start}, ${color?.end})`,
                boxShadow: `0 0 6px ${color?.shadow}`
              }}
            ></div>
            <p className="text-sm font-medium text-white">{payload[0].name}</p>
          </div>
          <p className="text-xl font-bold text-white">
            {payload[0].value.toLocaleString()}
            <span className="text-xs text-gray-400 ml-1">alerts</span>
          </p>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <p className="text-xs text-gray-300 mt-2">
            {percentage}% of total threats
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
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-semibold text-white">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Threat Severity
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">Distribution by alert level</p>
        </div>
        <div className="flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></div>
          <span className="text-xs text-blue-300">Real-time</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300} className="relative z-10">
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
                <stop offset="100%" stopColor={color.end} stopOpacity={0.8} />
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
            {data.map((entry, index) => {
              const color = colorPalette.find(c => c.name === entry.name) || colorPalette[index % colorPalette.length];
              return (
                <Cell 
                  key={`cell-${index}`}
                  fill={`url(#gradient-${colorPalette.findIndex(c => c.name === color.name)})`}
                  stroke="#111827"
                  strokeWidth={1.5}
                />
              );
            })}
          </Pie>
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: '#1F2937', strokeWidth: 1 }}
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
                    className="inline-block w-2.5 h-2.5 rounded-full mr-2 shadow-sm"
                    style={{ 
                      background: `linear-gradient(135deg, ${color.start}, ${color.end})`,
                      boxShadow: `0 0 6px ${color.shadow}`
                    }}
                  ></span>
                  {value}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-between items-center relative z-10">
        <div className="text-xs text-gray-500">
          {data.length} severity levels
        </div>
        <div className="text-xs text-gray-500">
          Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
};

export default SeverityChart;