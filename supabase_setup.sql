-- ========================================================
-- MedVault Platform - Supabase PostgreSQL Schema & Seeder
-- Project: https://yzzeogevneccaqogcyml.supabase.co
-- ========================================================

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    dob VARCHAR(50),
    gender VARCHAR(50),
    blood_group VARCHAR(50),
    health_id VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'PATIENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Medical Documents Table
CREATE TABLE IF NOT EXISTS medical_documents (
    id VARCHAR(255) PRIMARY KEY,
    patient_id VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    file_size_bytes BIGINT,
    category VARCHAR(100),
    document_date VARCHAR(50),
    hospital VARCHAR(255),
    doctor VARCHAR(255),
    file_hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'EXTRACTION_COMPLETE',
    summary VARCHAR(8000),
    facts_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Sharing Sessions Table
CREATE TABLE IF NOT EXISTS sharing_sessions (
    id VARCHAR(255) PRIMARY KEY,
    patient_phone VARCHAR(255),
    recipient_name VARCHAR(255),
    recipient_email VARCHAR(255),
    purpose VARCHAR(500),
    categories_allowed VARCHAR(1000),
    access_token VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at VARCHAR(50),
    expires_at VARCHAR(50),
    access_count INTEGER DEFAULT 0
);

-- ========================================================
-- 4. Seed Relatable Demo Patient Profile & Clinical Documents
-- ========================================================

INSERT INTO users (id, email, password, name, phone, dob, gender, blood_group, health_id, role, created_at)
VALUES ('usr-101', 'bharath.demo@medvault.health', 'password123', 'Bharath N. (Demo)', '9845012345', '1998-11-24', 'Male', 'O+', 'MV-DEMO-98450', 'PATIENT', NOW())
ON CONFLICT (email) DO UPDATE SET password = 'password123';

INSERT INTO medical_documents (id, patient_id, file_name, file_type, file_size_bytes, category, document_date, hospital, doctor, file_hash, status, summary, facts_json, created_at)
VALUES 
('rec-001', 'bharath.demo@medvault.health', 'Routine_Blood_Test_Report_Aug2026.pdf', 'PDF', 1250000, 'LAB_REPORT', '2026-08-10', 'SRL Diagnostics Clinic', 'Dr. Ramesh Sharma (Pathology)', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'EXTRACTION_COMPLETE', 'General Health Blood Test: Hemoglobin 14.2 g/dL (Normal). Fasting Blood Sugar 98 mg/dL (Normal). Total Cholesterol 185 mg/dL (Normal). Overall healthy blood panel with no abnormalities.', '[{"id":"fact-1","factKey":"Hemoglobin (Hb)","factValue":"14.2","unit":"g/dL","referenceRange":"13.0 - 17.0","category":"CBC","pageNumber":1,"snippetText":"Hemoglobin ............ 14.2 g/dL [Normal]","confidence":0.98},{"id":"fact-2","factKey":"Fasting Blood Sugar","factValue":"98","unit":"mg/dL","referenceRange":"70 - 100","category":"Blood Sugar","pageNumber":1,"snippetText":"Fasting Glucose ........ 98 mg/dL [Normal]","confidence":0.96},{"id":"fact-3","factKey":"Total Cholesterol","factValue":"185","unit":"mg/dL","referenceRange":"125 - 200","category":"Lipid Profile","pageNumber":1,"snippetText":"Total Cholesterol ...... 185 mg/dL [Normal]","confidence":0.97},{"id":"fact-4","factKey":"Platelet Count","factValue":"2.4","unit":"lakhs/mcL","referenceRange":"1.5 - 4.5","category":"CBC","pageNumber":1,"snippetText":"Platelet Count ......... 2.4 lakhs/mcL [Normal]","confidence":0.99}]', NOW()),

('rec-002', 'bharath.demo@medvault.health', 'Fever_Cold_Prescription_Jul2025.pdf', 'PDF', 800000, 'PRESCRIPTION', '2025-07-14', 'Apollo Clinic', 'Dr. Priya Menon (General Physician)', 'f4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afb', 'EXTRACTION_COMPLETE', 'Outpatient consultation for acute viral fever and cold symptoms. Prescribed Dolo 650mg for body ache/fever and Cetirizine 10mg at bedtime for 3 days. Patient advised warm fluids and bed rest.', '[{"id":"fact-5","factKey":"Prescribed Medicine","factValue":"Dolo 650mg (Paracetamol)","unit":"1 tab when fever occurs","referenceRange":"Oral","category":"Medication","pageNumber":1,"snippetText":"Tab Dolo 650mg - 1-0-1 as needed for fever","confidence":0.97},{"id":"fact-6","factKey":"Prescribed Medicine","factValue":"Cetirizine 10mg","unit":"1 tab at bedtime for 3 days","referenceRange":"Oral","category":"Medication","pageNumber":1,"snippetText":"Tab Cetirizine 10mg - 0-0-1 (Night)","confidence":0.98},{"id":"fact-7","factKey":"Recorded Body Temperature","factValue":"100.4","unit":"°F","referenceRange":"97.0 - 99.0","category":"Vital Sign","pageNumber":1,"snippetText":"Vitals: Body Temp: 100.4°F, Pulse: 78 bpm","confidence":0.94}]', NOW()),

('rec-003', 'bharath.demo@medvault.health', 'Chest_XRay_Routine_Check_Mar2026.pdf', 'PDF', 2100000, 'IMAGING_REPORT', '2026-03-14', 'Manipal Hospital Diagnostic Center', 'Dr. Sunita Kapoor (Radiology)', '91b7852b855e3b0c44298fc1c149afbe3b0c44298fc1c149afbf4c8996fb9247', 'EXTRACTION_COMPLETE', 'Digital Chest X-Ray PA View: Both lung fields are clear and normal. Cardiothoracic ratio is normal. Both costophrenic angles and hemidiaphragms are sharp. No active pulmonary infiltration.', '[{"id":"fact-8","factKey":"Imaging Examination","factValue":"Chest X-Ray (PA View)","unit":"","referenceRange":"Digital Radiograph","category":"Radiology","pageNumber":1,"snippetText":"EXAMINATION: Digital Chest X-Ray (PA View)","confidence":0.99},{"id":"fact-9","factKey":"Clinical Impression","factValue":"Normal Chest Study. Clear Lungs.","unit":"","referenceRange":"Normal","category":"Radiology","pageNumber":1,"snippetText":"IMPRESSION: Normal study. Bilateral lungs are clear.","confidence":0.95}]', NOW()),

('rec-004', 'bharath.demo@medvault.health', 'Eye_Power_Checkup_Consultation_Jan2024.pdf', 'PDF', 900000, 'CONSULTATION_NOTE', '2024-01-18', 'Sankara Eye Care Hospital', 'Dr. Vikram Rajan (Ophthalmology)', '7852b855e3b0c44298fc1c149afbe3b0c44298fc1c149afbf4c8996fb92427ae', 'EXTRACTION_COMPLETE', 'Routine ophthalmology refraction for screen fatigue: Right eye -1.25 D SPH, Left eye -1.25 D SPH. Prescribed anti-reflective spectacle lenses for computer monitor use. Fundus and intraocular pressure normal.', '[{"id":"fact-10","factKey":"Right Eye Glass Power (OD)","factValue":"-1.25","unit":"Diopter","referenceRange":"0.00 (Emmetropia)","category":"Vision Check","pageNumber":1,"snippetText":"OD (Right): SPH -1.25 D","confidence":0.98},{"id":"fact-11","factKey":"Left Eye Glass Power (OS)","factValue":"-1.25","unit":"Diopter","referenceRange":"0.00 (Emmetropia)","category":"Vision Check","pageNumber":1,"snippetText":"OS (Left): SPH -1.25 D","confidence":0.97}]', NOW()),

('rec-005', 'bharath.demo@medvault.health', 'Cardiology_ECG_Echo_Consultation_May2026.pdf', 'PDF', 1750000, 'CONSULTATION_NOTE', '2026-05-20', 'Fortis Heart Institute', 'Dr. Rajesh Iyer (Cardiology)', '5a4e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b', 'EXTRACTION_COMPLETE', 'Comprehensive Cardiac Evaluation: 12-lead ECG demonstrates normal sinus rhythm at 72 bpm. Transthoracic 2D Echocardiogram shows Left Ventricular Ejection Fraction (LVEF) 62% with normal systolic and diastolic function. Blood Pressure 122/78 mmHg.', '[{"id":"fact-12","factKey":"Heart Rate / Rhythm","factValue":"72 bpm (Normal Sinus Rhythm)","unit":"bpm","referenceRange":"60 - 100","category":"Cardiology","pageNumber":1,"snippetText":"ECG: Normal sinus rhythm, HR: 72 bpm, axis normal","confidence":0.98},{"id":"fact-13","factKey":"LV Ejection Fraction (LVEF)","factValue":"62","unit":"%","referenceRange":"55 - 70","category":"Echocardiogram","pageNumber":1,"snippetText":"Echo: Normal LV systolic function, LVEF calculated 62%","confidence":0.97},{"id":"fact-14","factKey":"Blood Pressure (BP)","factValue":"122/78","unit":"mmHg","referenceRange":"120/80","category":"Vital Sign","pageNumber":1,"snippetText":"Office BP: 122/78 mmHg in right arm seated","confidence":0.99}]', NOW()),

('rec-006', 'bharath.demo@medvault.health', 'Inpatient_Discharge_Summary_Appendectomy_Nov2023.pdf', 'PDF', 2450000, 'DISCHARGE_SUMMARY', '2023-11-15', 'Aster CMI Hospital', 'Dr. Anand Kulkarni (General Surgery)', 'c1c149afbf4c8996fb92427ae41e4649b934ca495991b7852be3b0c44298fc14', 'EXTRACTION_COMPLETE', 'Discharge Summary: Patient admitted 12-Nov-2023 with acute appendicitis. Successfully underwent uneventful Laparoscopic Appendectomy. Discharged in stable condition on 15-Nov-2023. Surgical incision healing cleanly. Suture removal scheduled on postoperative Day 7.', '[{"id":"fact-15","factKey":"Surgical Procedure","factValue":"Laparoscopic Appendectomy","unit":"","referenceRange":"Surgical Excision","category":"Surgery","pageNumber":1,"snippetText":"PROCEDURE: Laparoscopic Appendectomy under General Anesthesia","confidence":0.99},{"id":"fact-16","factKey":"Hospital Stay Duration","factValue":"3 Days (12-Nov to 15-Nov-2023)","unit":"days","referenceRange":"Inpatient","category":"Hospitalization","pageNumber":1,"snippetText":"Admission: 12/11/2023, Discharge: 15/11/2023","confidence":0.99},{"id":"fact-17","factKey":"Post-Op Followup","factValue":"Suture removal Day 7 at OPD","unit":"","referenceRange":"Follow-up","category":"Post-Op Care","pageNumber":2,"snippetText":"Advice on discharge: Keep dressing clean, OPD suture removal on Day 7","confidence":0.96}]', NOW()),

('rec-007', 'bharath.demo@medvault.health', 'Thyroid_Lipid_Panel_Comprehensive_Feb2026.pdf', 'PDF', 1380000, 'LAB_REPORT', '2026-02-18', 'Metropolis Healthcare Laboratories', 'Dr. Neha Sharma (Biochemistry)', '934ca495991b7852be3b0c44298fc14c1c149afbf4c8996fb92427ae41e4649b', 'EXTRACTION_COMPLETE', 'Metabolic and Endocrine Assessment: Thyroid Stimulating Hormone (TSH) 2.15 uIU/mL (Normal). Free T4 1.28 ng/dL (Normal). Serum Creatinine 0.9 mg/dL (Normal renal function). High Density Lipoprotein (HDL) 48 mg/dL.', '[{"id":"fact-18","factKey":"TSH (Thyroid Stimulating Hormone)","factValue":"2.15","unit":"uIU/mL","referenceRange":"0.40 - 4.50","category":"Endocrine","pageNumber":1,"snippetText":"TSH (Ultrasensitive) ...... 2.15 uIU/mL [Normal]","confidence":0.98},{"id":"fact-19","factKey":"Serum Creatinine","factValue":"0.9","unit":"mg/dL","referenceRange":"0.7 - 1.3","category":"Renal Function","pageNumber":1,"snippetText":"Serum Creatinine .......... 0.9 mg/dL [Normal]","confidence":0.97},{"id":"fact-20","factKey":"HDL Cholesterol","factValue":"48","unit":"mg/dL","referenceRange":"> 40","category":"Lipid Profile","pageNumber":1,"snippetText":"HDL Cholesterol ........... 48 mg/dL [Normal]","confidence":0.96}]', NOW())
ON CONFLICT (id) DO UPDATE SET summary = EXCLUDED.summary;
