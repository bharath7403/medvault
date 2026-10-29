# MedVault — Intelligent Personal Health Record & Medical Interoperability Platform

MedVault is a secure, patient-controlled personal health record (PHR) platform designed to aggregate, extract, structure, visualize, search, and selectively share lifelong medical records with evidence grounding and HL7 FHIR interoperability.

> **"Your medical history should belong to you, remain understandable over time, and be shareable only when you choose."**

---

## 🌟 Core Innovations & Signature Features

1. **Intelligent Medical Ingestion**: Drag & drop PDF/image lab reports, prescriptions, radiology reports, and discharge summaries with automated OCR and NER classification.
2. **Evidence-Linked Grounding**: Every extracted clinical observation links directly back to its original source document with visual bounding box highlights.
3. **Longitudinal Health Timeline**: Visual year-by-year chronological stream of all consultations, diagnostic reports, and medical milestones.
4. **Health Trend Visualization**: Interactive Recharts plots of historical quantitative lab parameters (HbA1c, Fasting Glucose, Cholesterol) with reference ranges.
5. **Medication Timeline & Conflict Detection**: Aggregates pharmacological statements and flags dosage inconsistencies across prescriptions for physician review.
6. **Selective Sharing & Expiration Control**: Grant temporary access tokens to doctors for 1h, 24h, or 7d with specific category permissions and instant one-click revocation.
7. **Patient Privacy & Audit Log**: Real-time log of every provider, IP address, and timestamp accessing your medical records.
8. **Emergency Health Profile & Secure QR**: Exposes only life-saving parameters (blood group, allergies, emergency contacts) via a secure gateway QR token — never full medical history.
9. **Source-Grounded AI Assistant**: RAG conversational drawer over your records with citation chips linking directly to source document coordinates.

---

## 🛠️ Technology Stack

* **Frontend**: React + TypeScript + Vite + Tailwind CSS + Framer Motion + Recharts + Lucide Icons.
* **Backend**: Spring Boot 3.3 (Java 21) Modular Backend (`Controller -> Service -> Repository -> Database`) with Spring Security & JWT Token Auth.
* **Database**: PostgreSQL 16 / H2 database driver.
* **AI Engine**: Python FastAPI service with PyMuPDF, Scikit-Learn, and HL7 FHIR JSON normalizer.

---

## 🚀 Quick Start Guide

### 1. Launching Frontend Application
```bash
cd frontend
npm install
npm run dev
```
Access the application UI at `http://localhost:3000`.

### 2. Launching Backend Service
```bash
cd backend
mvnw spring-boot:run
```
Backend API will listen on `http://localhost:8080`.

### 3. Launching Python AI Service
```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
FastAPI AI documentation available at `http://localhost:8000/docs`.

---

## 🔒 Security & Privacy Notice
MedVault operates strictly on evidence grounding. AI outputs organize and extract information from user-uploaded records and are explicitly marked as non-diagnostic. Patient data ownership is guaranteed through token hashing and instant revocation mechanisms.
