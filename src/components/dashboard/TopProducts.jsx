import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrendingUp } = FiIcons;

const TopProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Course Bundle',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=60&h=60&fit=crop',
      sales: 245,
      revenue: '$12,250',
      trend: '+15%'
    },
    {
      id: 2,
      name: 'Digital Marketing Guide',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=60&h=60&fit=crop',
      sales: 189,
      revenue: '$5,670',
      trend: '+8%'
    },
    {
      id: 3,
      name: 'Design Templates Pack',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=60&h=60&fit=crop',
      sales: 156,
      revenue: '$3,120',
      trend: '+12%'
    },
    {
      id: 4,
      name: 'Business Consultation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
      sales: 134,
      revenue: '$6,700',
      trend: '+5%'
    },
    {
      id: 5,
      name: 'SEO Toolkit',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=60&h=60&fit=crop',
      sales: 98,
      revenue: '$2,940',
      trend: '+22%'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
          <p className="text-sm text-gray-600">Best performing products this month</p>
        </div>
        <SafeIcon icon={FiTrendingUp} className="h-5 w-5 text-success-500" />
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                {index + 1}
              </span>
            </div>
            <div className="flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">
                {product.sales} sales
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {product.revenue}
              </p>
              <p className="text-xs text-success-600 font-medium">
                {product.trend}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;