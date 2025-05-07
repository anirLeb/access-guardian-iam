import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ApiKey, ApiKeyContextType, ApiKeyCreationData } from '../types/api';

// Mock data for demonstration purposes
const MOCK_API_KEYS: ApiKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'ag_prod_a1b2c3d4e5f6g7h8i9j0',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    createdBy: '1',
    permissions: ['users:read', 'roles:read'],
    isActive: true,
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'ag_dev_z9y8x7w6v5u4t3s2r1q0',
    expiresAt: null,
    lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: '1',
    permissions: ['users:read', 'users:write', 'roles:read'],
    isActive: true,
  },
];

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getApiKeys = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to fetch API keys
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setApiKeys(MOCK_API_KEYS);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch API keys');
    } finally {
      setIsLoading(false);
    }
  };

  const createApiKey = async (data: ApiKeyCreationData): Promise<ApiKey> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to create an API key
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newApiKey: ApiKey = {
        id: `${apiKeys.length + 1}`,
        name: data.name,
        key: `ag_${Math.random().toString(36).substring(2, 15)}`,
        expiresAt: data.expiresAt || null,
        lastUsed: null,
        createdAt: new Date().toISOString(),
        createdBy: '1', // Current user ID
        permissions: data.permissions,
        isActive: true,
      };
      
      setApiKeys(prevKeys => [...prevKeys, newApiKey]);
      
      return newApiKey;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create API key');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const revokeApiKey = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to revoke an API key
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setApiKeys(prevKeys =>
        prevKeys.map(key =>
          key.id === id ? { ...key, isActive: false } : key
        )
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to revoke API key');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const value: ApiKeyContextType = {
    apiKeys,
    isLoading,
    error,
    getApiKeys,
    createApiKey,
    revokeApiKey,
    clearError,
  };

  return <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>;
};

export const useApiKeys = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  
  if (context === undefined) {
    throw new Error('useApiKeys must be used within an ApiKeyProvider');
  }
  
  return context;
};