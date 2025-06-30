import React from 'react';
import { useParams } from 'react-router-dom';

const Storefront = () => {
  const { storeId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Store Preview</h1>
          <p className="text-xl text-gray-600 mb-8">
            Store ID: {storeId}
          </p>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Storefront</h3>
            <p className="text-gray-600">Coming soon - Beautiful customer-facing storefront</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storefront;