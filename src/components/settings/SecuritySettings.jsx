import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiLock, FiShield, FiEye, FiEyeOff, FiSmartphone, FiKey, FiAlertTriangle } = FiIcons;

const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const newPassword = watch('newPassword');

  const sessions = [
    {
      id: 1,
      device: 'MacBook Pro',
      location: 'New York, US',
      ip: '192.168.1.1',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 14 Pro',
      location: 'New York, US',
      ip: '192.168.1.2',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Windows',
      location: 'San Francisco, US',
      ip: '192.168.1.3',
      lastActive: '2 days ago',
      current: false
    }
  ];

  const handlePasswordChange = async (data) => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password updated successfully');
      reset();
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTwoFactorEnabled(!twoFactorEnabled);
      toast.success(
        twoFactorEnabled 
          ? 'Two-factor authentication disabled' 
          : 'Two-factor authentication enabled'
      );
    } catch (error) {
      toast.error('Failed to update two-factor authentication');
    } finally {
      setLoading(false);
    }
  };

  const revokeSession = async (sessionId) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Session revoked successfully');
    } catch (error) {
      toast.error('Failed to revoke session');
    }
  };

  const revokeAllSessions = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('All sessions revoked successfully');
    } catch (error) {
      toast.error('Failed to revoke sessions');
    }
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <SafeIcon icon={FiLock} className="h-5 w-5 mr-2" />
            Change Password
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                {...register('currentPassword', { required: 'Current password is required' })}
                type={showCurrentPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showCurrentPassword ? FiEyeOff : FiEye} className="h-4 w-4" />
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                {...register('newPassword', { 
                  required: 'New password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                type={showNewPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showNewPassword ? FiEyeOff : FiEye} className="h-4 w-4" />
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === newPassword || 'Passwords do not match'
                })}
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showConfirmPassword ? FiEyeOff : FiEye} className="h-4 w-4" />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SafeIcon icon={FiShield} className="h-5 w-5 mr-2" />
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Add an extra layer of security to your account.
            </p>
          </div>
          
          <button
            onClick={handleTwoFactorToggle}
            disabled={loading}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {twoFactorEnabled ? (
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-success-50 rounded-lg">
              <SafeIcon icon={FiShield} className="h-5 w-5 text-success-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-success-800">
                  Two-factor authentication is enabled
                </p>
                <p className="text-sm text-success-600">
                  Your account is protected with 2FA using your authenticator app.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100">
                View Recovery Codes
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                Reset 2FA
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-warning-50 rounded-lg">
              <SafeIcon icon={FiAlertTriangle} className="h-5 w-5 text-warning-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-warning-800">
                  Two-factor authentication is disabled
                </p>
                <p className="text-sm text-warning-600">
                  Enable 2FA to add an extra layer of security to your account.
                </p>
              </div>
            </div>
            
            <button
              onClick={handleTwoFactorToggle}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
            >
              <SafeIcon icon={FiSmartphone} className="h-4 w-4 mr-2 inline" />
              Enable Two-Factor Authentication
            </button>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SafeIcon icon={FiKey} className="h-5 w-5 mr-2" />
              Active Sessions
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage your active sessions across devices.
            </p>
          </div>
          
          <button
            onClick={revokeAllSessions}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
          >
            Revoke All Sessions
          </button>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <SafeIcon icon={FiSmartphone} className="h-5 w-5 text-gray-600" />
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900">{session.device}</h4>
                    {session.current && (
                      <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-700 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{session.location}</p>
                  <p className="text-xs text-gray-500">
                    {session.ip} • Last active {session.lastActive}
                  </p>
                </div>
              </div>
              
              {!session.current && (
                <button
                  onClick={() => revokeSession(session.id)}
                  className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Revoke
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Security Recommendations
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-success-50 rounded-lg">
            <SafeIcon icon={FiShield} className="h-5 w-5 text-success-600 mr-3" />
            <span className="text-sm text-success-800">Strong password is being used</span>
          </div>
          
          <div className="flex items-center p-3 bg-warning-50 rounded-lg">
            <SafeIcon icon={FiAlertTriangle} className="h-5 w-5 text-warning-600 mr-3" />
            <span className="text-sm text-warning-800">
              Consider enabling two-factor authentication for better security
            </span>
          </div>
          
          <div className="flex items-center p-3 bg-primary-50 rounded-lg">
            <SafeIcon icon={FiKey} className="h-5 w-5 text-primary-600 mr-3" />
            <span className="text-sm text-primary-800">
              Review your active sessions regularly
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;