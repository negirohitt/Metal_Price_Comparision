package com.metalprices.backend.controller;

import com.metalprices.backend.model.Metal;
import com.metalprices.backend.service.MetalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class MetalController {

    @Autowired  // Spring automatically injects MetalService here
    private MetalService metalService;

    // GET /api/prices  → returns all metals
    @GetMapping("/prices")
    public List<Metal> getAllPrices() {
        return metalService.getAllMetals();
    }

    // GET /api/prices/city/Delhi  → metals in a specific city
    @GetMapping("/prices/city/{city}")
    public List<Metal> getByCity(@PathVariable String city) {
        return metalService.getByCity(city);
    }

    // GET /api/prices/metal/Gold  → all cities for a specific metal
    @GetMapping("/prices/metal/{name}")
    public List<Metal> getByMetal(@PathVariable String name) {
        return metalService.getByName(name);
    }

    // PUT /api/prices/update  → admin updates a price
    // Request body: { "name": "Gold", "city": "Delhi", "price": 73000 }
    @PutMapping("/prices/update")
    public String updatePrice(@RequestBody UpdateRequest request) {
        metalService.updatePrice(request.getName(), request.getCity(), request.getPrice());
        return "Price updated successfully";
    }

    // Inner class for update request body
    static class UpdateRequest {
        private String name;
        private String city;
        private double price;
        // Getters and setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }
        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
    }
}