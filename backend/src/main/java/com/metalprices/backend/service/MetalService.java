package com.metalprices.backend.service;

import com.metalprices.backend.model.Metal;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service  // Tells Spring: this is a service class
public class MetalService {

    // Hardcoded data for now (will move to DB later)
    private List<Metal> metals = new ArrayList<>(List.of(
            new Metal("Gold",     "Delhi",   72000, "per 10g", "2025-04-14"),
            new Metal("Gold",     "Mumbai",  72500, "per 10g", "2025-04-14"),
            new Metal("Gold",     "Chennai", 71800, "per 10g", "2025-04-14"),
            new Metal("Silver",   "Delhi",    850,  "per 100g","2025-04-14"),
            new Metal("Silver",   "Mumbai",   860,  "per 100g","2025-04-14"),
            new Metal("Platinum", "Delhi",   30000, "per 10g", "2025-04-14"),
            new Metal("Palladium","Delhi",   28000, "per 10g", "2025-04-14")
    ));

    public List<Metal> getAllMetals() {
        return metals;
    }

    public List<Metal> getByCity(String city) {
        return metals.stream()
                .filter(m -> m.getCity().equalsIgnoreCase(city))
                .collect(Collectors.toList());
    }

    public List<Metal> getByName(String name) {
        return metals.stream()
                .filter(m -> m.getName().equalsIgnoreCase(name))
                .collect(Collectors.toList());
    }

    public void updatePrice(String name, String city, double newPrice) {
        metals.forEach(m -> {
            if (m.getName().equalsIgnoreCase(name) && m.getCity().equalsIgnoreCase(city)) {
                m.setPrice(newPrice);
            }
        });
    }
}