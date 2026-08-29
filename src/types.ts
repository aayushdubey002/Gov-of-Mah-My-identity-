// Complete types for Government Interoperability Middleware & Citizen Portal (SIH26129)

export type Language = 'mr' | 'hi' | 'en';
export type UserRole = 'citizen' | 'officer' | 'admin';

export interface LocalizedText {
  en: string;
  mr: string;
  hi: string;
}

export interface Department {
  id: number;
  number?: number;
  title?: LocalizedText;
  name?: LocalizedText;
  subtitle?: LocalizedText;
  shortDesc?: LocalizedText;
  category?: string;
  icon: string;
  servicesCount: number;
  colorScheme?: any;
  popularServices?: string[];
  featuredServices?: { id: string; name: LocalizedText }[];
  slaAvgDays?: number;
  contactEmail?: string;
  helpline?: string;
  apiSetuReady?: boolean;
}

export interface ServiceItem {
  id: string;
  name: LocalizedText;
  shortDesc: LocalizedText;
  departmentId: number;
  category: string;
  processingDays: number;
  fee: string;
  isOnline: boolean;
  popular?: boolean;
  apiStatus: 'live' | 'demo_available' | 'auth_required' | 'under_maintenance' | string;
  requiredDocs: {
    en: string[];
    mr: string[];
    hi: string[];
  };
  eligibility: LocalizedText;
  [key: string]: any;
}

export interface Scheme {
  id: number | string;
  title: LocalizedText;
  department: LocalizedText;
  subsidyBenefit?: LocalizedText;
  eligibility?: LocalizedText;
  applicationDeadline?: string;
  linkText?: LocalizedText;
  badge?: LocalizedText | string;
  beneficiaryType?: LocalizedText | string;
  isNew?: boolean;
  [key: string]: any;
}

export interface TrackingRecord {
  id: string;
  serviceName?: LocalizedText;
  applicantName?: string;
  appliedDate?: string;
  department?: LocalizedText;
  departmentName?: LocalizedText;
  status?: any;
  currentStage?: number;
  totalStages?: number;
  estimatedCompletion?: string;
  officerRemarks?: LocalizedText;
  downloadAvailable?: boolean;
  [key: string]: any;
}

export interface GrievanceRecord {
  id: string;
  department?: any;
  serviceName?: LocalizedText;
  subject?: string;
  description?: string;
  submittedOn?: string;
  date?: string;
  status?: any;
  resolutionDaysLeft?: number;
  officerRemarks?: any;
  [key: string]: any;
}

export interface ApiIntegrationStatusItem {
  id: string;
  name: string;
  department: string;
  deptId?: number;
  apiSetuUrl?: string;
  status: 'connected' | 'auth_required' | 'degraded' | 'offline' | string;
  mode?: string;
  category?: string;
  description?: string;
  supportedDocs?: string[];
  endpoint?: string;
  responseLatencyMs?: number;
  [key: string]: any;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  citizenId?: string;
  officerId?: string;
  department?: string;
  designation?: string;
  phone?: string;
  avatarUrl?: string;
  [key: string]: any;
}

export interface CitizenProfile {
  citizenId: string;
  fullName?: string;
  name?: string;
  dateOfBirth?: string;
  mobile?: string;
  phone?: string;
  email: string;
  gender?: string;
  address?: string;
  district?: string;
  state?: string;
  pincode?: string;
  income?: number;
  annualIncome?: number;
  casteCategory?: string;
  occupation?: string;
  educationQualification?: string;
  bankAccountNo?: string;
  bankIfsc?: string;
  aadhaarNumber: string;
  verifiedDocuments: {
    id?: string;
    type?: string;
    documentType?: string;
    docNumber?: string;
    documentNumber?: string;
    issuingAuthority?: string;
    issuedBy?: string;
    issuedDate?: string;
    verifiedAt?: string;
    status: 'VERIFIED' | 'PENDING' | 'EXPIRED';
    hash?: string;
    verificationHash?: string;
  }[];
  digiLockerLinked?: boolean;
}

