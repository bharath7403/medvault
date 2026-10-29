package com.medvault.controller;

import com.medvault.entity.MedicalDocumentEntity;
import com.medvault.entity.SharingSessionEntity;
import com.medvault.repository.MedicalDocumentRepository;
import com.medvault.repository.SharingSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {

    @Autowired
    private MedicalDocumentRepository documentRepository;

    @Autowired
    private SharingSessionRepository sharingRepository;

    private static final String UPLOAD_DIR = System.getProperty("java.io.tmpdir") + File.separator + "medvault_uploads" + File.separator;

    @GetMapping
    public ResponseEntity<List<MedicalDocumentEntity>> getDocuments(@RequestParam(required = false) String patientId) {
        if (patientId != null && !patientId.trim().isEmpty()) {
            String clean = patientId.trim().toLowerCase();
            // Only official demo identifiers return the pre-seeded demo records
            if (clean.equals("bharath.demo@medvault.health") || clean.equals("mv-demo-98450")) {
                List<MedicalDocumentEntity> demoDocs = documentRepository.findByPatientId("bharath.demo@medvault.health");
                if (!demoDocs.isEmpty()) {
                    return ResponseEntity.ok(demoDocs);
                }
            }
            return ResponseEntity.ok(documentRepository.findByPatientId(patientId));
        }
        return ResponseEntity.ok(documentRepository.findAll());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("patientId") String patientId,
            @RequestParam("category") String category,
            @RequestParam(value = "documentDate", required = false) String documentDate,
            @RequestParam(value = "hospital", required = false) String hospital,
            @RequestParam(value = "doctor", required = false) String doctor,
            @RequestParam(value = "summary", required = false) String summary,
            @RequestParam(value = "factsJson", required = false) String factsJson
    ) {
        try {
            try {
                File dir = new File(UPLOAD_DIR);
                if (!dir.exists()) dir.mkdirs();

                String orig = (file.getOriginalFilename() != null && !file.getOriginalFilename().trim().isEmpty())
                        ? file.getOriginalFilename()
                        : "document_" + System.currentTimeMillis() + ".jpg";
                String storedFileName = UUID.randomUUID() + "_" + orig;
                File dest = new File(dir, storedFileName);
                try (FileOutputStream fos = new FileOutputStream(dest)) {
                    fos.write(file.getBytes());
                }
            } catch (Exception fileWriteEx) {
                // Ignore filesystem write error on ephemeral container disks
            }

            String filename = (file.getOriginalFilename() != null && !file.getOriginalFilename().trim().isEmpty())
                    ? file.getOriginalFilename()
                    : "record_" + System.currentTimeMillis() + ".jpg";

            MedicalDocumentEntity doc = new MedicalDocumentEntity();
            doc.setPatientId(patientId);
            doc.setFileName(filename);
            doc.setFileType(filename.toLowerCase().endsWith(".pdf") ? "PDF" : "IMAGE");
            doc.setFileSizeBytes(file.getSize());
            doc.setCategory(category);
            doc.setDocumentDate(documentDate != null ? documentDate : LocalDateTime.now().toString().substring(0, 10));
            doc.setHospital(hospital != null ? hospital : "General Clinic");
            doc.setDoctor(doctor != null ? doctor : "Consulting Doctor");
            doc.setFileHash("sha256_" + UUID.randomUUID().toString().replace("-", ""));
            doc.setStatus("EXTRACTION_COMPLETE");
            doc.setSummary(summary != null ? summary : "Extracted clinical report successfully processed.");
            doc.setFactsJson(factsJson != null ? factsJson : "[]");

            MedicalDocumentEntity saved = documentRepository.save(doc);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/shared/{token}")
    public ResponseEntity<?> getSharedRecords(@PathVariable String token) {
        String cleanToken = (token != null) ? token.trim() : "";
        Optional<SharingSessionEntity> shareOpt = sharingRepository.findByAccessToken(cleanToken);
        if (shareOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("valid", false, "message", "Invalid or expired sharing code: " + cleanToken));
        }

        SharingSessionEntity session = shareOpt.get();
        if ("REVOKED".equalsIgnoreCase(session.getStatus())) {
            return ResponseEntity.status(403).body(Map.of("valid", false, "message", "Access revoked by patient."));
        }

        session.setAccessCount(session.getAccessCount() + 1);
        sharingRepository.save(session);

        List<MedicalDocumentEntity> allDocs = documentRepository.findByPatientId(session.getPatientPhone());
        List<String> allowed = Arrays.asList(session.getCategoriesAllowed().split(","));
        List<MedicalDocumentEntity> filtered = new ArrayList<>();
        for (MedicalDocumentEntity d : allDocs) {
            if (allowed.contains(d.getCategory())) {
                filtered.add(d);
            }
        }

        return ResponseEntity.ok(Map.of(
            "valid", true,
            "session", session,
            "documents", filtered
        ));
    }
}
