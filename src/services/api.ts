import { GovernmentService, CitizenProfile, ConsentRecord, Application, Grievance, NotificationItem, AuditLog, ApiConnection, ApiLog } from '../types';

const memoryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 15000; // 15 seconds cache for fast reload & instant navigation

function getAuthHeader(): HeadersInit {
  const token = localStorage.getItem('gov_jwt_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function fetchWithFastCache<T>(url: string, ttl = CACHE_TTL_MS): Promise<T> {
  const cached = memoryCache.get(url);
  const now = Date.now();
  if (cached && (now - cached.timestamp < ttl)) {
    return cached.data;
  }

  try {
    const res = await fetch(url, { headers: getAuthHeader() });
    const json = await res.json();
    const result = json.data !== undefined ? json.data : json;
    memoryCache.set(url, { data: result, timestamp: now });
    return result;
  } catch (err) {
    if (cached) return cached.data;
    throw err;
  }
}

export function invalidateApiCache(prefix?: string) {
  if (!prefix) {
    memoryCache.clear();
  } else {
    for (const key of memoryCache.keys()) {
      if (key.includes(prefix)) {
        memoryCache.delete(key);
      }
    }
  }
}

export const apiService = {
  // Services
  getServices: async (): Promise<GovernmentService[]> => {
    return (await fetchWithFastCache<GovernmentService[]>('/api/services', 30000)) || [];
  },

  getServiceById: async (id: string): Promise<GovernmentService | null> => {
    return (await fetchWithFastCache<GovernmentService | null>(`/api/services/${id}`, 30000)) || null;
  },

  // Citizen Profile (Unified Profile - Enter once)
  getProfile: async (): Promise<CitizenProfile> => {
    return await fetchWithFastCache<CitizenProfile>('/api/profile', 10000);
  },

  updateProfile: async (profile: Partial<CitizenProfile>): Promise<CitizenProfile> => {
    invalidateApiCache('/api/profile');
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(profile)
    });
    const data = await res.json();
    memoryCache.set('/api/profile', { data: data.data, timestamp: Date.now() });
    return data.data;
  },

  // Consents
  getConsents: async (): Promise<ConsentRecord[]> => {
    return (await fetchWithFastCache<ConsentRecord[]>('/api/consents', 10000)) || [];
  },

  grantConsent: async (requestingDepartment: string, purpose: string, requestedFields: string[]): Promise<ConsentRecord> => {
    invalidateApiCache('/api/consents');
    const res = await fetch('/api/consents', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ requestingDepartment, purpose, requestedFields, status: 'ALLOWED' })
    });
    const data = await res.json();
    return data.data;
  },

  revokeConsent: async (id: string): Promise<ConsentRecord> => {
    invalidateApiCache('/api/consents');
    const res = await fetch(`/api/consents/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    const data = await res.json();
    return data.data;
  },

  // Applications
  getApplications: async (params?: { citizenId?: string; status?: string; departmentId?: string }): Promise<Application[]> => {
    const query = new URLSearchParams(params as any).toString();
    const url = `/api/applications${query ? `?${query}` : ''}`;
    return (await fetchWithFastCache<Application[]>(url, 8000)) || [];
  },

  getApplicationById: async (id: string): Promise<Application | null> => {
    return (await fetchWithFastCache<Application | null>(`/api/applications/${id}`, 8000)) || null;
  },

  submitApplication: async (serviceId: string, submittedData: any, prefilledFields?: any): Promise<{ success: boolean; applicationId: string; data: Application }> => {
    invalidateApiCache('/api/applications');
    invalidateApiCache('/api/admin');
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ serviceId, submittedData, prefilledFields })
    });
    return await res.json();
  },

  // Officer Actions
  performOfficerAction: async (id: string, action: 'APPROVE' | 'REJECT' | 'REQUEST_CORRECTION' | 'FORWARD', remarks?: string, forwardedTo?: string): Promise<Application> => {
    invalidateApiCache('/api/applications');
    invalidateApiCache('/api/admin');
    const res = await fetch(`/api/applications/${id}/action`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ action, remarks, forwardedTo })
    });
    const data = await res.json();
    return data.data;
  },

  // Interoperability Demo Pipeline (Scholarship)
  runScholarshipDemo: async (): Promise<any> => {
    invalidateApiCache('/api/applications');
    const res = await fetch('/api/interop/scholarship-demo', {
      method: 'POST',
      headers: getAuthHeader()
    });
    return await res.json();
  },

  // Grievances
  getGrievances: async (): Promise<Grievance[]> => {
    return (await fetchWithFastCache<Grievance[]>('/api/grievances', 10000)) || [];
  },

  createGrievance: async (data: { department: string; subject: string; description: string; applicationId?: string; priority?: string }): Promise<Grievance> => {
    invalidateApiCache('/api/grievances');
    const res = await fetch('/api/grievances', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data)
    });
    const resData = await res.json();
    return resData.data;
  },

  // Notifications
  getNotifications: async (): Promise<NotificationItem[]> => {
    return (await fetchWithFastCache<NotificationItem[]>('/api/notifications', 5000)) || [];
  },

  markNotificationRead: async (id: string): Promise<void> => {
    invalidateApiCache('/api/notifications');
    await fetch(`/api/notifications/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeader()
    });
  },

  // Admin APIs
  getAdminMetrics: async (): Promise<any> => {
    return await fetchWithFastCache<any>('/api/admin/metrics', 10000);
  },

  getApiConnections: async (): Promise<ApiConnection[]> => {
    return (await fetchWithFastCache<ApiConnection[]>('/api/admin/api-connections', 15000)) || [];
  },

  getApiLogs: async (): Promise<ApiLog[]> => {
    return (await fetchWithFastCache<ApiLog[]>('/api/admin/api-logs', 5000)) || [];
  },

  retryApiLog: async (id: string): Promise<ApiLog> => {
    invalidateApiCache('/api/admin/api-logs');
    const res = await fetch(`/api/admin/api-logs/${id}/retry`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    const data = await res.json();
    return data.data;
  },

  getAuditLogs: async (): Promise<AuditLog[]> => {
    return (await fetchWithFastCache<AuditLog[]>('/api/admin/audit-logs', 10000)) || [];
  },

  getAdminUsers: async (): Promise<any[]> => {
    return (await fetchWithFastCache<any[]>('/api/admin/users', 15000)) || [];
  },

  getAdminDepartments: async (): Promise<any[]> => {
    return (await fetchWithFastCache<any[]>('/api/admin/departments', 30000)) || [];
  },

  getAdminWorkflows: async (): Promise<any[]> => {
    return (await fetchWithFastCache<any[]>('/api/admin/workflows', 30000)) || [];
  }
};
