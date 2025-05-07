import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApiKeyProvider } from './context/ApiKeyContext';
import { MCPProvider } from './context/MCPContext';
import { AuditProvider } from './context/AuditContext';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <ApiKeyProvider>
        <MCPProvider>
          <AuditProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                
                {/* Protected routes */}
                <Route element={<PrivateRoute />}>
                  <Route element={<Layout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/users" element={<div className="p-4">Users & Roles page (coming soon)</div>} />
                    <Route path="/permissions" element={<div className="p-4">Permissions page (coming soon)</div>} />
                    <Route path="/api-keys" element={<div className="p-4">API Keys page (coming soon)</div>} />
                    <Route path="/ai-connections" element={<div className="p-4">AI Connections page (coming soon)</div>} />
                    <Route path="/audit-logs" element={<div className="p-4">Audit Logs page (coming soon)</div>} />
                    <Route path="/settings" element={<div className="p-4">Settings page (coming soon)</div>} />
                    <Route path="/profile" element={<div className="p-4">Profile page (coming soon)</div>} />
                  </Route>
                </Route>
                
                {/* Default route */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Router>
          </AuditProvider>
        </MCPProvider>
      </ApiKeyProvider>
    </AuthProvider>
  );
}

export default App;