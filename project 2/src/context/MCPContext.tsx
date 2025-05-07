import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  AIConnection, 
  AIConnectionContextType, 
  AIConnectionCreationData 
} from '../types/mcp';

// Mock data for demonstration purposes
const MOCK_CONNECTIONS: AIConnection[] = [
  {
    id: '1',
    name: 'OpenAI GPT-4',
    type: 'openai',
    status: 'active',
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    config: {
      apiKey: '****************************************',
      model: 'gpt-4',
      baseUrl: 'https://api.openai.com/v1',
    },
    tags: ['production', 'nlp'],
  },
  {
    id: '2',
    name: 'Azure AI Services',
    type: 'azure',
    status: 'active',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    config: {
      apiKey: '****************************************',
      region: 'eastus',
      resourceGroup: 'ai-services',
    },
    tags: ['production', 'vision'],
  },
  {
    id: '3',
    name: 'Anthropic Claude',
    type: 'anthropic',
    status: 'inactive',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: null,
    config: {
      apiKey: '****************************************',
      model: 'claude-3-opus',
    },
    tags: ['development', 'experimental'],
  },
];

const MCPContext = createContext<AIConnectionContextType | undefined>(undefined);

export const MCPProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connections, setConnections] = useState<AIConnection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getConnections = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to fetch connections
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setConnections(MOCK_CONNECTIONS);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch AI connections');
    } finally {
      setIsLoading(false);
    }
  };

  const createConnection = async (data: AIConnectionCreationData): Promise<AIConnection> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to create a connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newConnection: AIConnection = {
        id: `${connections.length + 1}`,
        name: data.name,
        type: data.type,
        status: 'active',
        createdAt: new Date().toISOString(),
        lastUsed: null,
        config: data.config,
        tags: data.tags || [],
      };
      
      setConnections(prevConnections => [...prevConnections, newConnection]);
      
      return newConnection;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create AI connection');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateConnection = async (id: string, data: Partial<AIConnectionCreationData>): Promise<AIConnection> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to update a connection
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let updatedConnection: AIConnection | undefined;
      
      setConnections(prevConnections =>
        prevConnections.map(connection => {
          if (connection.id === id) {
            updatedConnection = {
              ...connection,
              name: data.name || connection.name,
              type: data.type || connection.type,
              config: data.config ? { ...connection.config, ...data.config } : connection.config,
              tags: data.tags || connection.tags,
            };
            return updatedConnection;
          }
          return connection;
        })
      );
      
      if (!updatedConnection) {
        throw new Error('Connection not found');
      }
      
      return updatedConnection;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update AI connection');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteConnection = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to delete a connection
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setConnections(prevConnections => 
        prevConnections.filter(connection => connection.id !== id)
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete AI connection');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async (id: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to test a connection
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // For demo purposes, we'll simulate a successful test for specific connections
      const connection = connections.find(conn => conn.id === id);
      
      if (!connection) {
        throw new Error('Connection not found');
      }
      
      const success = connection.status === 'active';
      const message = success 
        ? 'Connection test completed successfully' 
        : 'Connection test failed. Please check your configuration.';
      
      return { success, message };
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to test AI connection');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const value: AIConnectionContextType = {
    connections,
    isLoading,
    error,
    getConnections,
    createConnection,
    updateConnection,
    deleteConnection,
    testConnection,
    clearError,
  };

  return <MCPContext.Provider value={value}>{children}</MCPContext.Provider>;
};

export const useMCP = (): AIConnectionContextType => {
  const context = useContext(MCPContext);
  
  if (context === undefined) {
    throw new Error('useMCP must be used within an MCPProvider');
  }
  
  return context;
};