import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCalendar } = FiIcons;

const RevenueChart = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('line');

  const data = {
    '7d': [
      { name: 'Mon', revenue: 2400, orders: 24 },
      { name: 'Tue', revenue: 1398, orders: 18 },
      { name: 'Wed', revenue: 9800, orders: 45 },
      { name: 'Thu', revenue: 3908, orders: 32 },
      { name: 'Fri', revenue: 4800, orders: 38 },
      { name: 'Sat', revenue: 3800, orders: 28 },
      { name: 'Sun', revenue: 4300, orders: 35 }
    ],
    '30d': [
      { name: 'Week 1', revenue: 24000, orders: 240 },
      { name: 'Week 2', revenue: 13980, orders: 180 },
      { name: 'Week 3', revenue: 98000, orders: 450 },
      { name: 'Week 4', revenue: 39080, orders: 320 }
    ],
    '90d': [
      { name: 'Month 1', revenue: 124000, orders: 1240 },
      { name: 'Month 2', revenue: 139800, orders: 1800 },
      { name: 'Month 3', revenue: 198000, orders: 2450 }
    ]
  };

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const chartData = data[timeRange];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-primary-600">
            Revenue: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-secondary-600">
            Orders: {payload[1]?.value || 0}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
          <p className="text-sm text-gray-600">Track your revenue performance over time</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                chartType === 'line' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                chartType === 'area' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Area
            </button>
          </div>
          
          <div className="relative">
            <SafeIcon 
              icon={FiCalendar} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
            />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Revenue</span>
        </div>
        {chartType === 'line' && (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-secondary-600 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Orders</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;