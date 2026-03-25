import { Outlet, Link, useLocation } from "react-router";

export function RootLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Top Navbar */}
      <nav style={{
        backgroundColor: "#fff",
        borderBottom: "2px solid #e9ecef",
        padding: "1rem 0"
      }}>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "0 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}>
          {/* Logo/Brand */}
          <div style={{ 
            fontSize: "1.5rem", 
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px"
          }}>
            <span style={{ color: "#D4AF37" }}>💰</span> Metal Price Tracker
          </div>

          {/* Navigation Links */}
          <div style={{ 
            display: "flex", 
            gap: "10px",
            flexWrap: "wrap"
          }}>
            <Link
              to="/"
              style={{
                padding: "8px 16px",
                backgroundColor: isActive("/") ? "#D4AF37" : "transparent",
                color: isActive("/") ? "#fff" : "#333",
                textDecoration: "none",
                borderRadius: "4px",
                border: isActive("/") ? "none" : "1px solid #ddd"
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/compare"
              style={{
                padding: "8px 16px",
                backgroundColor: isActive("/compare") ? "#D4AF37" : "transparent",
                color: isActive("/compare") ? "#fff" : "#333",
                textDecoration: "none",
                borderRadius: "4px",
                border: isActive("/compare") ? "none" : "1px solid #ddd"
              }}
            >
              Compare
            </Link>
            <Link
              to="/history"
              style={{
                padding: "8px 16px",
                backgroundColor: isActive("/history") ? "#D4AF37" : "transparent",
                color: isActive("/history") ? "#fff" : "#333",
                textDecoration: "none",
                borderRadius: "4px",
                border: isActive("/history") ? "none" : "1px solid #ddd"
              }}
            >
              History
            </Link>
            <Link
              to="/admin"
              style={{
                padding: "8px 16px",
                backgroundColor: isActive("/admin") ? "#D4AF37" : "transparent",
                color: isActive("/admin") ? "#fff" : "#333",
                textDecoration: "none",
                borderRadius: "4px",
                border: isActive("/admin") ? "none" : "1px solid #ddd"
              }}
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "30px 15px" 
      }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#fff",
        borderTop: "1px solid #e9ecef",
        padding: "20px 0",
        textAlign: "center",
        color: "#6c757d",
        fontSize: "0.9rem",
        marginTop: "40px"
      }}>
        <p>© 2026 Metal Price Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}