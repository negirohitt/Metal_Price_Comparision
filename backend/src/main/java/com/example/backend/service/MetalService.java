package com.example.backend.service;

import com.example.backend.model.Metal;
import com.example.backend.repository.MetalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetalService {

    @Autowired
    private MetalRepository repo;

    public List<Metal> getAllMetals() {
        return repo.findAll();
    }

    public Metal addMetal(Metal metal) {
        return repo.save(metal);
    }
}