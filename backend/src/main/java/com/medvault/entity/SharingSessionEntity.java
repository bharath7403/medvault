package com.medvault.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sharing_sessions")
public class SharingSessionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String patientPhone;
    private String recipientName;
    private String recipientEmail;
    private String purpose;

    @Column(length = 1000)
    private String categoriesAllowed; // Comma separated: LAB_REPORT,PRESCRIPTION,etc.

    private String accessToken;
    private String status = "ACTIVE"; // ACTIVE, REVOKED, EXPIRED
    private String createdAt;
    private String expiresAt;
    private Integer accessCount = 0;

    public SharingSessionEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getPatientPhone() { return patientPhone; }
    public void setPatientPhone(String patientPhone) { this.patientPhone = patientPhone; }
    public String getRecipientName() { return recipientName; }
    public void setRecipientName(String recipientName) { this.recipientName = recipientName; }
    public String getRecipientEmail() { return recipientEmail; }
    public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public String getCategoriesAllowed() { return categoriesAllowed; }
    public void setCategoriesAllowed(String categoriesAllowed) { this.categoriesAllowed = categoriesAllowed; }
    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    public String getExpiresAt() { return expiresAt; }
    public void setExpiresAt(String expiresAt) { this.expiresAt = expiresAt; }
    public Integer getAccessCount() { return accessCount; }
    public void setAccessCount(Integer accessCount) { this.accessCount = accessCount; }
}
