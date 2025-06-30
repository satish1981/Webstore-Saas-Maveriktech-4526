import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUsers, FiPlus, FiEdit3, FiTrash2, FiMail, FiShield, FiCrown, FiUser, FiX } = FiIcons;

const TeamSettings = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@company.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      role: 'owner',
      status: 'active',
      lastActive: '2 minutes ago',
      joinedAt: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
      role: 'admin',
      status: 'active',
      lastActive: '1 hour ago',
      joinedAt: '2023-02-20'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike@company.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      role: 'editor',
      status: 'active',
      lastActive: '3 hours ago',
      joinedAt: '2023-03-10'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      email: 'emily@company.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      role: 'viewer',
      status: 'pending',
      lastActive: 'Never',
      joinedAt: '2024-01-10'
    }
  ];

  const roles = [
    {
      id: 'owner',
      name: 'Owner',
      description: 'Full access to everything including billing and team management',
      icon: FiCrown,
      permissions: [
        'Manage team members',
        'Access billing',
        'Manage integrations',
        'Full store access',
        'Account settings'
      ]
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Full access to store management and most settings',
      icon: FiShield,
      permissions: [
        'Manage products',
        'Process orders',
        'View analytics',
        'Manage customers',
        'Store settings'
      ]
    },
    {
      id: 'editor',
      name: 'Editor',
      description: 'Can manage content and process orders',
      icon: FiEdit3,
      permissions: [
        'Manage products',
        'Process orders',
        'View customers',
        'Basic analytics'
      ]
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access to store data',
      icon: FiUser,
      permissions: [
        'View products',
        'View orders',
        'View analytics',
        'View customers'
      ]
    }
  ];

  const pendingInvites = [
    {
      id: 1,
      email: 'alex@company.com',
      role: 'editor',
      invitedAt: '2024-01-12',
      invitedBy: 'John Smith'
    },
    {
      id: 2,
      email: 'lisa@company.com',
      role: 'viewer',
      invitedAt: '2024-01-10',
      invitedBy: 'Sarah Johnson'
    }
  ];

  const handleInviteMember = async (email, role) => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Invitation sent successfully');
      setShowInviteModal(false);
    } catch (error) {
      toast.error('Failed to send invitation');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Team member removed');
    } catch (error) {
      toast.error('Failed to remove team member');
    }
  };

  const handleResendInvite = async (inviteId) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Invitation resent');
    } catch (error) {
      toast.error('Failed to resend invitation');
    }
  };

  const getRoleIcon = (role) => {
    const roleData = roles.find(r => r.id === role);
    return roleData ? roleData.icon : FiUser;
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'owner':
        return 'text-yellow-600 bg-yellow-50';
      case 'admin':
        return 'text-red-600 bg-red-50';
      case 'editor':
        return 'text-blue-600 bg-blue-50';
      case 'viewer':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success-600 bg-success-50';
      case 'pending':
        return 'text-warning-600 bg-warning-50';
      case 'inactive':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Members */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SafeIcon icon={FiUsers} className="h-5 w-5 mr-2" />
              Team Members
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage your team members and their access levels.
            </p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
          >
            <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
            Invite Member
          </button>
        </div>

        <div className="space-y-4">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{member.email}</p>
                  <p className="text-xs text-gray-500">
                    Last active: {member.lastActive} • Joined {new Date(member.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    <SafeIcon icon={getRoleIcon(member.role)} className="h-3 w-3 mr-1" />
                    {member.role}
                  </span>
                </div>

                {member.role !== 'owner' && (
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-primary-600 rounded">
                      <SafeIcon icon={FiEdit3} className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded"
                    >
                      <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Invitations</h3>
          
          <div className="space-y-4">
            {pendingInvites.map((invite) => (
              <div key={invite.id} className="flex items-center justify-between p-4 border border-warning-200 bg-warning-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-warning-100 rounded-full">
                    <SafeIcon icon={FiMail} className="h-4 w-4 text-warning-600" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">{invite.email}</h4>
                    <p className="text-sm text-gray-600">
                      Invited as {invite.role} by {invite.invitedBy} on {new Date(invite.invitedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleResendInvite(invite.id)}
                    className="px-3 py-1 text-sm font-medium text-warning-700 hover:bg-warning-100 rounded"
                  >
                    Resend
                  </button>
                  <button className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Role Permissions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${getRoleColor(role.id).replace('text-', 'bg-').replace('bg-', 'bg-').replace('-600', '-100')}`}>
                  <SafeIcon icon={role.icon} className={`h-4 w-4 ${getRoleColor(role.id).split(' ')[0]}`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{role.name}</h4>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                {role.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <SafeIcon icon={FiShield} className="h-3 w-3 text-gray-400 mr-2" />
                    {permission}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowInviteModal(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Invite Team Member</h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleInviteMember(formData.get('email'), formData.get('role'));
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="colleague@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {roles.filter(role => role.id !== 'owner').map(role => (
                      <option key={role.id} value={role.id}>
                        {role.name} - {role.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Invitation'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSettings;