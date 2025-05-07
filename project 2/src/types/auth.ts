export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  permissions: Permission[];
  avatarUrl?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  mfaEnabled: boolean;
}

export type Role = 'admin' | 'manager' | 'developer' | 'analyst' | 'user';

export type Permission =
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'roles:read'
  | 'roles:write'
  | 'roles:delete'
  | 'api-keys:read'
  | 'api-keys:write'
  | 'api-keys:delete'
  | 'logs:read'
  | 'ai-connections:read'
  | 'ai-connections:write'
  | 'ai-connections:delete';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface UpdatePasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  updatePassword: (data: UpdatePasswordData) => Promise<void>;
  clearError: () => void;
}