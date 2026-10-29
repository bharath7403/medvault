package com.medvault.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    private String phone;
    private String dob;
    private String gender;
    private String bloodGroup;

    @Column(unique = true, nullable = false)
    private String healthId;

    private String role = "PATIENT";

    private LocalDateTime createdAt = LocalDateTime.now();

    public UserEntity() {}

    public UserEntity(String email, String password, String name, String phone, String dob, String gender, String bloodGroup, String healthId) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.dob = dob;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.healthId = healthId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public String getHealthId() { return healthId; }
    public void setHealthId(String healthId) { this.healthId = healthId; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
