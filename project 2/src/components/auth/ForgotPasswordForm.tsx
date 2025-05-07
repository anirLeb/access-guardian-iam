import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ResetPasswordData } from '../../types/auth';

const ForgotPasswordForm: React.FC = () => {
  const { resetPassword, isLoading, error, clearError } = useAuth();
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ResetPasswordData>();
  
  const onSubmit = async (data: ResetPasswordData) => {
    clearError();
    try {
      await resetPassword(data);
      setResetEmailSent(true);
    } catch (error) {
      // Error is handled by the auth context
    }
  };
  
  if (resetEmailSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="card">
          <div className="mb-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100 mb-4">
              <Check className="h-6 w-6 text-success-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Check your email</h2>
            <p className="text-neutral-600">
              If an account exists with the email you entered, we've sent a link to reset your password.
            </p>
          </div>
          
          <div className="text-center">
            <Link to="/login" className="btn-outline">
              Return to sign in
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <div className="card">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Reset your password</h2>
          <p className="text-neutral-600">Enter your email and we'll send you a link to reset your password</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md flex items-start">
            <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={`form-input ${errors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-200' : ''}`}
              placeholder="you@example.com"
              {...register('email', { 
                required: 'Email is required', 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center py-2.5"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Send size={18} className="mr-2" />
            )}
            {isLoading ? 'Sending...' : 'Send reset link'}
          </button>
          
          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordForm;