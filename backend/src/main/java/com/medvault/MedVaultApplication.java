package com.medvault;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MedVaultApplication {

    public static void main(String[] args) {
        SpringApplication.run(MedVaultApplication.class, args);
        System.out.println("\n=================================================");
        System.out.println(" 🛡️ MedVault Spring Boot Backend Server Started! ");
        System.out.println(" 📍 API Base: http://localhost:8080/api         ");
        System.out.println(" 📊 H2 DB Console: http://localhost:8080/h2-console ");
        System.out.println("=================================================\n");
    }
}
