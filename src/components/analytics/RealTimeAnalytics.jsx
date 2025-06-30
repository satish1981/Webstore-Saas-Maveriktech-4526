import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiActivity, FiEye, FiUsers, FiShoppingCart, FiMapPin, FiClock } = FiIcons;

const RealTimeAnalytics = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [realtimeData, setRealtimeData] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate real-time data updates
      setRealtimeData(prev => {
        const newData = {
          time: new Date().toLocaleTimeString(),
          visitors: Math.floor(Math.random() * 50) + 20,
          pageviews: Math.floor(Math.random() * 100) + 50
        };
        
        const updated = [...prev, newData].slice(-20); // Keep last 20 data points
        return updated;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const realtimeStats = [
    {
      title: 'Active Users',
      value: '247',
      icon: FiUsers,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      title: 'Page Views',
      value: '1,432',
      icon: FiEye,
      color: 'text-success-600',
      bgColor: 'bg-success-100'
    },
    {
      title: 'Active Sessions',
      value: '189',
      icon: FiActivity,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100'
    },
    {
      title: 'Cart Additions',
      value: '23',
      icon: FiShoppingCart,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100'
    }
  ];

  const recentActivity = [
    {
      type: 'purchase',
      user: 'John Smith',
      action: 'purchased Premium Course Bundle',
      location: 'New York, US',
      time: '2 minutes ago',
      value: '$199'
    },
    {
      type: 'signup',
      user: 'Sarah Johnson',
      action: 'signed up for newsletter',
      location: 'Toronto, CA',
      time: '5 minutes ago',
      value: null
    },
    {
      type: 'view',
      user: 'Mike Davis',
      action: 'viewed Digital Marketing Guide',
      location: 'London, UK',
      time: '8 minutes ago',
      value: null
    },
    {
      type: 'cart',
      user: 'Emily Wilson',
      action: 'added Design Templates to cart',
      location: 'Sydney, AU',
      time: '12 minutes ago',
      value: '$29'
    },
    {
      type: 'purchase',
      user: 'David Brown',
      action: 'purchased SEO Toolkit',
      location: 'Berlin, DE',
      time: '15 minutes ago',
      value: '$79'
    }
  ];

  const topPages = [
    { page: '/products/premium-course', visitors: 89, percentage: 18 },
    { page: '/products/marketing-guide', visitors: 67, percentage: 14 },
    { page: '/', visitors: 156, percentage: 32 },
    { page: '/products/design-templates', visitors: 43, percentage: 9 },
    { page: '/checkout', visitors: 34, percentage: 7 }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'purchase': return FiShoppingCart;
      case 'signup': return FiUsers;
      case 'view': return FiEye;
      case 'cart': return FiShoppingCart;
      default: return FiActivity;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'purchase': return 'text-success-600 bg-success-100';
      case 'signup': return 'text-primary-600 bg-primary-100';
      case 'view': return 'text-gray-600 bg-gray-100';
      case 'cart': return 'text-warning-600 bg-warning-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Status */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Real-Time Overview</h3>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-600">
                Live data • Last updated {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiActivity} className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-600">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {realtimeStats.map((stat, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor} mr-3`}>
                  <SafeIcon icon={stat.icon} className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Traffic</h3>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realtimeData}>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Active Visitors</span>
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages (Right Now)</h3>
          
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {page.page}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-primary-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {page.visitors}
                  </p>
                  <p className="text-xs text-gray-500">
                    {page.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                <SafeIcon icon={getActivityIcon(activity.type)} className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <SafeIcon icon={FiMapPin} className="h-3 w-3 mr-1" />
                    {activity.location}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <SafeIcon icon={FiClock} className="h-3 w-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              </div>
              
              {activity.value && (
                <div className="text-right">
                  <p className="text-sm font-semibold text-success-600">
                    {activity.value}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeAnalytics;