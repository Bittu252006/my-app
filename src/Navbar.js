import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0">
      <h1 className="text-xl font-bold">My App</h1>
      <ul className="flex gap-6">
        <li><Link to="/home" className="hover:underline">Home</Link></li>
        <li><Link to="/about" className="hover:underline">About Us</Link></li>
        <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
        <li>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
