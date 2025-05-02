import { useState, useEffect } from 'react';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [date, setDate] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 px-4 py-3 md:py-4 transition-all duration-500 ${
        scrolled ? 'shadow-2xl bg-opacity-95 backdrop-blur-xl' : 'backdrop-blur-lg'
      }`}
      style={{
        background: scrolled
          ? 'linear-gradient(135deg, rgba(15,10,30,0.98) 0%, rgba(35,20,60,0.97) 100%)'
          : 'linear-gradient(135deg, #0f0a1e 0%, #23143c 100%)',
        borderBottom: scrolled 
          ? '1px solid rgba(158, 119, 237, 0.25)'
          : 'none',
        height: '76px',
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto h-full">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-purple-300 hover:text-purple-100 focus:outline-none transition-all duration-300 lg:hidden mr-3"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
              {!sidebarOpen && (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>

          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                <svg
                  className="h-9 w-9"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                      <stop stopColor="#9E77ED" />
                      <stop offset="0.5" stopColor="#7E5BEF" />
                      <stop offset="1" stopColor="#6C4AFF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent">
                  Secure-View
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <div className="hidden md:flex flex-col items-end">
            <div className="text-xs text-purple-200/80 font-medium tracking-wide">
              {formattedDate}
            </div>
            <div className="text-sm font-semibold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              {formattedTime}
            </div>
          </div>

          <div className="relative">
            <button className="flex items-center focus:outline-none group transform transition-all duration-300 hover:scale-[1.02]">
              <div className="h-9 w-9 rounded-full flex items-center justify-center relative overflow-hidden border border-purple-500/30 shadow-[0_0_10px_rgba(158,119,237,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-indigo-600/90 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-white font-medium text-sm relative z-10">
                  AM
                </span>
              </div>
              <span className="ml-3 text-sm font-medium hidden md:block text-purple-200 group-hover:text-white transition-colors duration-300">
                Aftab Miyan
                <span className="block text-xs font-normal text-purple-300/80 group-hover:text-purple-100 transition-colors duration-300">
                  Admin
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;