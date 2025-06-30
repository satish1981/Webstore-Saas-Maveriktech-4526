import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiEdit3, FiTrash2, FiEye, FiMoreVertical, FiPackage, FiDownload } = FiIcons;

const ProductList = ({ searchTerm, filterStatus, onEditProduct }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Mock product data - replace with actual API call
  const products = [
    {
      id: '1',
      name: 'Premium Course Bundle',
      type: 'digital',
      price: 199.00,
      stock: null,
      status: 'active',
      sales: 245,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=60&h=60&fit=crop',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Digital Marketing Guide',
      type: 'digital',
      price: 49.00,
      stock: null,
      status: 'active',
      sales: 189,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=60&h=60&fit=crop',
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'Design Templates Pack',
      type: 'digital',
      price: 29.00,
      stock: null,
      status: 'active',
      sales: 156,
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=60&h=60&fit=crop',
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      name: 'Business T-Shirt',
      type: 'physical',
      price: 25.00,
      stock: 48,
      status: 'active',
      sales: 78,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=60&h=60&fit=crop',
      createdAt: '2024-01-08'
    },
    {
      id: '5',
      name: 'SEO Toolkit',
      type: 'digital',
      price: 79.00,
      stock: null,
      status: 'draft',
      sales: 0,
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=60&h=60&fit=crop',
      createdAt: '2024-01-05'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'out-of-stock':
        return 'bg-danger-100 text-danger-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'digital' ? FiDownload : FiPackage;
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Products ({filteredProducts.length})
          </h3>
          {selectedProducts.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedProducts.length} selected
              </span>
              <button className="px-3 py-1 text-sm font-medium text-danger-600 hover:bg-danger-50 rounded">
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Created {product.createdAt}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <SafeIcon icon={getTypeIcon(product.type)} className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900 capitalize">
                      {product.type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {product.type === 'digital' ? '∞' : product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {product.sales}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEditProduct(product)}
                      className="p-1 text-gray-400 hover:text-primary-600 rounded"
                      title="Edit product"
                    >
                      <SafeIcon icon={FiEdit3} className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-primary-600 rounded"
                      title="View product"
                    >
                      <SafeIcon icon={FiEye} className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-danger-600 rounded"
                      title="Delete product"
                    >
                      <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiPackage} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first product'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;