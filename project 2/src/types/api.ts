export interface ApiKey {
  id: string;
  name: string;
  key: string;
  expiresAt: string | null;
  lastUsed: string | null;
  createdAt: string;
  createdBy: string;
  permissions: string[];
  isActive: boolean;
}

export interface ApiKeyCreationData {
  name: string;
  permissions: string[];
  expiresAt?: string | null;
}

export interface ApiKeyContextType {
  apiKeys: ApiKey[];
  isLoading: boolean;
  error: string | null;
  getApiKeys: () => Promise<void>;
  createApiKey: (data: ApiKeyCreationData) => Promise<ApiKey>;
  revokeApiKey: (id: string) => Promise<void>;
  clearError: () => void;
}