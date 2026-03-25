import { useState } from "react";
import { cityPrices } from "../data/mockData";

type MetalType = "gold" | "silver" | "platinum";

export function Comparison() {
  const [selectedMetal, setSelectedMetal] = useState<MetalType>("gold");

  const prices = cityPrices.map(city => city[selectedMetal]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div>
      {/* Page Title */}
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "10px"
      }}>
        Compare Prices
      </h1>
      <p style={{
        color: "#6c757d",
        marginBottom: "30px"
      }}>
        Compare metal prices across different cities
      </p>

      {/* Filter Section */}
      <div style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "30px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <label style={{
          display: "block",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#333"
        }}>
          Select Metal:
        </label>
        <select
          value={selectedMetal}
          onChange={(e) => setSelectedMetal(e.target.value as MetalType)}
          style={{
            width: "100%",
            maxWidth: "300px",
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ddd",
            borderRadius: "4px"
          }}
        >
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="platinum">Platinum</option>
        </select>
      </div>

      {/* Comparison Table */}
      <div style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          padding: "20px",
          borderBottom: "1px solid #ddd"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            margin: 0,
            color: "#333"
          }}>
            City-wise Prices
          </h2>
          <p style={{
            margin: "5px 0 0 0",
            fontSize: "0.9rem",
            color: "#6c757d"
          }}>
            All prices in INR per 10 grams
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                  fontWeight: "bold"
                }}>
                  City
                </th>
                <th style={{
                  padding: "15px",
                  textAlign: "right",
                  borderBottom: "2px solid #ddd",
                  fontWeight: "bold"
                }}>
                  Price (INR)
                </th>
                <th style={{
                  padding: "15px",
                  textAlign: "center",
                  borderBottom: "2px solid #ddd",
                  fontWeight: "bold"
                }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {cityPrices.map((city, index) => {
                const price = city[selectedMetal];
                const isLowest = price === minPrice;
                const isHighest = price === maxPrice;

                return (
                  <tr key={index} style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa"
                  }}>
                    <td style={{
                      padding: "15px",
                      borderBottom: "1px solid #e9ecef"
                    }}>
                      <strong>{city.city}</strong>
                    </td>
                    <td style={{
                      padding: "15px",
                      textAlign: "right",
                      borderBottom: "1px solid #e9ecef",
                      fontSize: "1.1rem",
                      fontWeight: "bold"
                    }}>
                      ₹{price.toLocaleString()}
                    </td>
                    <td style={{
                      padding: "15px",
                      textAlign: "center",
                      borderBottom: "1px solid #e9ecef"
                    }}>
                      {isLowest && (
                        <span style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          backgroundColor: "#28a745",
                          color: "#fff",
                          borderRadius: "20px",
                          fontSize: "0.85rem",
                          fontWeight: "bold"
                        }}>
                          Lowest
                        </span>
                      )}
                      {isHighest && (
                        <span style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          borderRadius: "20px",
                          fontSize: "0.85rem",
                          fontWeight: "bold"
                        }}>
                          Highest
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}