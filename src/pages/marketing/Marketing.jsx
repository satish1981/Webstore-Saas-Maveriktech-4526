import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Marketing = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
          <p className="text-gray-600">AI chatbot, video generation, and campaigns</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Marketing Tools</h3>
          <p className="text-gray-600">Coming soon - AI-powered marketing automation</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Marketing;