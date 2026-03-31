package com.example.backend.controller;

import com.example.backend.model.Metal;
import com.example.backend.service.MetalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metals")
@CrossOrigin(origins = "*")
public class MetalController {

    @Autowired
    private MetalService service;

    @GetMapping
    public List<Metal> getMetals() {
        return service.getAllMetals();
    }

    @PostMapping
    public Metal addMetal(@RequestBody Metal metal) {
        return service.addMetal(metal);
    }
}