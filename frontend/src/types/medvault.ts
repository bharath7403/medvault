export type Role = 'PATIENT' | 'PROVIDER' | 'ADMIN';

export type DocumentCategory = 
  | 'LAB_REPORT' 
  | 'PRESCRIPTION' 
  | 'DISCHARGE_SUMMARY' 
  | 'IMAGING_REPORT' 
  | 'CONSULTATION_NOTE' 
  | 'VACCINATION' 
  | 'OTHER';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  healthId: string;
  role: Role;
  avatarUrl?: string;
  password?: string;
}

export interface MedicalFact {
  id: string;
  factKey: string;
  factValue: string;
  unit?: string;
  referenceRange?: string;
  category: string;
  pageNumber: number;
  snippetText: string;
  confidence: number;
}

export interface DocumentExtraction {
  id: string;
  documentType: DocumentCategory;
  hospitalName: string;
  doctorName: string;
  documentDate: string;
  facts: MedicalFact[];
  summary: string;
  fhirJson: Record<string, any>;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  fileName: string;
  fileType: 'PDF' | 'PNG' | 'JPG' | 'IMAGE';
  fileSizeBytes: number;
  category: DocumentCategory;
  uploadDate: string;
  documentDate: string;
  hospital: string;
  doctor: string;
  fileHash: string;
  status: 'UPLOADED' | 'EXTRACTING' | 'EXTRACTION_COMPLETE' | 'FAILED';
  fileUrl: string;
  extraction: DocumentExtraction;
  version: number;
  hasConflict?: boolean;
  conflictDescription?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  category: DocumentCategory;
  hospital: string;
  doctor: string;
  summary: string;
  recordId: string;
  keyFacts: string[];
}

export interface TrendDataPoint {
  date: string;
  value: number;
  unit: string;
  sourceRecordId: string;
  hospital: string;
  referenceRange: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'ACTIVE' | 'DISCONTINUED';
  doctor: string;
  sourceRecordId: string;
  conflictFlag?: boolean;
}

export interface SharingSession {
  id: string;
  recipientName: string;
  recipientEmail: string;
  purpose: string;
  categoriesAllowed: DocumentCategory[];
  createdAt: string;
  expiresAt: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  accessToken: string;
  accessCount: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  accessorName: string;
  accessorRole: Role;
  action: 'VIEW_RECORD' | 'DOWNLOAD_RECORD' | 'VIEW_TIMELINE' | 'ACCESS_EMERGENCY';
  documentTitle?: string;
  documentId?: string;
  ipAddress: string;
  userAgent: string;
}

export interface EmergencyProfileData {
  patientId: string;
  fullName: string;
  dateOfBirth: string;
  bloodGroup: string;
  allergies: string[];
  criticalMedications: string[];
  chronicConditions: string[];
  emergencyContacts: {
    name: string;
    relation: string;
    phone: string;
  }[];
  publicToken: string;
  qrCodeUrl: string;
  isEnabled: boolean;
}

export interface AiChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: string;
  sources?: {
    documentId: string;
    documentTitle: string;
    page: number;
    snippet: string;
  }[];
}
