export type AuditEventType = 
  | 'auth:login' 
  | 'auth:logout' 
  | 'auth:register' 
  | 'auth:password-reset' 
  | 'user:create' 
  | 'user:update' 
  | 'user:delete' 
  | 'role:create' 
  | 'role:update' 
  | 'role:delete'
  | 'api-key:create'
  | 'api-key:revoke'
  | 'ai-connection:create'
  | 'ai-connection:update'
  | 'ai-connection:delete'
  | 'ai-connection:test';

export type AuditEventSeverity = 'info' | 'warning' | 'error';

export interface AuditEvent {
  id: string;
  type: AuditEventType;
  userId: string | null;
  userEmail: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  resourceId: string | null;
  resourceType: string | null;
  details: Record<string, any>;
  severity: AuditEventSeverity;
  timestamp: string;
}

export interface AuditLogFilter {
  eventType?: AuditEventType[];
  severity?: AuditEventSeverity[];
  userId?: string;
  resourceId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface AuditLogContextType {
  events: AuditEvent[];
  isLoading: boolean;
  error: string | null;
  totalEvents: number;
  getEvents: (filter?: AuditLogFilter, page?: number, pageSize?: number) => Promise<void>;
  clearError: () => void;
}