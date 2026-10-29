package com.medvault.controller;

import com.medvault.entity.UserEntity;
import com.medvault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        String name = payload.get("name");
        String phone = payload.get("phone");
        String dob = payload.get("dob");
        String gender = payload.get("gender");
        String bloodGroup = payload.get("bloodGroup");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email address is required."));
        }
        if (password == null || password.trim().length() < 4) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Password must be at least 4 characters."));
        }

        String cleanEmail = email.trim().toLowerCase();

        if (userRepository.existsByEmail(cleanEmail)) {
            Optional<UserEntity> existingOpt = userRepository.findByEmail(cleanEmail);
            if (existingOpt.isPresent() && password.equals(existingOpt.get().getPassword())) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Account found! Logged in successfully.",
                    "user", existingOpt.get()
                ));
            }
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "An account with email " + cleanEmail + " already exists. Please sign in."
            ));
        }

        // Generate Health ID e.g. MV-EM-XXXXXX
        String shortId = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        String healthId = "MV-" + shortId;

        UserEntity user = new UserEntity(cleanEmail, password, name != null ? name : "Patient", phone, dob, gender, bloodGroup, healthId);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Account registered successfully!",
            "user", user
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email and password are required."));
        }

        String cleanEmail = email.trim().toLowerCase();
        Optional<UserEntity> userOpt = userRepository.findByEmail(cleanEmail);

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "No MedVault account found with email " + cleanEmail));
        }

        UserEntity user = userOpt.get();
        if (!password.equals(user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Invalid password. Please check your credentials."));
        }

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Authenticated successfully!",
            "user", user
        ));
    }
}
