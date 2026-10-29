import type { MedicalRecord, TimelineEvent, TrendDataPoint, Medication, SharingSession, AuditLogEntry, EmergencyProfileData } from '../types/medvault';

export const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: 'rec-001',
    patientId: 'pat-101',
    fileName: 'Routine_Blood_Test_Report_Aug2026.pdf',
    fileType: 'PDF',
    fileSizeBytes: 1250000,
    category: 'LAB_REPORT',
    uploadDate: '2026-08-12',
    documentDate: '2026-08-10',
    hospital: 'SRL Diagnostics Clinic',
    doctor: 'Dr. Ramesh Sharma (Pathology)',
    fileHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    status: 'EXTRACTION_COMPLETE',
    fileUrl: '#',
    version: 1,
    extraction: {
      id: 'ext-001',
      documentType: 'LAB_REPORT',
      hospitalName: 'SRL Diagnostics Clinic',
      doctorName: 'Dr. Ramesh Sharma',
      documentDate: '2026-08-10',
      summary: 'General Health Blood Test: Hemoglobin 14.2 g/dL (Normal). Fasting Blood Sugar 98 mg/dL (Normal). Total Cholesterol 185 mg/dL (Normal). Platelet count 2.4 lakhs/mcL. Overall healthy blood profile with no pathological abnormalities.',
      facts: [
        {
          id: 'fact-1',
          factKey: 'Hemoglobin (Hb)',
          factValue: '14.2',
          unit: 'g/dL',
          referenceRange: '13.0 - 17.0',
          category: 'CBC',
          pageNumber: 1,
          snippetText: 'Hemoglobin ............ 14.2 g/dL [Normal Reference 13.0 - 17.0]',
          confidence: 0.98
        },
        {
          id: 'fact-2',
          factKey: 'Fasting Blood Sugar',
          factValue: '98',
          unit: 'mg/dL',
          referenceRange: '70 - 100',
          category: 'Blood Sugar',
          pageNumber: 1,
          snippetText: 'Fasting Glucose ........ 98 mg/dL [Normal Range 70 - 100]',
          confidence: 0.96
        },
        {
          id: 'fact-3',
          factKey: 'Total Cholesterol',
          factValue: '185',
          unit: 'mg/dL',
          referenceRange: '125 - 200',
          category: 'Lipid Profile',
          pageNumber: 1,
          snippetText: 'Total Cholesterol ...... 185 mg/dL [Desirable < 200]',
          confidence: 0.97
        },
        {
          id: 'fact-4',
          factKey: 'Platelet Count',
          factValue: '2.4',
          unit: 'lakhs/mcL',
          referenceRange: '1.5 - 4.5',
          category: 'CBC',
          pageNumber: 1,
          snippetText: 'Platelet Count ......... 2.4 lakhs/mcL [Normal 1.5 - 4.5]',
          confidence: 0.99
        }
      ],
      fhirJson: {
        resourceType: 'DiagnosticReport',
        status: 'final',
        category: [{ coding: [{ code: 'LAB', display: 'Laboratory' }] }],
        code: { text: 'Routine Blood Test Panel' }
      }
    }
  },
  {
    id: 'rec-002',
    patientId: 'pat-101',
    fileName: 'Fever_Cold_Prescription_Jul2025.pdf',
    fileType: 'PDF',
    fileSizeBytes: 800000,
    category: 'PRESCRIPTION',
    uploadDate: '2025-07-15',
    documentDate: '2025-07-14',
    hospital: 'Apollo Clinic',
    doctor: 'Dr. Priya Menon (General Physician)',
    fileHash: 'f4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afb',
    status: 'EXTRACTION_COMPLETE',
    fileUrl: '#',
    version: 1,
    extraction: {
      id: 'ext-002',
      documentType: 'PRESCRIPTION',
      hospitalName: 'Apollo Clinic',
      doctorName: 'Dr. Priya Menon',
      documentDate: '2025-07-14',
      summary: 'Outpatient consultation for acute viral fever and cold symptoms. Prescribed Dolo 650mg for body ache/fever and Cetirizine 10mg at bedtime for 3 days. Patient advised warm fluids and bed rest.',
      facts: [
        {
          id: 'fact-5',
          factKey: 'Prescribed Medicine',
          factValue: 'Dolo 650mg (Paracetamol)',
          unit: '1 tablet when fever occurs',
          referenceRange: 'Oral (1-0-1 as needed)',
          category: 'Medication',
          pageNumber: 1,
          snippetText: 'Tab Dolo 650mg - 1-0-1 as needed for fever',
          confidence: 0.97
        },
        {
          id: 'fact-6',
          factKey: 'Prescribed Medicine',
          factValue: 'Cetirizine 10mg',
          unit: '1 tablet at bedtime for 3 days',
          referenceRange: 'Oral (0-0-1 Night)',
          category: 'Medication',
          pageNumber: 1,
          snippetText: 'Tab Cetirizine 10mg - 0-0-1 (Night for 3 days)',
          confidence: 0.98
        },
        {
          id: 'fact-7',
          factKey: 'Recorded Body Temperature',
          factValue: '100.4',
          unit: '°F',
          referenceRange: '97.0 - 99.0',
          category: 'Vital Sign',
          pageNumber: 1,
          snippetText: 'Vitals: Body Temp: 100.4°F, Pulse: 78 bpm',
          confidence: 0.94
        }
      ],
      fhirJson: {
        resourceType: 'MedicationRequest',
        status: 'active',
        intent: 'order'
      }
    }
  },
  {
    id: 'rec-003',
    patientId: 'pat-101',
    fileName: 'Chest_XRay_Routine_Check_Mar2026.pdf',
    fileType: 'PDF',
    fileSizeBytes: 2100000,
    category: 'IMAGING_REPORT',
    uploadDate: '2026-03-16',
    documentDate: '2026-03-14',
    hospital: 'Manipal Hospital Diagnostic Center',
    doctor: 'Dr. Sunita Kapoor (Radiology)',
    fileHash: '91b7852b855e3b0c44298fc1c149afbe3b0c44298fc1c149afbf4c8996fb9247',
    status: 'EXTRACTION_COMPLETE',
    fileUrl: '#',
    version: 1,
    extraction: {
      id: 'ext-003',
      documentType: 'IMAGING_REPORT',
      hospitalName: 'Manipal Hospital Diagnostic Center',
      doctorName: 'Dr. Sunita Kapoor',
      documentDate: '2026-03-14',
      summary: 'Digital Chest X-Ray PA View: Both lung fields are clear and normal. Cardiothoracic ratio is normal. Both costophrenic angles and hemidiaphragms are sharp. No active pulmonary infiltration or cardiac enlargement.',
      facts: [
        {
          id: 'fact-8',
          factKey: 'Imaging Examination',
          factValue: 'Chest X-Ray (PA View)',
          unit: '',
          referenceRange: 'Digital Radiograph',
          category: 'Radiology',
          pageNumber: 1,
          snippetText: 'EXAMINATION: Digital Chest X-Ray (PA View)',
          confidence: 0.99
        },
        {
          id: 'fact-9',
          factKey: 'Clinical Impression',
          factValue: 'Normal Chest Study. Clear Lungs.',
          unit: '',
          referenceRange: 'Normal',
          category: 'Radiology',
          pageNumber: 1,
          snippetText: 'IMPRESSION: Normal study. Bilateral lungs are clear.',
          confidence: 0.95
        }
      ],
      fhirJson: {
        resourceType: 'DiagnosticReport',
        status: 'final',
        category: [{ coding: [{ code: 'RAD', display: 'Radiology' }] }]
      }
    }
  },
  {
    id: 'rec-004',
    patientId: 'pat-101',
    fileName: 'Eye_Power_Checkup_Consultation_Jan2024.pdf',
    fileType: 'PDF',
    fileSizeBytes: 900000,
    category: 'CONSULTATION_NOTE',
    uploadDate: '2024-01-20',
    documentDate: '2024-01-18',
    hospital: 'Sankara Eye Care Hospital',
    doctor: 'Dr. Vikram Rajan (Ophthalmology)',
    fileHash: '7852b855e3b0c44298fc1c149afbe3b0c44298fc1c149afbf4c8996fb92427ae',
    status: 'EXTRACTION_COMPLETE',
    fileUrl: '#',
    version: 1,
    extraction: {
      id: 'ext-004',
      documentType: 'CONSULTATION_NOTE',
      hospitalName: 'Sankara Eye Care Hospital',
      doctorName: 'Dr. Vikram Rajan',
      documentDate: '2024-01-18',
      summary: 'Routine ophthalmology refraction for screen fatigue: Right eye -1.25 D SPH, Left eye -1.25 D SPH. Prescribed anti-reflective spectacle lenses for computer monitor use. Anterior segment and fundus within normal limits.',
      facts: [
        {
          id: 'fact-10',
          factKey: 'Right Eye Glass Power (OD)',
          factValue: '-1.25',
          unit: 'Diopter',
          referenceRange: '0.00 (Emmetropia)',
          category: 'Vision Check',
          pageNumber: 1,
          snippetText: 'OD (Right): SPH -1.25 D, CYL 0.00',
          confidence: 0.98
        },
        {
          id: 'fact-11',
          factKey: 'Left Eye Glass Power (OS)',
          factValue: '-1.25',
          unit: 'Diopter',
          referenceRange: '0.00 (Emmetropia)',
          category: 'Vision Check',
          pageNumber: 1,
          snippetText: 'OS (Left): SPH -1.25 D, CYL 0.00',
          confidence: 0.97
        }
      ],
      fhirJson: {
        resourceType: 'Encounter',
        status: 'finished',
        class: { code: 'AMB', display: 'ambulatory encounter' }
      }
    }
  },
  {
    id: 'rec-005',
    patientId: 'pat-101',
    fileName: 'Cardiology_ECG_Echo_Consultation_May2026.pdf',
    fileType: 'PDF',
    fileSizeBytes: 1750000,
    category: 'CONSULTATION_NOTE',
    uploadDate: '2026-05-22',
    documentDate: '2026-05-20',
    hospital: 'Fortis Heart Institute',
    doctor: 'Dr. Rajesh Iyer (Cardiology)',
    fileHash: '5a4e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b',
    status: 'EXTRACTION_COMPLETE',
    fileUrl: '#',
    version: 1,
    extraction: {
      id: 'ext-005',
      documentType: 'CONSULTATION_NOTE',
      hospitalName: 'Fortis Heart Institute',
      doctorName: 'Dr. Rajesh Iyer',
      documentDate: '2026-05-20',
      summary: 'Comprehensive Cardiac Evaluation: 12-lead ECG demonstrates normal sinus rhythm at 72 bpm. Transthoracic 2D Echocardiogram shows Left Ventricular Ejection Fraction (LVEF) 62% with normal systolic and diastolic function. Blood Pressure 122/78 mmHg. No cardiac murmur.',
      facts: [
        {
          id: 'fact-12',
          factKey: 'Heart Rate / Rhythm',
          factValue: '72 bpm (Normal Sinus Rhythm)',
          unit: 'bpm',
          referenceRange: '60 - 100',
          category: 'Cardiology',
          pageNumber: 1,
          snippetText: 'ECG: Normal sinus rhythm, HR: 72 bpm, axis normal',
          confidence: 0.98
        },
        {
          id: 'fact-13',
          factKey: 'LV Ejection Fraction (LVEF)',
          factValue: '62',
          unit: '%',
          referenceRange: '55 - 70',
          category: 'Echocardiogram',
          pageNumber: 1,
          snippetText: 'Echo: Normal LV systolic function, LVEF calculated 62%',
          confidence: 0.97
        },
        {
          id: 'fact-14',
          factKey: 'Blood Pressure (BP)',
          factValue: '122/78',
          unit: 'mmHg',
          referenceRange: '120/80',
          category: 'Vital Sign',
          pageNumber: 1,
          snippetText: 'Office BP: 122/78 mmHg in right arm seated',
          confidence: 0.99
        }
      ],
      fhirJson: {
        resourceType: 'DiagnosticReport',
        status: 'final',
        category: [{ coding: [{ code: 'CARD', display: 'Cardiology' }] }]
      }
    }
  },
  {
    id: 'rec-006',
    patientId: 'pat-101',
    fileName: 'Inpatient_Discharge_Summary_Appendectomy_Nov2023.pdf',
    fileType: 'PDF',
    fileSizeBytes: 2450000,
    category: 'DISCHARGE_SUMMARY',
    uploadDate: '2023-11-18',
    documentDate: '2023-11-15',
    hospital: 'Aster CMI Hospital',
    doctor: 'Dr. Anand Kulkarni (General Surgery)',
    fileHash: 'c1c149afbf4c8996fb92427ae41e4649b934ca495991b7852be3b0c44298fc14',
    status: 'EXTRACTION_COMPLETE',
    fileUrl: '#',
    version: 1,
    extraction: {
      id: 'ext-006',
      documentType: 'DISCHARGE_SUMMARY',
      hospitalName: 'Aster CMI Hospital',
      doctorName: 'Dr. Anand Kulkarni',
      documentDate: '2023-11-15',
      summary: 'Discharge Summary: Patient admitted 12-Nov-2023 with acute appendicitis. Successfully underwent uneventful Laparoscopic Appendectomy. Discharged in stable condition on 15-Nov-2023. Surgical incision healing cleanly. Suture removal scheduled on postoperative Day 7.',
      facts: [
        {
          id: 'fact-15',
          factKey: 'Surgical Procedure',
          factValue: 'Laparoscopic Appendectomy',
          unit: '',
          referenceRange: 'Surgical Excision',
          category: 'Surgery',
          pageNumber: 1,
          snippetText: 'PROCEDURE: Laparoscopic Appendectomy under General Anesthesia',
          confidence: 0.99
        },
        {
          id: 'fact-16',
          factKey: 'Hospital Stay Duration',
          factValue: '3 Days (12-Nov to 15-Nov-2023)',
          unit: 'days',
          referenceRange: 'Inpatient Stay',
          category: 'Hospitalization',
          pageNumber: 1,
          snippetText: 'Admission: 12/11/2023, Discharge: 15/11/2023',
          confidence: 0.99
        },
        {
          id: 'fact-17',
          factKey: 'Post-Op Followup',
          factValue: 'Suture removal Day 7 at OPD',
          unit: '',
          referenceRange: 'Follow-up',
          category: 'Post-Op Care',
          pageNumber: 2,
          snippetText: 'Advice on discharge: Keep dressing clean, OPD suture removal on Day 7',
          confidence: 0.96
        }
      ],
      fhirJson: {
        resourceType: 'Composition',
        status: 'final',
        type: { text: 'Discharge Summary' }
      }
    }
  },
  {
    id: 'rec-007',
    patientId: 'pat-101',
    fileName: 'Thyroid_Lipid_Panel_Comprehensive_Feb2026.pdf',
    fileType: 'PDF',
    fileSizeBytes: 1380000,
    category: 'LAB_REPORT',
    uploadDate: '2026-02-20',
    documentDate: '2026-02-18',
    hospital: 'Metropolis Healthcare Laboratories',
    doctor: 'Dr. Neha Sharma (Biochemistry)',
    fileHash: '934ca495991b7852be3b0c44298fc14c1c149afbf4c8996fb92427ae41e4649b',
    status: 'EXTRACTION_COMPLETE',
    fileUrl: '#',
    version: 1,
    extraction: {
      id: 'ext-007',
      documentType: 'LAB_REPORT',
      hospitalName: 'Metropolis Healthcare Laboratories',
      doctorName: 'Dr. Neha Sharma',
      documentDate: '2026-02-18',
      summary: 'Metabolic and Endocrine Assessment: Thyroid Stimulating Hormone (TSH) 2.15 uIU/mL (Normal). Free T4 1.28 ng/dL (Normal). Serum Creatinine 0.9 mg/dL (Normal renal function). High Density Lipoprotein (HDL) 48 mg/dL.',
      facts: [
        {
          id: 'fact-18',
          factKey: 'TSH (Thyroid Stimulating Hormone)',
          factValue: '2.15',
          unit: 'uIU/mL',
          referenceRange: '0.40 - 4.50',
          category: 'Endocrine',
          pageNumber: 1,
          snippetText: 'TSH (Ultrasensitive) ...... 2.15 uIU/mL [Normal 0.40 - 4.50]',
          confidence: 0.98
        },
        {
          id: 'fact-19',
          factKey: 'Serum Creatinine',
          factValue: '0.9',
          unit: 'mg/dL',
          referenceRange: '0.7 - 1.3',
          category: 'Renal Function',
          pageNumber: 1,
          snippetText: 'Serum Creatinine .......... 0.9 mg/dL [Normal 0.7 - 1.3]',
          confidence: 0.97
        },
        {
          id: 'fact-20',
          factKey: 'HDL Cholesterol',
          factValue: '48',
          unit: 'mg/dL',
          referenceRange: '> 40',
          category: 'Lipid Profile',
          pageNumber: 1,
          snippetText: 'HDL Cholesterol ........... 48 mg/dL [Normal > 40]',
          confidence: 0.96
        }
      ],
      fhirJson: {
        resourceType: 'DiagnosticReport',
        status: 'final',
        category: [{ coding: [{ code: 'LAB', display: 'Laboratory' }] }]
      }
    }
  }
];

