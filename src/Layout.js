import { Outlet, Link, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // go back to login
  };

  return (
    <div>
      {/* ✅ Navbar */}
      <nav style={{ background: "#003366", padding: "10px", display: "flex", gap: "20px" }}>
        <Link to="/home" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
        <button 
          onClick={handleLogout} 
          style={{ marginLeft: "auto", background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
        >
          Logout
        </button>
      </nav>

      {/* ✅ This will render the child route content */}
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
