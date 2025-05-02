import { useState } from 'react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [navItems, setNavItems] = useState([
    { name: 'Dashboard', icon: 'chart-pie', active: true },
    { name: 'Alerts', icon: 'bell', active: false, badge: '3' },
    { name: 'Analytics', icon: 'chart-bar', active: false },
    { name: 'Reports', icon: 'document', active: false },
    { name: 'Settings', icon: 'cog', active: false },
  ]);

  const handleItemClick = (clickedItem) => {
    setNavItems(
      navItems.map((item) => ({
        ...item,
        active: item.name === clickedItem.name,
      }))
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-gray-900/90 backdrop-blur-2xl"></div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 bottom-0 w-72 z-50 transition-all duration-500 ease-in-out lg:top-16 lg:translate-x-0 ${
          sidebarOpen
            ? 'top-0 translate-x-0'
            : 'top-0 -translate-x-full lg:top-16'
        }`}
        style={{
          background: `
            linear-gradient(195deg, rgba(21,16,32,0.98) 0%, rgba(35,20,45,0.98) 100%)
          `,
          borderRight: '1px solid rgba(192, 132, 252, 0.1)',
          boxShadow: '5px 0 15px rgba(0,0,0,0.3)'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Close button for mobile view */}
          <div className="flex justify-end p-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-purple-300 hover:text-pink-400 focus:outline-none transition-all duration-300 p-1 rounded-full hover:bg-purple-900/30"
              aria-label="Close sidebar"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Logo/Branding */}
          <div className="px-6 py-4 mb-2 hidden lg:block">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="url(#logoGradient)"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="url(#logoGradient)"
                  />
                  <defs>
                    <linearGradient
                      id="logoGradient"
                      x1="2"
                      y1="2"
                      x2="22"
                      y2="22"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FFFFFF" />
                      <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                SecureView
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </nav>

          {/* Footer */}
          <div className="px-4 py-6 mt-auto">
            <div 
              className="p-4 rounded-xl transition-all duration-500 hover:shadow-lg"
              style={{
                background: 'rgba(109, 40, 217, 0.15)',
                border: '1px solid rgba(192, 132, 252, 0.2)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <div className="flex items-start">
                <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    Need help?
                  </p>
                  <p className="text-xs text-purple-200/70 mt-1">
                    Check our documentation
                  </p>
                  <button 
                    className="mt-2 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-300 hover:shadow-md"
                    style={{
                      background: 'rgba(192, 132, 252, 0.2)',
                      border: '1px solid rgba(192, 132, 252, 0.3)',
                      color: '#e9d5ff'
                    }}
                  >
                    View Docs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ item, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center px-4 py-3 cursor-pointer text-sm rounded-xl transition-all duration-300 ${
        item.active
          ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/20 text-white shadow-lg'
          : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/10'
      }`}
      style={{
        borderLeft: item.active ? '4px solid #c084fc' : '4px solid transparent',
        margin: '4px 0'
      }}
    >
      <div
        className={`mr-3 h-5 w-5 transition-colors duration-300 ${
          item.active
            ? 'text-purple-400'
            : 'text-gray-500 group-hover:text-purple-300'
        }`}
      >
        {renderIcon(item.icon)}
      </div>
      <span className={`${item.active ? 'font-semibold' : 'font-medium'}`}>
        {item.name}
      </span>
      {item.badge && (
        <span 
          className="ml-auto px-2 py-0.5 text-xs rounded-full transition-all duration-300"
          style={{
            background: 'rgba(236, 72, 153, 0.2)',
            color: '#f472b6'
          }}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
};

function renderIcon(icon) {
  const iconClass = 'h-5 w-5';

  switch (icon) {
    case 'chart-pie':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
      );
    case 'bell':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      );
    case 'chart-bar':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      );
    case 'document':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    case 'cog':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      );
  }
}

export default Sidebar;