import React, { createContext, useContext, useState, useEffect } from 'react';
import { storeService } from '../services/storeService';
import { useAuth } from './AuthContext';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [currentStore, setCurrentStore] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserStores();
    }
  }, [isAuthenticated, user]);

  const loadUserStores = async () => {
    try {
      setLoading(true);
      const userStores = await storeService.getUserStores();
      setStores(userStores);
      if (userStores.length > 0) {
        setCurrentStore(userStores[0]);
      }
    } catch (error) {
      console.error('Failed to load stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const createStore = async (storeData) => {
    const newStore = await storeService.createStore(storeData);
    setStores(prev => [...prev, newStore]);
    setCurrentStore(newStore);
    return newStore;
  };

  const updateStore = async (storeId, updates) => {
    const updatedStore = await storeService.updateStore(storeId, updates);
    setStores(prev => prev.map(store => 
      store.id === storeId ? updatedStore : store
    ));
    if (currentStore?.id === storeId) {
      setCurrentStore(updatedStore);
    }
    return updatedStore;
  };

  const switchStore = (storeId) => {
    const store = stores.find(s => s.id === storeId);
    if (store) {
      setCurrentStore(store);
    }
  };

  const value = {
    currentStore,
    stores,
    loading,
    createStore,
    updateStore,
    switchStore,
    loadUserStores,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};