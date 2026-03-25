import { useState } from "react";

interface PriceUpdate {
  metal: string;
  price: string;
  source: string;
}

export function Admin() {
  const [formData, setFormData] = useState<PriceUpdate>({
    metal: "Gold",
    price: "",
    source: "International Market",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate price update
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Reset form
    setFormData({
      metal: "Gold",
      price: "",
      source: "International Market",
    });
  };

  return (
    <div>
      {/* Page Title */}
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "10px"
      }}>
        Admin Panel
      </h1>
      <p style={{
        color: "#6c757d",
        marginBottom: "30px"
      }}>
        Update metal prices manually
      </p>

      {/* Success Message */}
      {showSuccess && (
        <div style={{
          backgroundColor: "#d4edda",
          border: "1px solid #c3e6cb",
          borderRadius: "4px",
          padding: "15px",
          marginBottom: "20px",
          color: "#155724"
        }}>
          ✓ Price updated successfully!
        </div>
      )}

      {/* Update Form */}
      <div style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "30px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        maxWidth: "600px"
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          marginBottom: "20px",
          color: "#333"
        }}>
          Update Price
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Metal Selection */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#333"
            }}>
              Metal Name:
            </label>
            <select
              value={formData.metal}
              onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
              <option value="Palladium">Palladium</option>
            </select>
          </div>

          {/* Price Input */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#333"
            }}>
              Price (USD):
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            />
          </div>

          {/* Source Selection */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#333"
            }}>
              Source / Market:
            </label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              <option value="International Market">International Market</option>
              <option value="London Metal Exchange">London Metal Exchange</option>
              <option value="COMEX">COMEX</option>
              <option value="Indian Market">Indian Market</option>
              <option value="Dubai Market">Dubai Market</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "#D4AF37",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Update Price
          </button>
        </form>
      </div>

      {/* Recent Updates Table */}
      <div style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginTop: "30px"
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
            Recent Updates
          </h2>
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
                  Metal
                </th>
                <th style={{
                  padding: "15px",
                  textAlign: "right",
                  borderBottom: "2px solid #ddd",
                  fontWeight: "bold"
                }}>
                  Price
                </th>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                  fontWeight: "bold"
                }}>
                  Source
                </th>
                <th style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                  fontWeight: "bold"
                }}>
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: "#fff" }}>
                <td style={{ padding: "15px", borderBottom: "1px solid #e9ecef" }}>
                  <strong>Gold</strong>
                </td>
                <td style={{ padding: "15px", textAlign: "right", borderBottom: "1px solid #e9ecef" }}>
                  $6,245.50
                </td>
                <td style={{ padding: "15px", borderBottom: "1px solid #e9ecef" }}>
                  International Market
                </td>
                <td style={{ padding: "15px", borderBottom: "1px solid #e9ecef", color: "#6c757d" }}>
                  5 mins ago
                </td>
              </tr>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <td style={{ padding: "15px", borderBottom: "1px solid #e9ecef" }}>
                  <strong>Silver</strong>
                </td>
                <td style={{ padding: "15px", textAlign: "right", borderBottom: "1px solid #e9ecef" }}>
                  $74.85
                </td>
                <td style={{ padding: "15px", borderBottom: "1px solid #e9ecef" }}>
                  Indian Market
                </td>
                <td style={{ padding: "15px", borderBottom: "1px solid #e9ecef", color: "#6c757d" }}>
                  12 mins ago
                </td>
              </tr>
              <tr style={{ backgroundColor: "#fff" }}>
                <td style={{ padding: "15px", borderBottom: "1px solid #e9ecef" }}>
                  <strong>Platinum</strong>
                </td>
                <td style={{ padding: "15px", textAlign: "right", borderBottom: "1px solid #e9ecef" }}>
                  $1,042.30
                </td>
                <td style={{ padding: "15px", borderBottom: "1px solid #e9ecef" }}>
                  COMEX
                </td>
                <td style={{ padding: "15px", borderBottom: "1px solid #e9ecef", color: "#6c757d" }}>
                  25 mins ago
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}