export interface GovernmentService {
  id: string;
  code?: string;
  name: any;
  shortDesc?: any;
  description?: string;
  departmentId: any;
  departmentName: string;
  category?: string;
  processingDays: number;
  fee?: any;
  isOnline?: boolean;
  requiredDocs?: any;
  eligibility?: any;
  requiredConsents?: string[];
  icon?: string;
  connectedApis?: string[];
  requiredApis?: string[];
}

export interface ConsentRecord {
  id: string;
  citizenId: string;
  citizenName: string;
  requestingDepartment: string;
  purpose: string;
  requestedFields: string[];
  status: 'ALLOWED' | 'DENIED' | 'PENDING';
  validUntil: string;
  grantedAt?: string;
  revokedAt?: string;
}

export interface ApplicationWorkflowStep {
  stepId: string;
  name: string;
  department: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'REJECTED';
  completedAt?: string;
  remarks: string;
  officerName?: string;
  apiSource?: string;
}

export interface Application {
  id: string;
  citizenId: string;
  citizenName: string;
  citizenEmail: string;
  citizenMobile: string;
  serviceId: string;
  serviceName: string;
  departmentId: string;
  departmentName: string;
  status: 'SUBMITTED' | 'UNDER_VERIFICATION' | 'SCRUTINY' | 'CORRECTION_REQUIRED' | 'APPROVED' | 'REJECTED' | 'FORWARDED';
  currentStepIndex: number;
  appliedDate: string;
  updatedDate: string;
  slaDeadline: string;
  slaViolation: boolean;
  prefilledFields: Record<string, any>;
  submittedData: Record<string, any>;
  verifiedData: Record<string, any>;
  workflowSteps: ApplicationWorkflowStep[];
  officerRemarks?: string;
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  certificateNumber?: string;
  certificateId?: string;
  qrHash?: string;
  createdAt?: string;
  timeline?: any[];
  departmentVerifications?: any[];
  [key: string]: any;
}

export interface Grievance {
  id: string;
  citizenId: string;
  citizenName: string;
  department: string;
  applicationId?: string;
  subject: string;
  description: string;
  status: 'SUBMITTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  updatedAt: string;
  assignedOfficer?: string;
  resolutionRemarks?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'APPLICATION_STATUS' | 'DOCUMENT_VERIFIED' | 'CONSENT_REQUEST' | 'SLA_ALERT' | 'API_FAILURE' | 'SYSTEM_ALERT' | 'APPROVAL' | 'INTEROP';
  read: boolean;
  createdAt: string;
  linkUrl?: string;
  [key: string]: any;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  department: string;
  resource: string;
  timestamp: string;
  result: 'SUCCESS' | 'FAILURE' | 'DENIED';
  ipAddress: string;
  metadata?: Record<string, any>;
}

export interface ApiConnection {
  id: string;
  name: string;
  department: string;
  type: 'REST' | 'SOAP' | 'LEGACY_RPC' | 'GRAPHQL';
  endpoint: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  uptimePercentage: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  avgResponseTimeMs: number;
  lastSync: string;
  errorRatePercentage: number;
  protocolVersion: string;
}

export interface ApiLog {
  id: string;
  apiName: string;
  department: string;
  endpoint: string;
  method: string;
  statusCode: number;
  status: 'SUCCESS' | 'FAILED' | 'TIMEOUT';
  responseTimeMs: number;
  timestamp: string;
  errorMessage?: string;
  requestPayload?: any;
  responsePayload?: any;
  retryCount: number;
  canRetry: boolean;
  sourceDepartment?: string;
  targetDepartment?: string;
  responseCode?: number;
  latencyMs?: number;
  [key: string]: any;
}

export interface InteropStepResult {
  step: string;
  title: string;
  description: string;
  status: 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'SKIPPED';
  durationMs: number;
  endpoint?: string;
  request?: any;
  response?: any;
  cdmData?: any;
}
