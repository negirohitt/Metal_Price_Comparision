import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { metalPrices, generateHistoricalData } from "../data/mockData";

type TimePeriod = 7 | 30;

export function History() {
  const [selectedMetal, setSelectedMetal] = useState("Gold");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(7);

  const currentMetal = metalPrices.find(m => m.name === selectedMetal);
  const historicalData = currentMetal 
    ? generateHistoricalData(currentMetal.price, timePeriod)
    : [];

  return (
    <div>
      {/* Page Title */}
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "10px"
      }}>
        Historical Data
      </h1>
      <p style={{
        color: "#6c757d",
        marginBottom: "30px"
      }}>
        Track price trends over time
      </p>

      {/* Filters Section */}
      <div style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "30px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px"
        }}>
          {/* Metal Selection */}
          <div>
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
              onChange={(e) => setSelectedMetal(e.target.value)}
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

          {/* Time Period Selection */}
          <div>
            <label style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#333"
            }}>
              Time Period:
            </label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value) as TimePeriod)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          marginBottom: "20px",
          color: "#333"
        }}>
          {selectedMetal} Price Trend
        </h2>

        <div style={{ 
          height: "400px",
          width: "100%"
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
              <XAxis 
                dataKey="date" 
                stroke="#666"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#666"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '10px'
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#D4AF37" 
                strokeWidth={2}
                dot={{ fill: '#D4AF37', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}