export const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: 'time-1',
    date: '2026-08-10',
    title: 'Routine Blood Test Panel (CBC, Sugar, Lipid)',
    category: 'LAB_REPORT',
    hospital: 'SRL Diagnostics Clinic',
    doctor: 'Dr. Ramesh Sharma',
    summary: 'Hemoglobin 14.2 g/dL, Fasting Sugar 98 mg/dL, Total Cholesterol 185 mg/dL. All parameters within optimal limits.',
    recordId: 'rec-001',
    keyFacts: ['Hemoglobin: 14.2 g/dL', 'Fasting Sugar: 98 mg/dL', 'Total Cholesterol: 185 mg/dL', 'Platelets: 2.4 L/mcL']
  },
  {
    id: 'time-2',
    date: '2026-05-20',
    title: 'Cardiology 12-Lead ECG & 2D Echocardiogram',
    category: 'CONSULTATION_NOTE',
    hospital: 'Fortis Heart Institute',
    doctor: 'Dr. Rajesh Iyer',
    summary: 'Cardiology check: LVEF 62%, Normal Sinus Rhythm, HR 72 bpm, BP 122/78 mmHg. Healthy heart function.',
    recordId: 'rec-005',
    keyFacts: ['LVEF: 62% (Normal)', 'Sinus Rhythm (72 bpm)', 'BP: 122/78 mmHg']
  },
  {
    id: 'time-3',
    date: '2026-03-14',
    title: 'Chest Radiograph (PA View)',
    category: 'IMAGING_REPORT',
    hospital: 'Manipal Hospital Diagnostic Center',
    doctor: 'Dr. Sunita Kapoor',
    summary: 'Chest X-Ray study: Clear lung fields bilaterally, normal heart size, no signs of infection.',
    recordId: 'rec-003',
    keyFacts: ['PA View Normal', 'Bilateral Lungs Clear', 'Normal Cardiothoracic Ratio']
  },
  {
    id: 'time-4',
    date: '2026-02-18',
    title: 'Comprehensive Thyroid & Renal Function Panel',
    category: 'LAB_REPORT',
    hospital: 'Metropolis Healthcare Laboratories',
    doctor: 'Dr. Neha Sharma',
    summary: 'TSH 2.15 uIU/mL (Euthyroid), Creatinine 0.9 mg/dL (Normal kidneys), HDL 48 mg/dL.',
    recordId: 'rec-007',
    keyFacts: ['TSH: 2.15 uIU/mL', 'Serum Creatinine: 0.9 mg/dL', 'HDL: 48 mg/dL']
  },
  {
    id: 'time-5',
    date: '2025-07-14',
    title: 'Outpatient Consultation — Viral Fever & Cold',
    category: 'PRESCRIPTION',
    hospital: 'Apollo Clinic',
    doctor: 'Dr. Priya Menon',
    summary: 'Treated for seasonal viral fever (100.4°F). Prescribed Dolo 650mg and Cetirizine 10mg.',
    recordId: 'rec-002',
    keyFacts: ['Dolo 650mg Prescribed', 'Cetirizine 10mg Prescribed', 'Recorded Temp: 100.4°F']
  },
  {
    id: 'time-6',
    date: '2024-01-18',
    title: 'Ophthalmology Vision & Refraction Check',
    category: 'CONSULTATION_NOTE',
    hospital: 'Sankara Eye Care Hospital',
    doctor: 'Dr. Vikram Rajan',
    summary: 'Refraction examination: -1.25 D both eyes. Anti-reflective lenses prescribed for computer work.',
    recordId: 'rec-004',
    keyFacts: ['Right Eye OD: -1.25 D', 'Left Eye OS: -1.25 D', 'Anti-reflective Lenses']
  },
  {
    id: 'time-7',
    date: '2023-11-15',
    title: 'Inpatient Discharge — Laparoscopic Appendectomy',
    category: 'DISCHARGE_SUMMARY',
    hospital: 'Aster CMI Hospital',
    doctor: 'Dr. Anand Kulkarni',
    summary: 'Laparoscopic Appendectomy successfully performed for acute appendicitis. Discharged stable on post-op Day 3.',
    recordId: 'rec-006',
    keyFacts: ['Procedure: Laparoscopic Appendectomy', 'Stay: 3 Days', 'Suture removal Day 7']
  }
];

export const MOCK_TRENDS: Record<string, TrendDataPoint[]> = {
  hba1c: [
    { date: '2023-05-10', value: 5.2, unit: '%', sourceRecordId: 'rec-old-1', hospital: 'SRL Diagnostics', referenceRange: '4.0 - 5.6' },
    { date: '2024-06-12', value: 5.3, unit: '%', sourceRecordId: 'rec-old-2', hospital: 'SRL Diagnostics', referenceRange: '4.0 - 5.6' },
    { date: '2025-07-14', value: 5.3, unit: '%', sourceRecordId: 'rec-002', hospital: 'Apollo Clinic', referenceRange: '4.0 - 5.6' },
    { date: '2026-08-10', value: 5.4, unit: '%', sourceRecordId: 'rec-001', hospital: 'SRL Diagnostics', referenceRange: '4.0 - 5.6' }
  ],
  glucose: [
    { date: '2023-05-10', value: 90, unit: 'mg/dL', sourceRecordId: 'rec-old-1', hospital: 'SRL Diagnostics', referenceRange: '70 - 100' },
    { date: '2024-06-12', value: 93, unit: 'mg/dL', sourceRecordId: 'rec-old-2', hospital: 'SRL Diagnostics', referenceRange: '70 - 100' },
    { date: '2025-07-14', value: 95, unit: 'mg/dL', sourceRecordId: 'rec-002', hospital: 'Apollo Clinic', referenceRange: '70 - 100' },
    { date: '2026-08-10', value: 98, unit: 'mg/dL', sourceRecordId: 'rec-001', hospital: 'SRL Diagnostics', referenceRange: '70 - 100' }
  ],
  hemoglobin: [
    { date: '2023-05-10', value: 13.9, unit: 'g/dL', sourceRecordId: 'rec-old-1', hospital: 'SRL Diagnostics', referenceRange: '13.0 - 17.0' },
    { date: '2024-06-12', value: 14.0, unit: 'g/dL', sourceRecordId: 'rec-old-2', hospital: 'SRL Diagnostics', referenceRange: '13.0 - 17.0' },
    { date: '2025-07-14', value: 14.1, unit: 'g/dL', sourceRecordId: 'rec-002', hospital: 'Apollo Clinic', referenceRange: '13.0 - 17.0' },
    { date: '2026-08-10', value: 14.2, unit: 'g/dL', sourceRecordId: 'rec-001', hospital: 'SRL Diagnostics', referenceRange: '13.0 - 17.0' }
  ],
  cholesterol: [
    { date: '2023-05-10', value: 172, unit: 'mg/dL', sourceRecordId: 'rec-old-1', hospital: 'SRL Diagnostics', referenceRange: '125 - 200' },
    { date: '2024-06-12', value: 178, unit: 'mg/dL', sourceRecordId: 'rec-old-2', hospital: 'SRL Diagnostics', referenceRange: '125 - 200' },
    { date: '2026-02-18', value: 180, unit: 'mg/dL', sourceRecordId: 'rec-007', hospital: 'Metropolis Labs', referenceRange: '125 - 200' },
    { date: '2026-08-10', value: 185, unit: 'mg/dL', sourceRecordId: 'rec-001', hospital: 'SRL Diagnostics', referenceRange: '125 - 200' }
  ]
};

