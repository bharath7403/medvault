package com.medvault.repository;

import com.medvault.entity.SharingSessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SharingSessionRepository extends JpaRepository<SharingSessionEntity, String> {
    List<SharingSessionEntity> findByPatientPhone(String patientPhone);
    Optional<SharingSessionEntity> findByAccessToken(String accessToken);
}
