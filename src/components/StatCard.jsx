const StatCard = ({ title, value, icon, trend, trendValue, trendUp }) => {
  // Luxury purple/gold color scheme
  const trendColor = trendUp ? 'text-amber-300' : 'text-purple-300';
  const trendBg = trendUp ? 'bg-amber-500/10' : 'bg-purple-500/10';
  const accentColor = trendUp ? 'from-amber-500/15 to-amber-700/10' : 'from-purple-500/15 to-violet-700/10';
  const progressColor = trendUp ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-purple-400 to-violet-500';

  return (
    <div className={`relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] group 
      bg-gradient-to-br from-gray-900 to-gray-800/90 border border-gray-700/30 hover:border-gray-600/50
      shadow-lg hover:shadow-xl`}>
      
      {/* Animated metallic gradient overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
        bg-gradient-to-br ${accentColor}`}></div>
      
      {/* Floating metallic accent */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${trendUp ? 'bg-amber-500/5' : 'bg-purple-500/5'} 
        group-hover:opacity-50 transition-opacity duration-300`}></div>
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs font-medium text-gray-400/90 tracking-wider uppercase">{title}</span>
          <div className={`p-2.5 rounded-lg ${trendBg} text-gray-200 backdrop-blur-sm 
            border ${trendUp ? 'border-amber-500/20' : 'border-purple-500/20'}`}>
            {icon}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div className="text-3xl font-bold text-white mb-2">{value}</div>
          
          <div className="mt-4 space-y-2">
            <div className={`flex items-center text-sm font-medium ${trendColor}`}>
              <span>{trendValue || trend}</span>
              <svg 
                className={`w-4 h-4 ml-1 ${!trendUp && 'transform rotate-180'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            
            {/* Metallic progress bar */}
            <div className="w-full h-1.5 bg-gray-800/70 rounded-full overflow-hidden">
              <div 
                className={`h-full ${progressColor} rounded-full transition-all duration-700 ease-out
                  shadow-sm ${trendUp ? 'shadow-amber-500/20' : 'shadow-purple-500/20'}`}
                style={{ width: trendUp ? '72%' : '38%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom corner metallic accent */}
      <div className={`absolute bottom-0 right-0 w-16 h-16 -mr-6 -mb-6 rounded-full 
        ${trendUp ? 'bg-amber-500/5' : 'bg-purple-500/5'}`}></div>
      
      {/* Subtle border glow on hover */}
      <div className={`absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 border ${trendUp ? 'border-amber-500/10' : 'border-purple-500/10'}`}></div>
    </div>
  );
};

export default StatCard;