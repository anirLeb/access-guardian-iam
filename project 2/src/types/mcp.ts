export type ConnectionType = 'aws' | 'azure' | 'gcp' | 'openai' | 'anthropic' | 'custom';

export type ConnectionStatus = 'active' | 'inactive' | 'error' | 'pending';

export interface AIConnection {
  id: string;
  name: string;
  type: ConnectionType;
  status: ConnectionStatus;
  createdAt: string;
  lastUsed: string | null;
  config: Record<string, any>;
  tags: string[];
}

export interface AIConnectionCreationData {
  name: string;
  type: ConnectionType;
  config: Record<string, any>;
  tags?: string[];
}

export interface AIConnectionContextType {
  connections: AIConnection[];
  isLoading: boolean;
  error: string | null;
  getConnections: () => Promise<void>;
  createConnection: (data: AIConnectionCreationData) => Promise<AIConnection>;
  updateConnection: (id: string, data: Partial<AIConnectionCreationData>) => Promise<AIConnection>;
  deleteConnection: (id: string) => Promise<void>;
  testConnection: (id: string) => Promise<{ success: boolean; message: string }>;
  clearError: () => void;
}