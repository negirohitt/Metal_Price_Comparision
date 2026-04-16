package com.metalprices.backend.model;

public class Metal {
    private String name;       // "Gold", "Silver", etc.
    private String city;       // "Delhi", "Mumbai", etc.
    private double price;      // price in INR
    private String unit;       // "per 10g", "per kg"
    private String lastUpdated;

    // Constructor
    public Metal(String name, String city, double price, String unit, String lastUpdated) {
        this.name = name;
        this.city = city;
        this.price = price;
        this.unit = unit;
        this.lastUpdated = lastUpdated;
    }

    // Getters and Setters (Spring needs these to convert to JSON)
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(String lastUpdated) { this.lastUpdated = lastUpdated; }
}