import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Header - fixed at top */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main container for sidebar and content */}
      <div className="flex flex-1">
        {/* Sidebar - fixed position */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content - scrollable */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 pt-16 ${
            sidebarOpen ? 'ml-0 lg:ml-72' : 'ml-0 lg:ml-72'
          }`}
        >
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <Dashboard />
            </div>
          </div>
        </main>
      </div>

      {/* Portal container for modals - outside the main layout flow */}
      <div id="modal-root"></div>
    </div>
  );
}

export default App;