package com.medvault.repository;

import com.medvault.entity.MedicalDocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalDocumentRepository extends JpaRepository<MedicalDocumentEntity, String> {
    List<MedicalDocumentEntity> findByPatientId(String patientId);
}
