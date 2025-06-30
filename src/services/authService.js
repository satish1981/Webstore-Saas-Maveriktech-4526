import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async login(email, password) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@maverik.com' && password === 'demo123') {
          resolve({
            token: 'mock-jwt-token',
            user: {
              id: '1',
              email: 'demo@maverik.com',
              name: 'Demo User',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
              plan: 'pro',
              createdAt: new Date().toISOString(),
            }
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  async register(userData) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          token: 'mock-jwt-token',
          user: {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name || userData.email.split('@')[0],
            avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
            plan: 'starter',
            createdAt: new Date().toISOString(),
          }
        });
      }, 1000);
    });
  }

  async validateToken(token) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === 'mock-jwt-token') {
          resolve({
            id: '1',
            email: 'demo@maverik.com',
            name: 'Demo User',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            plan: 'pro',
            createdAt: new Date().toISOString(),
          });
        } else {
          reject(new Error('Invalid token'));
        }
      }, 500);
    });
  }

  async verifyOTP(email, otp) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '123456') {
          resolve({ verified: true });
        } else {
          reject(new Error('Invalid OTP'));
        }
      }, 1000);
    });
  }

  async sendOTP(email) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ sent: true });
      }, 1000);
    });
  }

  async resetPassword(email) {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ sent: true });
      }, 1000);
    });
  }
}

export const authService = new AuthService();