import { SimpleMetalCard } from "../components/SimpleMetalCard";
import { metalPrices } from "../data/mockData";

export function Dashboard() {
  return (
    <div>
      {/* Page Title */}
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "10px"
      }}>
        Dashboard
      </h1>
      <p style={{
        color: "#6c757d",
        marginBottom: "30px"
      }}>
        Live Metal Prices - Real-time tracking
      </p>

      {/* Metal Price Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginBottom: "40px"
      }}>
        {metalPrices.map((metal) => (
          <SimpleMetalCard key={metal.name} metal={metal} />
        ))}
      </div>

      {/* Market Status Section */}
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
          Market Status
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px"
        }}>
          <div style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px"
          }}>
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>International Market</div>
            <span style={{
              display: "inline-block",
              padding: "4px 12px",
              backgroundColor: "#28a745",
              color: "#fff",
              borderRadius: "20px",
              fontSize: "0.85rem"
            }}>
              Open
            </span>
          </div>

          <div style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px"
          }}>
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Indian Market</div>
            <span style={{
              display: "inline-block",
              padding: "4px 12px",
              backgroundColor: "#28a745",
              color: "#fff",
              borderRadius: "20px",
              fontSize: "0.85rem"
            }}>
              Open
            </span>
          </div>

          <div style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px"
          }}>
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>London Metal Exchange</div>
            <span style={{
              display: "inline-block",
              padding: "4px 12px",
              backgroundColor: "#28a745",
              color: "#fff",
              borderRadius: "20px",
              fontSize: "0.85rem"
            }}>
              Open
            </span>
          </div>

          <div style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px"
          }}>
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>COMEX</div>
            <span style={{
              display: "inline-block",
              padding: "4px 12px",
              backgroundColor: "#ffc107",
              color: "#333",
              borderRadius: "20px",
              fontSize: "0.85rem"
            }}>
              Pre-Market
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}