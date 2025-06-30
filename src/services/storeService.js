import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class StoreService {
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

  async getUserStores() {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'store-1',
            name: 'My Awesome Store',
            domain: 'awesome-store.maverik.app',
            customDomain: null,
            theme: 'modern',
            logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
            primaryColor: '#3b82f6',
            secondaryColor: '#8b5cf6',
            description: 'Premium digital products and services',
            currency: 'USD',
            status: 'active',
            createdAt: new Date().toISOString(),
            settings: {
              seoTitle: 'My Awesome Store - Premium Digital Products',
              seoDescription: 'Discover amazing digital products and services at unbeatable prices.',
              enableChat: true,
              enableReviews: true,
              enableWishlist: true,
            }
          }
        ]);
      }, 500);
    });
  }

  async createStore(storeData) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStore = {
          id: `store-${Date.now()}`,
          ...storeData,
          domain: `${storeData.name.toLowerCase().replace(/\s+/g, '-')}.maverik.app`,
          status: 'active',
          createdAt: new Date().toISOString(),
          settings: {
            seoTitle: storeData.name,
            seoDescription: storeData.description || '',
            enableChat: true,
            enableReviews: true,
            enableWishlist: true,
          }
        };
        resolve(newStore);
      }, 1000);
    });
  }

  async updateStore(storeId, updates) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: storeId,
          ...updates,
          updatedAt: new Date().toISOString(),
        });
      }, 1000);
    });
  }

  async getStoreById(storeId) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (storeId === 'store-1') {
          resolve({
            id: 'store-1',
            name: 'My Awesome Store',
            domain: 'awesome-store.maverik.app',
            theme: 'modern',
            logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
            primaryColor: '#3b82f6',
            secondaryColor: '#8b5cf6',
            description: 'Premium digital products and services',
            currency: 'USD',
            status: 'active',
          });
        } else {
          reject(new Error('Store not found'));
        }
      }, 500);
    });
  }
}

export const storeService = new StoreService();