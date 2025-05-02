// Sample security alert data
// export const securityAlerts = [
//   {
//     timestamp: "2019-01-02T03:50:09.097718",
//     flow_id: 52373568,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "8.42.77.171",
//     src_port: 65036,
//     dest_ip: "138.68.3.71",
//     dest_port: 3306,
//     proto: "TCP",
//     alert: {
//       action: "allowed",
//       gid: 1,
//       signature_id: 2010937,
//       rev: 3,
//       signature: "ET SCAN Suspicious inbound to mySQL port 3306",
//       category: "Potentially Bad Traffic",
//       severity: 2
//     }
//   },
//   {
//     timestamp: "2019-01-02T03:50:10.386108",
//     flow_id: 52491840,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "8.42.77.171",
//     src_port: 65386,
//     dest_ip: "138.68.3.71",
//     dest_port: 5915,
//     proto: "TCP",
//     alert: {
//       action: "allowed",
//       gid: 1,
//       signature_id: 2002911,
//       rev: 5,
//       signature: "ET SCAN Potential VNC Scan 5900-5920",
//       category: "Attempted Information Leak",
//       severity: 2
//     }
//   },
//   // Additional generated data for visualization purposes
//   {
//     timestamp: "2019-01-02T04:15:22.186108",
//     flow_id: 52491841,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "103.45.88.12",
//     src_port: 45221,
//     dest_ip: "138.68.3.71",
//     dest_port: 22,
//     proto: "TCP",
//     alert: {
//       action: "blocked",
//       gid: 1,
//       signature_id: 2001219,
//       rev: 4,
//       signature: "ET SCAN SSH Scan",
//       category: "Attempted Administrator Privilege Gain",
//       severity: 3
//     }
//   },
//   {
//     timestamp: "2019-01-02T05:22:14.332108",
//     flow_id: 52491842,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "45.12.89.76",
//     src_port: 53124,
//     dest_ip: "138.68.3.71",
//     dest_port: 80,
//     proto: "TCP",
//     alert: {
//       action: "allowed",
//       gid: 1,
//       signature_id: 2010935,
//       rev: 2,
//       signature: "ET SCAN Suspicious HTTP Traffic",
//       category: "Web Application Attack",
//       severity: 2
//     }
//   },
//   {
//     timestamp: "2019-01-02T06:10:44.120108",
//     flow_id: 52491843,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "192.168.33.12",
//     src_port: 58912,
//     dest_ip: "138.68.3.71",
//     dest_port: 443,
//     proto: "TCP",
//     alert: {
//       action: "allowed",
//       gid: 1,
//       signature_id: 2012887,
//       rev: 1,
//       signature: "ET POLICY TLS Self Signed Certificate",
//       category: "Potentially Bad Traffic",
//       severity: 1
//     }
//   },
//   {
//     timestamp: "2019-01-02T07:05:30.981108",
//     flow_id: 52491844,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "78.45.22.90",
//     src_port: 62145,
//     dest_ip: "138.68.3.71",
//     dest_port: 1433,
//     proto: "TCP",
//     alert: {
//       action: "blocked",
//       gid: 1,
//       signature_id: 2010936,
//       rev: 3,
//       signature: "ET SCAN Suspicious inbound to MSSQL port 1433",
//       category: "Potentially Bad Traffic",
//       severity: 3
//     }
//   },
//   {
//     timestamp: "2019-01-02T08:15:02.437108",
//     flow_id: 52491845,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "92.36.148.75",
//     src_port: 35794,
//     dest_ip: "138.68.3.71",
//     dest_port: 21,
//     proto: "TCP",
//     alert: {
//       action: "blocked",
//       gid: 1,
//       signature_id: 2010949,
//       rev: 2,
//       signature: "ET SCAN Suspicious FTP Traffic",
//       category: "Attempted Information Leak",
//       severity: 3
//     }
//   },
//   {
//     timestamp: "2019-01-02T09:22:11.264108",
//     flow_id: 52491846,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "115.87.44.23",
//     src_port: 37564,
//     dest_ip: "138.68.3.71",
//     dest_port: 8080,
//     proto: "TCP",
//     alert: {
//       action: "allowed",
//       gid: 1,
//       signature_id: 2011934,
//       rev: 5,
//       signature: "ET SCAN Proxy Attempt",
//       category: "Potentially Bad Traffic",
//       severity: 2
//     }
//   },
//   {
//     timestamp: "2019-01-02T10:45:19.756108",
//     flow_id: 52491847,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "188.24.75.56",
//     src_port: 48921,
//     dest_ip: "138.68.3.71",
//     dest_port: 23,
//     proto: "TCP",
//     alert: {
//       action: "blocked",
//       gid: 1,
//       signature_id: 2008457,
//       rev: 3,
//       signature: "ET SCAN Telnet Scan",
//       category: "Attempted Administrator Privilege Gain",
//       severity: 3
//     }
//   },
//   {
//     timestamp: "2019-01-02T11:30:07.422108",
//     flow_id: 52491848,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "44.56.78.91",
//     src_port: 50234,
//     dest_ip: "138.68.3.71",
//     dest_port: 25,
//     proto: "TCP",
//     alert: {
//       action: "blocked",
//       gid: 1,
//       signature_id: 2010945,
//       rev: 4,
//       signature: "ET SCAN SMTP Incoming Scan",
//       category: "Attempted Information Leak",
//       severity: 2
//     }
//   },
//   {
//     timestamp: "2019-01-02T12:10:33.865108",
//     flow_id: 52491849,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "172.16.45.88",
//     src_port: 62123,
//     dest_ip: "138.68.3.71",
//     dest_port: 3389,
//     proto: "TCP",
//     alert: {
//       action: "allowed",
//       gid: 1,
//       signature_id: 2010941,
//       rev: 2,
//       signature: "ET SCAN RDP Scan",
//       category: "Attempted Administrator Privilege Gain",
//       severity: 2
//     }
//   },
//   {
//     timestamp: "2019-01-02T13:25:44.977108",
//     flow_id: 52491850,
//     in_iface: "eth0",
//     event_type: "alert",
//     src_ip: "205.67.88.193",
//     src_port: 41235,
//     dest_ip: "138.68.3.71",
//     dest_port: 445,
//     proto: "TCP",
//     alert: {
//       action: "blocked",
//       gid: 1,
//       signature_id: 2010942,
//       rev: 1,
//       signature: "ET SCAN SMB Scan",
//       category: "Attempted Administrator Privilege Gain",
//       severity: 3
//     }
//   }
// ];

