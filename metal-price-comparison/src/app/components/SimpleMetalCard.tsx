import { MetalPrice } from "../data/mockData";

interface SimpleMetalCardProps {
  metal: MetalPrice;
}

export function SimpleMetalCard({ metal }: SimpleMetalCardProps) {
  const isPositive = metal.change >= 0;

  return (
    <div style={{
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      {/* Metal Name */}
      <h3 style={{
        margin: "0 0 10px 0",
        fontSize: "1.2rem",
        color: "#333"
      }}>
        {metal.name}
      </h3>

      {/* Price */}
      <div style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
        margin: "10px 0"
      }}>
        ${metal.price.toLocaleString()}
      </div>

      <div style={{
        fontSize: "0.9rem",
        color: "#6c757d",
        marginBottom: "15px"
      }}>
        {metal.unit}
      </div>

      {/* Change */}
      <div style={{
        fontSize: "1rem",
        color: isPositive ? "#28a745" : "#dc3545",
        fontWeight: "bold"
      }}>
        {isPositive ? "↑" : "↓"} {isPositive ? "+" : ""}{metal.change.toFixed(2)} ({isPositive ? "+" : ""}{metal.changePercent.toFixed(2)}%)
      </div>

      {/* Last Updated */}
      <div style={{
        marginTop: "15px",
        paddingTop: "15px",
        borderTop: "1px solid #e9ecef",
        fontSize: "0.8rem",
        color: "#999"
      }}>
        Updated {metal.lastUpdated}
      </div>
    </div>
  );
}
