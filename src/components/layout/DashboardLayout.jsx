import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';

const { 
  FiHome, FiShoppingBag, FiPackage, FiBarChart3, FiMessageCircle, 
  FiSettings, FiMenu, FiX, FiZap, FiUser, FiLogOut, FiBell,
  FiSearch, FiPlus
} = FiIcons;

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { currentStore } = useStore();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Store Builder', href: '/store-builder', icon: FiZap },
    { name: 'Products', href: '/products', icon: FiPackage },
    { name: 'Orders', href: '/orders', icon: FiShoppingBag },
    { name: 'Analytics', href: '/analytics', icon: FiBarChart3 },
    { name: 'Marketing', href: '/marketing', icon: FiMessageCircle },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <SafeIcon icon={FiZap} className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Maverik</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <SafeIcon icon={FiX} className="h-6 w-6" />
          </button>
        </div>

        {/* Store selector */}
        {currentStore && (
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={currentStore.logo || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop'}
                  alt={currentStore.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentStore.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentStore.domain}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <SafeIcon 
                icon={item.icon} 
                className={`mr-3 h-5 w-5 ${
                  isActive(item.href) ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                }`} 
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <SafeIcon icon={FiMenu} className="h-6 w-6" />
              </button>
              
              {/* Search */}
              <div className="hidden md:block ml-4">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick actions */}
              <Link
                to="/products"
                className="hidden md:flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                Add Product
              </Link>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <SafeIcon icon={FiBell} className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User menu */}
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.plan} Plan</p>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    title="Sign out"
                  >
                    <SafeIcon icon={FiLogOut} className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;