# MedVault — Project Documentation Report

**Project Title**: MedVault — Intelligent Personal Health Record & Medical Document Interoperability Platform  
**Target Domain**: Healthcare Informatics, AI/ML Document Intelligence, Cybersecurity  
**Project Category**: Final Year B.Tech Information Technology Capstone Project  

---

## 1. Executive Summary & Problem Statement

Medical records today remain heavily fragmented across hospital EMR systems, diagnostic laboratories, private clinics, and physical paper prescriptions. Patients lack a single, unified digital health identity where records can be securely preserved, understood over time, and shared under strict consent.

### 1.1 Key Challenges in Current Health Records
- **Data Fragmentation**: Histories are scattered across physical paper, PDFs, and separate hospital portals.
- **Lack of Granular Patient Control**: Patients cannot selectively share specific records (e.g., share an MRI report without exposing unrelated medical notes).
- **Loss of Source Traceability in AI Tools**: Generic medical AI tools synthesize summaries without pointing back to verifiable source documents.
- **All-or-Nothing Emergency Exposure**: Existing QR emergency systems expose either zero info or the patient's entire sensitive medical history.

---

## 2. Proposed Solution

> "Your medical history should belong to you, remain understandable over time, and be shareable only when you choose."

MedVault places the patient at the center of their health data lifecycle through 7 signature features:

1. **DigiLocker-Style Unique Mobile Health Identity**: Enforces 1 Mobile Number = 1 Unique Health Vault ID (`MV-XXXXX-XXXXX`), backed by 6-digit SMS OTP verification and a 4-digit security PIN.
2. **Evidence-Linked Split-Screen Document Viewer**: Side-by-side view of original document evidence with structured clinical facts and clickable "View Source" highlights.
3. **Longitudinal Visual Health Timeline**: Interactive chronological stream grouping consultations, lab panels, radiology, and hospital stays.
4. **Structured Biomarker Trend Plotting**: Quantitative multi-year plots for lab parameters (HbA1c, Fasting Glucose, Total Cholesterol) with reference ranges.
5. **Selective Sharing & Instant Revocation**: Fintech-style temporary session tokens (1h to 7d) with instant one-click revocation control.
6. **Emergency Profile & Public QR Gateway**: Exposes only critical life-saving parameters (blood group, allergies, contacts) during emergency triage.
7. **Source-Grounded AI Assistant**: RAG conversational drawer citing exact document titles, page numbers, and snippets.

---

## 3. System Architecture & Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Recharts | Responsive modern UI, split-screen evidence viewer, trend charts |
| **Backend** | Spring Boot 3.3 (Java 21 LTS), Spring Data JPA, Spring Security | REST API, authorization, session token management |
| **Database** | PostgreSQL 16 / H2 Database | Relational storage for users, documents, extractions, audit logs |
| **AI Subsystem** | Python 3.14, FastAPI, PyMuPDF, Scikit-Learn | OCR text extraction, document classification, NER, FHIR mapping |

---

## 4. Modules Implemented & Completed

- **Module 1: Authentication & Identity Management**: DigiLocker-style unique mobile registration, SMS OTP verification, and per-user data isolation.
- **Module 2: Document Ingestion & Evidence Viewer**: Upload pipeline, OCR classification, and split-screen evidence viewer.
- **Module 3: Visual Health Timeline & Biomarker Trends**: Year-by-year chronological stream and Recharts quantitative metric plots.
- **Module 4: Selective Sharing & Expiration Control**: Category selector, temporary access duration, and instant one-click revocation.
- **Module 5: Patient Privacy & Access Audit Trail**: Real-time access log tracking provider names, IP addresses, and document access timestamps.
- **Module 6: Emergency Profile & QR Code Gateway**: Minimal emergency profile with public QR gateway token.
- **Module 7: Source-Grounded AI Assistant**: RAG conversational assistant with evidence source chips.

---

## 5. Future Upgrades & Extensions

- **Client-Side Cryptographic File Encryption (AES-GCM-256)**: Encrypt document byte streams on the browser before uploading.
- **SMART-on-FHIR Hospital EMR Integration**: Automated pull of lab results directly from hospital systems using FHIR APIs.
- **Offline PWA Mode**: Allow patients to view emergency profiles without active internet connectivity.
- **Blockchain Document Tamper Detection**: Hash document contents onto a private permissioned ledger for immutable proof of authenticity.
- **Multilingual Translation**: Automated translation of complex medical terms into local regional languages.
