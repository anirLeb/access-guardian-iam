import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  AuthContextType, 
  AuthState, 
  LoginCredentials, 
  RegisterData, 
  ResetPasswordData, 
  UpdatePasswordData, 
  User
} from '../types/auth';

// Mock user data for demonstration purposes
const MOCK_USER: User = {
  id: '1',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  permissions: [
    'users:read', 'users:write', 'users:delete', 
    'roles:read', 'roles:write', 'roles:delete',
    'api-keys:read', 'api-keys:write', 'api-keys:delete',
    'logs:read',
    'ai-connections:read', 'ai-connections:write', 'ai-connections:delete'
  ],
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  isActive: true,
  mfaEnabled: false,
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        // In a real app, you would validate the token with your backend
        const userJson = localStorage.getItem('auth_user');
        
        if (userJson) {
          const user = JSON.parse(userJson);
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            ...initialState,
            isLoading: false,
          });
        }
      } catch (error) {
        setState({
          ...initialState,
          isLoading: false,
          error: 'Failed to restore authentication state',
        });
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setState({ ...state, isLoading: true, error: null });
    
    try {
      // In a real app, you would make an API call to authenticate
      // For demo purposes, we'll simulate a successful login with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        localStorage.setItem('auth_user', JSON.stringify(MOCK_USER));
        
        setState({
          user: MOCK_USER,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    setState({ ...state, isLoading: true, error: null });
    
    try {
      // In a real app, you would make an API call to register the user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll simulate a successful registration
      setState({
        ...state,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const logout = async (): Promise<void> => {
    setState({ ...state, isLoading: true, error: null });
    
    try {
      // In a real app, you would make an API call to logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.removeItem('auth_user');
      
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const resetPassword = async (data: ResetPasswordData): Promise<void> => {
    setState({ ...state, isLoading: true, error: null });
    
    try {
      // In a real app, you would make an API call to reset the password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState({
        ...state,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const updatePassword = async (data: UpdatePasswordData): Promise<void> => {
    setState({ ...state, isLoading: true, error: null });
    
    try {
      // In a real app, you would make an API call to update the password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState({
        ...state,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const clearError = (): void => {
    setState({ ...state, error: null });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};