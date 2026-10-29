package com.medvault.config;

import com.medvault.entity.MedicalDocumentEntity;
import com.medvault.entity.UserEntity;
import com.medvault.repository.MedicalDocumentRepository;
import com.medvault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MedicalDocumentRepository documentRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("⚡ [MedVault DatabaseSeeder] Checking database seeding status...");

        // 1. Seed Demo User
        String demoEmail = "bharath.demo@medvault.health";
        Optional<UserEntity> existingUser = userRepository.findByEmail(demoEmail);
        if (existingUser.isEmpty()) {
            UserEntity demo = new UserEntity(
                demoEmail,
                "password123",
                "Bharath N. (Demo)",
                "9845012345",
                "1998-11-24",
                "Male",
                "O+",
                "MV-DEMO-98450"
            );
            userRepository.save(demo);
            System.out.println("✅ [MedVault DatabaseSeeder] Seeded demo user: " + demoEmail);
        } else {
            UserEntity user = existingUser.get();
            if (!"password123".equals(user.getPassword())) {
                user.setPassword("password123");
                userRepository.save(user);
                System.out.println("✅ [MedVault DatabaseSeeder] Updated demo user password to: password123");
            }
        }

        // 2. Seed Medical Documents if not already populated for demo user
        long docCount = documentRepository.findByPatientId(demoEmail).size();
        if (docCount == 0) {
            seedSampleDocuments(demoEmail);
            System.out.println("✅ [MedVault DatabaseSeeder] Seeded 7 clinical sample documents for " + demoEmail);
        } else {
            System.out.println("ℹ️ [MedVault DatabaseSeeder] Demo documents already present (" + docCount + " records).");
        }
    }

    private void seedSampleDocuments(String patientId) {
        // Doc 1: Routine Blood Test Report
        MedicalDocumentEntity doc1 = new MedicalDocumentEntity();
        doc1.setId("rec-001");
        doc1.setPatientId(patientId);
        doc1.setFileName("Routine_Blood_Test_Report_Aug2026.pdf");
        doc1.setFileType("PDF");
        doc1.setFileSizeBytes(1250000L);
        doc1.setCategory("LAB_REPORT");
        doc1.setDocumentDate("2026-08-10");
        doc1.setHospital("SRL Diagnostics Clinic");
        doc1.setDoctor("Dr. Ramesh Sharma (Pathology)");
        doc1.setFileHash("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        doc1.setStatus("EXTRACTION_COMPLETE");
        doc1.setSummary("General Health Blood Test: Hemoglobin 14.2 g/dL (Normal). Fasting Blood Sugar 98 mg/dL (Normal). Total Cholesterol 185 mg/dL (Normal). Overall healthy blood panel with no abnormalities.");
        doc1.setFactsJson("[{\"id\":\"fact-1\",\"factKey\":\"Hemoglobin (Hb)\",\"factValue\":\"14.2\",\"unit\":\"g/dL\",\"referenceRange\":\"13.0 - 17.0\",\"category\":\"CBC\",\"pageNumber\":1,\"snippetText\":\"Hemoglobin ............ 14.2 g/dL [Normal]\",\"confidence\":0.98},{\"id\":\"fact-2\",\"factKey\":\"Fasting Blood Sugar\",\"factValue\":\"98\",\"unit\":\"mg/dL\",\"referenceRange\":\"70 - 100\",\"category\":\"Blood Sugar\",\"pageNumber\":1,\"snippetText\":\"Fasting Glucose ........ 98 mg/dL [Normal]\",\"confidence\":0.96},{\"id\":\"fact-3\",\"factKey\":\"Total Cholesterol\",\"factValue\":\"185\",\"unit\":\"mg/dL\",\"referenceRange\":\"125 - 200\",\"category\":\"Lipid Profile\",\"pageNumber\":1,\"snippetText\":\"Total Cholesterol ...... 185 mg/dL [Normal]\",\"confidence\":0.97},{\"id\":\"fact-4\",\"factKey\":\"Platelet Count\",\"factValue\":\"2.4\",\"unit\":\"lakhs/mcL\",\"referenceRange\":\"1.5 - 4.5\",\"category\":\"CBC\",\"pageNumber\":1,\"snippetText\":\"Platelet Count ......... 2.4 lakhs/mcL [Normal]\",\"confidence\":0.99}]");
        documentRepository.save(doc1);

        // Doc 2: Viral Fever Prescription
        MedicalDocumentEntity doc2 = new MedicalDocumentEntity();
        doc2.setId("rec-002");
        doc2.setPatientId(patientId);
        doc2.setFileName("Fever_Cold_Prescription_Jul2025.pdf");
        doc2.setFileType("PDF");
        doc2.setFileSizeBytes(800000L);
        doc2.setCategory("PRESCRIPTION");
        doc2.setDocumentDate("2025-07-14");
        doc2.setHospital("Apollo Clinic");
        doc2.setDoctor("Dr. Priya Menon (General Physician)");
        doc2.setFileHash("f4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afb");
        doc2.setStatus("EXTRACTION_COMPLETE");
        doc2.setSummary("Outpatient consultation for acute viral fever and cold symptoms. Prescribed Dolo 650mg for body ache/fever and Cetirizine 10mg at bedtime for 3 days. Patient advised warm fluids and bed rest.");
        doc2.setFactsJson("[{\"id\":\"fact-5\",\"factKey\":\"Prescribed Medicine\",\"factValue\":\"Dolo 650mg (Paracetamol)\",\"unit\":\"1 tab when fever occurs\",\"referenceRange\":\"Oral\",\"category\":\"Medication\",\"pageNumber\":1,\"snippetText\":\"Tab Dolo 650mg - 1-0-1 as needed for fever\",\"confidence\":0.97},{\"id\":\"fact-6\",\"factKey\":\"Prescribed Medicine\",\"factValue\":\"Cetirizine 10mg\",\"unit\":\"1 tab at bedtime for 3 days\",\"referenceRange\":\"Oral\",\"category\":\"Medication\",\"pageNumber\":1,\"snippetText\":\"Tab Cetirizine 10mg - 0-0-1 (Night)\",\"confidence\":0.98},{\"id\":\"fact-7\",\"factKey\":\"Recorded Body Temperature\",\"factValue\":\"100.4\",\"unit\":\"°F\",\"referenceRange\":\"97.0 - 99.0\",\"category\":\"Vital Sign\",\"pageNumber\":1,\"snippetText\":\"Vitals: Body Temp: 100.4°F, Pulse: 78 bpm\",\"confidence\":0.94}]");
        documentRepository.save(doc2);

        // Doc 3: Chest Radiograph PA View
        MedicalDocumentEntity doc3 = new MedicalDocumentEntity();
        doc3.setId("rec-003");
        doc3.setPatientId(patientId);
        doc3.setFileName("Chest_XRay_Routine_Check_Mar2026.pdf");
        doc3.setFileType("PDF");
        doc3.setFileSizeBytes(2100000L);
        doc3.setCategory("IMAGING_REPORT");
        doc3.setDocumentDate("2026-03-14");
        doc3.setHospital("Manipal Hospital Diagnostic Center");
        doc3.setDoctor("Dr. Sunita Kapoor (Radiology)");
        doc3.setFileHash("91b7852b855e3b0c44298fc1c149afbe3b0c44298fc1c149afbf4c8996fb9247");
        doc3.setStatus("EXTRACTION_COMPLETE");
        doc3.setSummary("Digital Chest X-Ray PA View: Both lung fields are clear and normal. Cardiothoracic ratio is normal. Both costophrenic angles and hemidiaphragms are sharp. No active pulmonary infiltration.");
        doc3.setFactsJson("[{\"id\":\"fact-8\",\"factKey\":\"Imaging Examination\",\"factValue\":\"Chest X-Ray (PA View)\",\"unit\":\"\",\"referenceRange\":\"Digital Radiograph\",\"category\":\"Radiology\",\"pageNumber\":1,\"snippetText\":\"EXAMINATION: Digital Chest X-Ray (PA View)\",\"confidence\":0.99},{\"id\":\"fact-9\",\"factKey\":\"Clinical Impression\",\"factValue\":\"Normal Chest Study. Clear Lungs.\",\"unit\":\"\",\"referenceRange\":\"Normal\",\"category\":\"Radiology\",\"pageNumber\":1,\"snippetText\":\"IMPRESSION: Normal study. Bilateral lungs are clear.\",\"confidence\":0.95}]");
        documentRepository.save(doc3);

        // Doc 4: Eye Power Checkup
        MedicalDocumentEntity doc4 = new MedicalDocumentEntity();
        doc4.setId("rec-004");
        doc4.setPatientId(patientId);
        doc4.setFileName("Eye_Power_Checkup_Consultation_Jan2024.pdf");
        doc4.setFileType("PDF");
        doc4.setFileSizeBytes(900000L);
        doc4.setCategory("CONSULTATION_NOTE");
        doc4.setDocumentDate("2024-01-18");
        doc4.setHospital("Sankara Eye Care Hospital");
        doc4.setDoctor("Dr. Vikram Rajan (Ophthalmology)");
        doc4.setFileHash("7852b855e3b0c44298fc1c149afbe3b0c44298fc1c149afbf4c8996fb92427ae");
        doc4.setStatus("EXTRACTION_COMPLETE");
        doc4.setSummary("Routine ophthalmology refraction for screen fatigue: Right eye -1.25 D SPH, Left eye -1.25 D SPH. Prescribed anti-reflective spectacle lenses for computer monitor use. Fundus and intraocular pressure normal.");
        doc4.setFactsJson("[{\"id\":\"fact-10\",\"factKey\":\"Right Eye Glass Power (OD)\",\"factValue\":\"-1.25\",\"unit\":\"Diopter\",\"referenceRange\":\"0.00 (Emmetropia)\",\"category\":\"Vision Check\",\"pageNumber\":1,\"snippetText\":\"OD (Right): SPH -1.25 D\",\"confidence\":0.98},{\"id\":\"fact-11\",\"factKey\":\"Left Eye Glass Power (OS)\",\"factValue\":\"-1.25\",\"unit\":\"Diopter\",\"referenceRange\":\"0.00 (Emmetropia)\",\"category\":\"Vision Check\",\"pageNumber\":1,\"snippetText\":\"OS (Left): SPH -1.25 D\",\"confidence\":0.97}]");
        documentRepository.save(doc4);

        // Doc 5: Cardiology Consultation & 2D Echo Report
        MedicalDocumentEntity doc5 = new MedicalDocumentEntity();
        doc5.setId("rec-005");
        doc5.setPatientId(patientId);
        doc5.setFileName("Cardiology_ECG_Echo_Consultation_May2026.pdf");
        doc5.setFileType("PDF");
        doc5.setFileSizeBytes(1750000L);
        doc5.setCategory("CONSULTATION_NOTE");
        doc5.setDocumentDate("2026-05-20");
        doc5.setHospital("Fortis Heart Institute");
        doc5.setDoctor("Dr. Rajesh Iyer (Cardiology)");
        doc5.setFileHash("5a4e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b");
        doc5.setStatus("EXTRACTION_COMPLETE");
        doc5.setSummary("Comprehensive Cardiac Evaluation: 12-lead ECG demonstrates normal sinus rhythm at 72 bpm. Transthoracic 2D Echocardiogram shows Left Ventricular Ejection Fraction (LVEF) 62% with normal systolic and diastolic function. Blood Pressure 122/78 mmHg.");
        doc5.setFactsJson("[{\"id\":\"fact-12\",\"factKey\":\"Heart Rate / Rhythm\",\"factValue\":\"72 bpm (Normal Sinus Rhythm)\",\"unit\":\"bpm\",\"referenceRange\":\"60 - 100\",\"category\":\"Cardiology\",\"pageNumber\":1,\"snippetText\":\"ECG: Normal sinus rhythm, HR: 72 bpm, axis normal\",\"confidence\":0.98},{\"id\":\"fact-13\",\"factKey\":\"LV Ejection Fraction (LVEF)\",\"factValue\":\"62\",\"unit\":\"%\",\"referenceRange\":\"55 - 70\",\"category\":\"Echocardiogram\",\"pageNumber\":1,\"snippetText\":\"Echo: Normal LV systolic function, LVEF calculated 62%\",\"confidence\":0.97},{\"id\":\"fact-14\",\"factKey\":\"Blood Pressure (BP)\",\"factValue\":\"122/78\",\"unit\":\"mmHg\",\"referenceRange\":\"120/80\",\"category\":\"Vital Sign\",\"pageNumber\":1,\"snippetText\":\"Office BP: 122/78 mmHg in right arm seated\",\"confidence\":0.99}]");
        documentRepository.save(doc5);

        // Doc 6: Inpatient Hospital Discharge Summary (Appendectomy)
        MedicalDocumentEntity doc6 = new MedicalDocumentEntity();
        doc6.setId("rec-006");
        doc6.setPatientId(patientId);
        doc6.setFileName("Inpatient_Discharge_Summary_Appendectomy_Nov2023.pdf");
        doc6.setFileType("PDF");
        doc6.setFileSizeBytes(2450000L);
        doc6.setCategory("DISCHARGE_SUMMARY");
        doc6.setDocumentDate("2023-11-15");
        doc6.setHospital("Aster CMI Hospital");
        doc6.setDoctor("Dr. Anand Kulkarni (General Surgery)");
        doc6.setFileHash("c1c149afbf4c8996fb92427ae41e4649b934ca495991b7852be3b0c44298fc14");
        doc6.setStatus("EXTRACTION_COMPLETE");
        doc6.setSummary("Discharge Summary: Patient admitted 12-Nov-2023 with acute appendicitis. Successfully underwent uneventful Laparoscopic Appendectomy. Discharged in stable condition on 15-Nov-2023. Surgical incision healing cleanly. Suture removal scheduled on postoperative Day 7.");
        doc6.setFactsJson("[{\"id\":\"fact-15\",\"factKey\":\"Surgical Procedure\",\"factValue\":\"Laparoscopic Appendectomy\",\"unit\":\"\",\"referenceRange\":\"Surgical Excision\",\"category\":\"Surgery\",\"pageNumber\":1,\"snippetText\":\"PROCEDURE: Laparoscopic Appendectomy under General Anesthesia\",\"confidence\":0.99},{\"id\":\"fact-16\",\"factKey\":\"Hospital Stay Duration\",\"factValue\":\"3 Days (12-Nov to 15-Nov-2023)\",\"unit\":\"days\",\"referenceRange\":\"Inpatient\",\"category\":\"Hospitalization\",\"pageNumber\":1,\"snippetText\":\"Admission: 12/11/2023, Discharge: 15/11/2023\",\"confidence\":0.99},{\"id\":\"fact-17\",\"factKey\":\"Post-Op Followup\",\"factValue\":\"Suture removal Day 7 at OPD\",\"unit\":\"\",\"referenceRange\":\"Follow-up\",\"category\":\"Post-Op Care\",\"pageNumber\":2,\"snippetText\":\"Advice on discharge: Keep dressing clean, OPD suture removal on Day 7\",\"confidence\":0.96}]");
        documentRepository.save(doc6);

        // Doc 7: Comprehensive Metabolic & Thyroid Panel
        MedicalDocumentEntity doc7 = new MedicalDocumentEntity();
        doc7.setId("rec-007");
        doc7.setPatientId(patientId);
        doc7.setFileName("Thyroid_Lipid_Panel_Comprehensive_Feb2026.pdf");
        doc7.setFileType("PDF");
        doc7.setFileSizeBytes(1380000L);
        doc7.setCategory("LAB_REPORT");
        doc7.setDocumentDate("2026-02-18");
        doc7.setHospital("Metropolis Healthcare Laboratories");
        doc7.setDoctor("Dr. Neha Sharma (Biochemistry)");
        doc7.setFileHash("934ca495991b7852be3b0c44298fc14c1c149afbf4c8996fb92427ae41e4649b");
        doc7.setStatus("EXTRACTION_COMPLETE");
        doc7.setSummary("Metabolic and Endocrine Assessment: Thyroid Stimulating Hormone (TSH) 2.15 uIU/mL (Normal). Free T4 1.28 ng/dL (Normal). Serum Creatinine 0.9 mg/dL (Normal renal function). High Density Lipoprotein (HDL) 48 mg/dL.");
        doc7.setFactsJson("[{\"id\":\"fact-18\",\"factKey\":\"TSH (Thyroid Stimulating Hormone)\",\"factValue\":\"2.15\",\"unit\":\"uIU/mL\",\"referenceRange\":\"0.40 - 4.50\",\"category\":\"Endocrine\",\"pageNumber\":1,\"snippetText\":\"TSH (Ultrasensitive) ...... 2.15 uIU/mL [Normal]\",\"confidence\":0.98},{\"id\":\"fact-19\",\"factKey\":\"Serum Creatinine\",\"factValue\":\"0.9\",\"unit\":\"mg/dL\",\"referenceRange\":\"0.7 - 1.3\",\"category\":\"Renal Function\",\"pageNumber\":1,\"snippetText\":\"Serum Creatinine .......... 0.9 mg/dL [Normal]\",\"confidence\":0.97},{\"id\":\"fact-20\",\"factKey\":\"HDL Cholesterol\",\"factValue\":\"48\",\"unit\":\"mg/dL\",\"referenceRange\":\"> 40\",\"category\":\"Lipid Profile\",\"pageNumber\":1,\"snippetText\":\"HDL Cholesterol ........... 48 mg/dL [Normal]\",\"confidence\":0.96}]");
        documentRepository.save(doc7);
    }
}
