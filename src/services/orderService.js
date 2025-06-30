import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class OrderService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async getOrders(filters = {}) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockOrders = [
          {
            id: '#ORD-001',
            customer: {
              name: 'John Smith',
              email: 'john@example.com',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
            },
            items: [
              { name: 'Premium Course Bundle', quantity: 1, price: 199.00 }
            ],
            total: 199.00,
            status: 'completed',
            paymentStatus: 'paid',
            fulfillmentStatus: 'fulfilled',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T14:30:00Z'
          }
        ];
        resolve(mockOrders);
      }, 500);
    });
  }

  async getOrderById(orderId) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (orderId === '#ORD-001') {
          resolve({
            id: '#ORD-001',
            customer: {
              name: 'John Smith',
              email: 'john@example.com',
              phone: '+1 (555) 123-4567',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
            },
            items: [
              { name: 'Premium Course Bundle', quantity: 1, price: 199.00 }
            ],
            total: 199.00,
            status: 'completed',
            paymentStatus: 'paid',
            fulfillmentStatus: 'fulfilled',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T14:30:00Z',
            shippingAddress: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              zip: '10001',
              country: 'US'
            },
            trackingNumber: 'TRK123456789'
          });
        } else {
          reject(new Error('Order not found'));
        }
      }, 500);
    });
  }

  async updateOrderStatus(orderId, status, trackingNumber = null) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: orderId,
          status: status,
          trackingNumber: trackingNumber,
          updatedAt: new Date().toISOString()
        });
      }, 1000);
    });
  }

  async sendCustomerNote(orderId, note) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Note sent to customer successfully'
        });
      }, 1000);
    });
  }

  async processRefund(orderId, amount, reason) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          refundId: `ref_${Date.now()}`,
          amount: amount,
          status: 'processed'
        });
      }, 2000);
    });
  }

  async exportOrders(filters = {}, format = 'csv') {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, this would generate and download a file
        const blob = new Blob(['Order ID,Customer,Total,Status,Date\n#ORD-001,John Smith,$199.00,Completed,2024-01-15'], 
          { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders-export-${Date.now()}.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
        resolve({ success: true });
      }, 1000);
    });
  }

  async getOrderStats() {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalOrders: 1247,
          totalRevenue: 45230,
          averageOrderValue: 89.50,
          fulfillmentRate: 94.2,
          statusBreakdown: {
            pending: 23,
            processing: 45,
            shipped: 67,
            completed: 892,
            cancelled: 12
          }
        });
      }, 500);
    });
  }
}

export const orderService = new OrderService();