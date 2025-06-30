import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiGlobe, FiMapPin, FiUsers, FiDollarSign } = FiIcons;

const GeographicAnalytics = () => {
  const countryData = [
    { country: 'United States', users: 2847, revenue: 45230, flag: '🇺🇸' },
    { country: 'Canada', users: 1256, revenue: 18940, flag: '🇨🇦' },
    { country: 'United Kingdom', users: 987, revenue: 15680, flag: '🇬🇧' },
    { country: 'Australia', users: 743, revenue: 12450, flag: '🇦🇺' },
    { country: 'Germany', users: 654, revenue: 10890, flag: '🇩🇪' },
    { country: 'France', users: 521, revenue: 8760, flag: '🇫🇷' },
    { country: 'Netherlands', users: 432, revenue: 7230, flag: '🇳🇱' },
    { country: 'Sweden', users: 398, revenue: 6540, flag: '🇸🇪' }
  ];

  const cityData = [
    { city: 'New York', country: 'US', users: 1247, revenue: 18450 },
    { city: 'Los Angeles', country: 'US', users: 892, revenue: 14230 },
    { city: 'Toronto', country: 'CA', users: 567, revenue: 8940 },
    { city: 'London', country: 'UK', users: 489, revenue: 7680 },
    { city: 'Sydney', country: 'AU', users: 432, revenue: 6890 }
  ];

  const revenueByCountry = countryData.slice(0, 6).map(item => ({
    name: item.country.split(' ')[0], // Shortened name for chart
    revenue: item.revenue,
    users: item.users
  }));

  return (
    <div className="space-y-6">
      {/* Geographic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg mr-3">
              <SafeIcon icon={FiGlobe} className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Countries</p>
              <p className="text-lg font-bold text-gray-900">42</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-success-100 rounded-lg mr-3">
              <SafeIcon icon={FiMapPin} className="h-5 w-5 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Top City</p>
              <p className="text-lg font-bold text-gray-900">New York</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-secondary-100 rounded-lg mr-3">
              <SafeIcon icon={FiUsers} className="h-5 w-5 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">International Users</p>
              <p className="text-lg font-bold text-gray-900">38%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-warning-100 rounded-lg mr-3">
              <SafeIcon icon={FiDollarSign} className="h-5 w-5 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Global Revenue</p>
              <p className="text-lg font-bold text-gray-900">$126K</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Country Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Country</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByCountry}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value.toLocaleString()}` : value.toLocaleString(),
                    name === 'revenue' ? 'Revenue' : 'Users'
                  ]}
                />
                <Bar dataKey="revenue" fill="#3b82f6" name="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Cities</h3>
          
          <div className="space-y-4">
            {cityData.map((city, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <span className="text-lg">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{city.city}</h4>
                    <p className="text-xs text-gray-500">{city.country}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${city.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {city.users.toLocaleString()} users
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Country Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Country Performance</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Revenue per User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Share
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {countryData.map((country, index) => {
                const arpu = (country.revenue / country.users).toFixed(2);
                const totalRevenue = countryData.reduce((sum, c) => sum + c.revenue, 0);
                const share = ((country.revenue / totalRevenue) * 100).toFixed(1);
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{country.flag}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {country.country}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {country.users.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${country.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${arpu}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${share}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{share}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GeographicAnalytics;