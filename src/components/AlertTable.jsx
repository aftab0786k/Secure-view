import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronLeft, FiChevronRight, FiX, FiAlertTriangle, FiShield, FiClock, FiGlobe, FiLayers } from 'react-icons/fi';
import { securityAlerts } from '../data/securityData';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const getSeverityClass = (severity) => {
  switch (severity) {
    case 3: return 'bg-gradient-to-br from-red-900/30 via-red-800/20 to-red-900/30 text-red-300 border-red-700/50';
    case 2: return 'bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-amber-900/30 text-amber-300 border-amber-700/50';
    case 1: return 'bg-gradient-to-br from-emerald-900/30 via-emerald-800/20 to-emerald-900/30 text-emerald-300 border-emerald-700/50';
    default: return 'bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-blue-900/30 text-blue-300 border-blue-700/50';
  }
};

const getActionClass = (action) => {
  return action === 'blocked' 
    ? 'bg-gradient-to-br from-red-900/30 via-red-800/20 to-red-900/30 text-red-300 border-red-700/50'
    : 'bg-gradient-to-br from-green-900/30 via-green-800/20 to-green-900/30 text-green-300 border-green-700/50';
};

const AlertTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const pageSize = 5;
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  const displayedAlerts = securityAlerts.slice(
    (currentPage - 1) * pageSize, 
    currentPage * pageSize
  );
  
  const totalPages = Math.ceil(securityAlerts.length / pageSize);
  
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  
  const handleAlertClick = (alert) => setSelectedAlert(alert);
  const handleCloseDetails = () => setSelectedAlert(null);

  const Modal = () => {
    if (!selectedAlert) return null;

    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200"
          onClick={handleCloseDetails}
        />
        
        {/* Modal Container */}
        <div className={`
          relative w-full max-w-2xl max-h-[85vh] overflow-hidden
          bg-gray-900 border border-gray-600 rounded-lg shadow-xl
          transform transition-all duration-200
          ${isMobile ? 'mx-4 my-6' : ''}
        `}>
          {/* Modal Header */}
          <div className="p-4 border-b border-gray-700 bg-gray-800 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <FiAlertTriangle className="mr-2 text-yellow-400" />
              Alert Details
            </h3>
            <button 
              onClick={handleCloseDetails}
              className="p-1 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-gray-400 text-sm">
                  <FiClock className="mr-2" />
                  <span>Timestamp</span>
                </div>
                <div className="text-gray-200 pl-6 text-sm">
                  {formatDate(selectedAlert.timestamp)}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center text-gray-400 text-sm">
                  <FiGlobe className="mr-2" />
                  <span>Protocol</span>
                </div>
                <div className="text-gray-200 pl-6 text-sm">
                  {selectedAlert.proto}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center text-gray-400 text-sm">
                  <FiLayers className="mr-2" />
                  <span>Source</span>
                </div>
                <div className="text-blue-300 font-mono pl-6 text-sm">
                  {selectedAlert.src_ip}:{selectedAlert.src_port}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center text-gray-400 text-sm">
                  <FiLayers className="mr-2" />
                  <span>Destination</span>
                </div>
                <div className="text-purple-300 font-mono pl-6 text-sm">
                  {selectedAlert.dest_ip}:{selectedAlert.dest_port}
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-1">
              <div className="flex items-center text-gray-400 text-sm">
                <FiAlertTriangle className="mr-2" />
                <span>Alert Signature</span>
              </div>
              <div className="text-gray-200 pl-6 text-sm">
                {selectedAlert.alert.signature}
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-gray-400 text-sm">
                  <FiShield className="mr-2" />
                  <span>Severity</span>
                </div>
                <div className="pl-6">
                  <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full border ${getSeverityClass(selectedAlert.alert.severity)}`}>
                    {selectedAlert.alert.severity === 3 ? 'High' : selectedAlert.alert.severity === 2 ? 'Medium' : 'Low'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center text-gray-400 text-sm">
                  <FiShield className="mr-2" />
                  <span>Action</span>
                </div>
                <div className="pl-6">
                  <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full border ${getActionClass(selectedAlert.alert.action)}`}>
                    {selectedAlert.alert.action}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <button 
              onClick={handleCloseDetails}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Custom Scroll Container */}
      <div className="flex-1 overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
        {/* Table Container with Custom Scrollbar */}
        <div className="h-full overflow-y-auto custom-scroll">
          <table className="w-full divide-y divide-gray-700/50">
            <thead className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-sm">
              <tr>
                {['Timestamp', 'Source IP', 'Destination', 'Alert', 'Severity', 'Action'].map((header) => (
                  <th 
                    key={header}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {displayedAlerts.map((alert, index) => (
                <tr 
                  key={index}
                  onClick={() => handleAlertClick(alert)}
                  className="hover:bg-gray-800/20 cursor-pointer transition-all duration-150 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiClock className="mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {formatDate(alert.timestamp)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                    <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                      {alert.src_ip}:{alert.src_port}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                    <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                      {alert.dest_ip}:{alert.dest_port}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-300 truncate group-hover:text-white transition-colors">
                      {alert.alert.signature}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getSeverityClass(alert.alert.severity)} transition-all`}>
                      {alert.alert.severity === 3 ? 'High' : alert.alert.severity === 2 ? 'Medium' : 'Low'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getActionClass(alert.alert.action)} transition-all`}>
                      {alert.alert.action}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="mt-4 px-4 py-3 rounded-xl border border-gray-700/50 bg-gray-900/50 flex items-center justify-between backdrop-blur-sm">
        <div className="text-sm text-gray-400">
          Showing <span className="font-medium text-gray-300">{(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, securityAlerts.length)}</span> of <span className="font-medium text-gray-300">{securityAlerts.length}</span> alerts
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-all ${
              currentPage === 1 
                ? 'bg-gray-800/30 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-900/40 to-blue-800/40 text-blue-300 hover:from-blue-800/50 hover:to-blue-700/50 shadow-md'
            }`}
          >
            <FiChevronLeft className="mr-1" /> Previous
          </button>
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-all ${
              currentPage === totalPages 
                ? 'bg-gray-800/30 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-900/40 to-blue-800/40 text-blue-300 hover:from-blue-800/50 hover:to-blue-700/50 shadow-md'
            }`}
          >
            Next <FiChevronRight className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* Render modal using portal */}
      {selectedAlert && createPortal(
        <Modal />,
        document.getElementById('modal-root')
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.5) rgba(17, 24, 39, 0.5);
        }
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.5);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(99, 102, 241, 0.5);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(99, 102, 241, 0.7);
        }
      `}</style>
    </div>
  );
};

export default AlertTable;