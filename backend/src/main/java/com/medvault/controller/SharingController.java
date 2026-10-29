package com.medvault.controller;

import com.medvault.entity.SharingSessionEntity;
import com.medvault.repository.SharingSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/shares")
@CrossOrigin(origins = "*")
public class SharingController {

    @Autowired
    private SharingSessionRepository sharingRepository;

    @GetMapping
    public ResponseEntity<List<SharingSessionEntity>> getShares(@RequestParam(required = false) String patientPhone) {
        if (patientPhone != null && !patientPhone.trim().isEmpty()) {
            return ResponseEntity.ok(sharingRepository.findByPatientPhone(patientPhone));
        }
        return ResponseEntity.ok(sharingRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createShare(@RequestBody Map<String, Object> payload) {
        try {
            SharingSessionEntity session = new SharingSessionEntity();
            session.setPatientPhone((String) payload.get("patientPhone"));
            session.setRecipientName((String) payload.get("recipientName"));
            session.setRecipientEmail((String) payload.get("recipientEmail"));
            session.setPurpose((String) payload.get("purpose"));

            Object catsObj = payload.get("categoriesAllowed");
            if (catsObj instanceof List) {
                session.setCategoriesAllowed(String.join(",", (List<String>) catsObj));
            } else if (catsObj instanceof String) {
                session.setCategoriesAllowed((String) catsObj);
            } else {
                session.setCategoriesAllowed("LAB_REPORT,PRESCRIPTION,IMAGING_REPORT");
            }

            session.setCreatedAt((String) payload.get("createdAt"));
            session.setExpiresAt((String) payload.get("expiresAt"));
            session.setAccessToken("mv_tok_" + UUID.randomUUID().toString().substring(0, 12));
            session.setStatus("ACTIVE");
            session.setAccessCount(0);

            SharingSessionEntity saved = sharingRepository.save(session);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}/revoke")
    public ResponseEntity<?> revokeShare(@PathVariable String id) {
        Optional<SharingSessionEntity> opt = sharingRepository.findById(id);
        if (opt.isPresent()) {
            SharingSessionEntity session = opt.get();
            session.setStatus("REVOKED");
            sharingRepository.save(session);
            return ResponseEntity.ok(Map.of("success", true, "message", "Session revoked"));
        }
        return ResponseEntity.notFound().build();
    }
}
