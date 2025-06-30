import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiGlobe, FiSearch, FiShare2, FiMail, FiExternalLink } = FiIcons;

const TrafficSources = () => {
  const data = [
    { name: 'Organic Search', value: 45, color: '#3b82f6', icon: FiSearch },
    { name: 'Direct', value: 25, color: '#10b981', icon: FiGlobe },
    { name: 'Social Media', value: 20, color: '#8b5cf6', icon: FiShare2 },
    { name: 'Email', value: 7, color: '#f59e0b', icon: FiMail },
    { name: 'Referral', value: 3, color: '#ef4444', icon: FiExternalLink }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.color }}>
            {payload[0].value}% of traffic
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
        <p className="text-sm text-gray-600">Where your visitors are coming from</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {data.map((source, index) => (
            <div key={source.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-lg" 
                  style={{ backgroundColor: `${source.color}20` }}
                >
                  <SafeIcon 
                    icon={source.icon} 
                    className="h-4 w-4" 
                    style={{ color: source.color }} 
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {source.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  {source.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">12,450</p>
          <p className="text-sm text-gray-600">Total Sessions</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">8,920</p>
          <p className="text-sm text-gray-600">Unique Visitors</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">2:45</p>
          <p className="text-sm text-gray-600">Avg. Session</p>
        </div>
      </div>
    </div>
  );
};

export default TrafficSources;