import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPackage, FiTrendingUp, FiDollarSign, FiEye, FiShoppingCart, FiStar } = FiIcons;

const ProductAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const topProducts = [
    {
      name: 'Premium Course Bundle',
      revenue: 12450,
      sales: 245,
      views: 3200,
      conversionRate: 7.7,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=60&h=60&fit=crop'
    },
    {
      name: 'Digital Marketing Guide',
      revenue: 9870,
      sales: 189,
      views: 2800,
      conversionRate: 6.8,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=60&h=60&fit=crop'
    },
    {
      name: 'Design Templates Pack',
      revenue: 7320,
      sales: 156,
      views: 2400,
      conversionRate: 6.5,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=60&h=60&fit=crop'
    },
    {
      name: 'Business Consultation',
      revenue: 6700,
      sales: 134,
      views: 1900,
      conversionRate: 7.1,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop'
    },
    {
      name: 'SEO Toolkit',
      revenue: 4890,
      sales: 98,
      views: 1600,
      conversionRate: 6.1,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=60&h=60&fit=crop'
    }
  ];

  const productPerformance = [
    { month: 'Jan', revenue: 8400, units: 120 },
    { month: 'Feb', revenue: 9200, units: 135 },
    { month: 'Mar', revenue: 11800, units: 165 },
    { month: 'Apr', revenue: 13200, units: 180 },
    { month: 'May', revenue: 12600, units: 172 },
    { month: 'Jun', revenue: 14800, units: 195 }
  ];

  const categoryBreakdown = [
    { category: 'Courses', revenue: 28400, percentage: 42 },
    { category: 'Templates', revenue: 18200, percentage: 27 },
    { category: 'Consultations', revenue: 12800, percentage: 19 },
    { category: 'Tools', revenue: 8100, percentage: 12 }
  ];

  return (
    <div className="space-y-6">
      {/* Product Performance Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Product Performance</h3>
            <p className="text-sm text-gray-600">Revenue and units sold over time</p>
          </div>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
              <Line yAxisId="right" type="monotone" dataKey="units" stroke="#10b981" strokeWidth={3} name="Units Sold" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      {product.sales} sales
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.conversionRate}% conv.
                    </span>
                    <div className="flex items-center">
                      <SafeIcon icon={FiStar} className="h-3 w-3 text-yellow-400 mr-1" />
                      <span className="text-xs text-gray-500">{product.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Category</h3>
          
          <div className="space-y-4">
            {categoryBreakdown.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {category.category}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      ${category.revenue.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({category.percentage}%)
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-gray-900">
                  ${categoryBreakdown.reduce((sum, cat) => sum + cat.revenue, 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">Total Revenue</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {categoryBreakdown.length}
                </p>
                <p className="text-xs text-gray-600">Active Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg mr-3">
              <SafeIcon icon={FiPackage} className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-lg font-bold text-gray-900">48</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-success-100 rounded-lg mr-3">
              <SafeIcon icon={FiTrendingUp} className="h-5 w-5 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Best Performer</p>
              <p className="text-lg font-bold text-gray-900">7.7%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-secondary-100 rounded-lg mr-3">
              <SafeIcon icon={FiEye} className="h-5 w-5 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-lg font-bold text-gray-900">11.9K</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-warning-100 rounded-lg mr-3">
              <SafeIcon icon={FiShoppingCart} className="h-5 w-5 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Cart Value</p>
              <p className="text-lg font-bold text-gray-900">$127</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics;