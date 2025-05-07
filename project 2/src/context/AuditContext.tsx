import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  AuditEvent, 
  AuditLogContextType, 
  AuditLogFilter 
} from '../types/audit';

// Mock data for demonstration purposes
const MOCK_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: '1',
    type: 'auth:login',
    userId: '1',
    userEmail: 'admin@example.com',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    resourceId: null,
    resourceType: null,
    details: { success: true },
    severity: 'info',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'user:create',
    userId: '1',
    userEmail: 'admin@example.com',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    resourceId: '2',
    resourceType: 'user',
    details: { email: 'newuser@example.com', role: 'developer' },
    severity: 'info',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'role:update',
    userId: '1',
    userEmail: 'admin@example.com',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    resourceId: '3',
    resourceType: 'role',
    details: { 
      name: 'developer', 
      changes: { 
        permissions: { 
          added: ['api-keys:read'], 
          removed: [] 
        } 
      } 
    },
    severity: 'info',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'api-key:create',
    userId: '1',
    userEmail: 'admin@example.com',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    resourceId: '1',
    resourceType: 'api-key',
    details: { name: 'Production API Key' },
    severity: 'info',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'auth:login',
    userId: null,
    userEmail: 'unknown@example.com',
    ipAddress: '203.0.113.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    resourceId: null,
    resourceType: null,
    details: { success: false, reason: 'Invalid credentials' },
    severity: 'warning',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
];

const AuditContext = createContext<AuditLogContextType | undefined>(undefined);

export const AuditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalEvents, setTotalEvents] = useState<number>(0);

  const getEvents = async (
    filter?: AuditLogFilter, 
    page: number = 1, 
    pageSize: number = 10
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to fetch audit events with filtering and pagination
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Basic filtering logic for demonstration
      let filteredEvents = [...MOCK_AUDIT_EVENTS];
      
      if (filter) {
        if (filter.eventType && filter.eventType.length > 0) {
          filteredEvents = filteredEvents.filter(event => 
            filter.eventType?.includes(event.type)
          );
        }
        
        if (filter.severity && filter.severity.length > 0) {
          filteredEvents = filteredEvents.filter(event => 
            filter.severity?.includes(event.severity)
          );
        }
        
        if (filter.userId) {
          filteredEvents = filteredEvents.filter(event => 
            event.userId === filter.userId
          );
        }
        
        if (filter.resourceId) {
          filteredEvents = filteredEvents.filter(event => 
            event.resourceId === filter.resourceId
          );
        }
        
        if (filter.dateFrom) {
          const fromDate = new Date(filter.dateFrom).getTime();
          filteredEvents = filteredEvents.filter(event => 
            new Date(event.timestamp).getTime() >= fromDate
          );
        }
        
        if (filter.dateTo) {
          const toDate = new Date(filter.dateTo).getTime();
          filteredEvents = filteredEvents.filter(event => 
            new Date(event.timestamp).getTime() <= toDate
          );
        }
        
        if (filter.search) {
          const searchLower = filter.search.toLowerCase();
          filteredEvents = filteredEvents.filter(event => 
            event.userEmail?.toLowerCase().includes(searchLower) ||
            event.type.toLowerCase().includes(searchLower) ||
            event.resourceType?.toLowerCase().includes(searchLower) ||
            JSON.stringify(event.details).toLowerCase().includes(searchLower)
          );
        }
      }
      
      // Basic pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedEvents = filteredEvents.slice(start, end);
      
      setEvents(paginatedEvents);
      setTotalEvents(filteredEvents.length);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch audit events');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const value: AuditLogContextType = {
    events,
    isLoading,
    error,
    totalEvents,
    getEvents,
    clearError,
  };

  return <AuditContext.Provider value={value}>{children}</AuditContext.Provider>;
};

export const useAudit = (): AuditLogContextType => {
  const context = useContext(AuditContext);
  
  if (context === undefined) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  
  return context;
};