import eveData from './eve.json';
export const securityAlerts = eveData.filter(event => event.event_type === 'alert');


// Utility to generate statistics from the data
export const getStatistics = () => {
  const stats = {
    totalAlerts: securityAlerts.length,
    blockedAlerts: securityAlerts.filter(alert => alert.alert.action === "blocked").length,
    allowedAlerts: securityAlerts.filter(alert => alert.alert.action === "allowed").length,
    highSeverity: securityAlerts.filter(alert => alert.alert.severity === 3).length,
    mediumSeverity: securityAlerts.filter(alert => alert.alert.severity === 2).length,
    lowSeverity: securityAlerts.filter(alert => alert.alert.severity === 1).length,
    topPorts: {},
    topProtocols: {},
    categoryCounts: {},
    hourlyDistribution: Array(24).fill(0),
  };
  
  // Calculate port, protocol and category statistics
  securityAlerts.forEach(alert => {
    // Count ports
    const port = alert.dest_port;
    stats.topPorts[port] = (stats.topPorts[port] || 0) + 1;
    
    // Count protocols
    const proto = alert.proto;
    stats.topProtocols[proto] = (stats.topProtocols[proto] || 0) + 1;
    
    // Count categories
    const category = alert.alert.category;
    stats.categoryCounts[category] = (stats.categoryCounts[category] || 0) + 1;
    
    // Count hourly distribution
    const hour = new Date(alert.timestamp).getHours();
    stats.hourlyDistribution[hour]++;
  });
  
  return stats;
};

// Process data for various chart types
export const processChartData = () => {
  const stats = getStatistics();
  
  // For severity distribution pie chart
  const severityData = [
    { name: 'High', value: stats.highSeverity, color: '#EF4444' },
    { name: 'Medium', value: stats.mediumSeverity, color: '#F59E0B' },
    { name: 'Low', value: stats.lowSeverity, color: '#10B981' },
  ];
  
  // For action distribution pie chart
  const actionData = [
    { name: 'Blocked', value: stats.blockedAlerts, color: '#EF4444' },
    { name: 'Allowed', value: stats.allowedAlerts, color: '#10B981' },
  ];
  
  // For top ports bar chart
  const topPortsData = Object.entries(stats.topPorts)
    .map(([port, count]) => ({ port: `Port ${port}`, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // For category distribution
  const categoryData = Object.entries(stats.categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
  
  // For hourly activity line chart
  const hourlyData = stats.hourlyDistribution.map((count, hour) => ({
    hour: `${hour}:00`,
    count,
  }));
  
  return {
    severityData,
    actionData,
    topPortsData,
    categoryData,
    hourlyData,
  };
};