export const MOCK_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    name: 'Dolo 650mg (Paracetamol)',
    dosage: '650 mg',
    frequency: '1 tablet when fever occurs',
    startDate: '2025-07-14',
    endDate: '2025-07-18',
    status: 'DISCONTINUED',
    doctor: 'Dr. Priya Menon',
    sourceRecordId: 'rec-002'
  },
  {
    id: 'med-2',
    name: 'Cetirizine 10mg',
    dosage: '10 mg',
    frequency: '1 tablet at bedtime for 3 days',
    startDate: '2025-07-14',
    endDate: '2025-07-17',
    status: 'DISCONTINUED',
    doctor: 'Dr. Priya Menon',
    sourceRecordId: 'rec-002'
  },
  {
    id: 'med-3',
    name: 'Vitamin C 500mg Chewable',
    dosage: '500 mg',
    frequency: '1 tablet daily after lunch',
    startDate: '2025-07-14',
    status: 'ACTIVE',
    doctor: 'Dr. Priya Menon',
    sourceRecordId: 'rec-002'
  }
];

export const MOCK_SHARES: SharingSession[] = [
  {
    id: 'share-101',
    recipientName: 'Dr. Priya Menon',
    recipientEmail: 'dr.priya@apolloclinic.com',
    purpose: 'Follow-up Consultation for Fever & Checkup',
    categoriesAllowed: ['LAB_REPORT', 'PRESCRIPTION'],
    createdAt: '2026-10-22 10:30:00',
    expiresAt: '2026-10-23 10:30:00',
    status: 'ACTIVE',
    accessToken: 'mv_share_tok_89a7f3b12e',
    accessCount: 2
  },
  {
    id: 'share-102',
    recipientName: 'Dr. Sunita Kapoor',
    recipientEmail: 'dr.sunita@manipaldiagnostics.com',
    purpose: 'Routine Chest X-Ray Review',
    categoriesAllowed: ['IMAGING_REPORT'],
    createdAt: '2026-03-15 14:00:00',
    expiresAt: '2026-03-16 14:00:00',
    status: 'EXPIRED',
    accessToken: 'mv_share_tok_12c4d5e6f7',
    accessCount: 1
  }
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-22 14:23:11',
    accessorName: 'Dr. Priya Menon',
    accessorRole: 'PROVIDER',
    action: 'DOWNLOAD_RECORD',
    documentTitle: 'Routine_Blood_Test_Report_Aug2026.pdf',
    documentId: 'rec-001',
    ipAddress: '49.207.182.45',
    userAgent: 'Chrome 130.0 / Windows 11'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-22 14:20:05',
    accessorName: 'Dr. Priya Menon',
    accessorRole: 'PROVIDER',
    action: 'VIEW_RECORD',
    documentTitle: 'Fever_Cold_Prescription_Jul2025.pdf',
    documentId: 'rec-002',
    ipAddress: '49.207.182.45',
    userAgent: 'Chrome 130.0 / Windows 11'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-22 14:18:50',
    accessorName: 'Dr. Priya Menon',
    accessorRole: 'PROVIDER',
    action: 'VIEW_TIMELINE',
    ipAddress: '49.207.182.45',
    userAgent: 'Chrome 130.0 / Windows 11'
  }
];

export const MOCK_EMERGENCY_PROFILE: EmergencyProfileData = {
  patientId: 'pat-101',
  fullName: 'Bharath N.',
  dateOfBirth: '1998-11-24',
  bloodGroup: 'O Positive (O+)',
  allergies: ['Dust Allergy', 'No Known Drug Allergies (NKDA)'],
  criticalMedications: ['Vitamin C 500mg Chewable'],
  chronicConditions: ['None (Routine Health Records)'],
  emergencyContacts: [
    { name: 'Kavitha N.', relation: 'Mother', phone: '+91 98450 12345' },
    { name: 'Suresh N.', relation: 'Brother', phone: '+91 98450 67890' }
  ],
  publicToken: 'mv_emg_qr_77a89b0021c',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://medvault.health/e/mv_emg_qr_77a89b0021c',
  isEnabled: true
};
