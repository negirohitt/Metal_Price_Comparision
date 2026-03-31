package com.example.backend.repository;

import com.example.backend.model.Metal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetalRepository extends JpaRepository<Metal, Long> {
}