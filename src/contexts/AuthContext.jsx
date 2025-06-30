import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const userData = await authService.validateToken(token);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    localStorage.setItem('authToken', response.token);
    setUser(response.user);
    setIsAuthenticated(true);
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    localStorage.setItem('authToken', response.token);
    setUser(response.user);
    setIsAuthenticated(true);
    return response;
  };

  const updateProfile = async (profileData) => {
    // Mock API call - replace with actual implementation
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    return updatedUser;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const verifyOTP = async (email, otp) => {
    const response = await authService.verifyOTP(email, otp);
    return response;
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    updateProfile,
    logout,
    verifyOTP,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};