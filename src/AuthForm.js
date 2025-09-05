// ✅ Always at the very top
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Correct hook

export default function AuthForm() {
  const navigate = useNavigate(); // ✅ FIXED
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    Name: "",
    Age: "",
    Email: "",
    Password: "", // ✅ Capital P (consistent)
    PhoneNo: "",
    Gender: "",
    Role: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Signup response:", data);
      alert("Sign Up Successful!");
      setIsSignIn(true);
    } catch (err) {
      console.error(err);
      alert("Sign Up Failed!");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: formData.Email,
          Password: formData.Password,
        }),
      });
      const data = await res.json();
      console.log("Signin response:", data);

      if (res.ok && data.user) {
        alert(`Welcome ${data.user.name}`);
        navigate("/dashboard"); // ✅ Correct redirect
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Sign In Failed!");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isSignIn ? "active" : ""}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={!isSignIn ? "active" : ""}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {isSignIn ? (
          <form className="form" onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />

            {/* 🔑 Password field with show/hide */}
            <div style={{ position: "relative", marginBottom: "10px" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="Password" // ✅ FIXED (capital P)
                placeholder="Enter Password"
                value={formData.Password}
                onChange={handleChange}
                required
                style={{ width: "100%", paddingRight: "35px" }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">Sign In</button>
          </form>
        ) : (
          <form className="form" onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <input
              type="text"
              name="Name"
              placeholder="Full Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="Age"
              placeholder="Age"
              value={formData.Age}
              onChange={handleChange}
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />

           <div style={{ position: "relative", marginBottom: "10px" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="Password" // ✅ FIXED (capital P)
                placeholder="Enter Password"
                value={formData.Password}
                onChange={handleChange}
                required
                style={{ width: "100%", paddingRight: "35px" }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <input
              type="tel"
              name="PhoneNo"
              placeholder="Phone Number"
              value={formData.PhoneNo}
              onChange={handleChange}
            />
             <select
              name="Role"
              value={formData.Role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">-- Select a Role --</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>

            <div className="gender">
              <label>Gender</label>
              <div className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="male"
                    checked={formData.Gender === "male"}
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="female"
                    checked={formData.Gender === "female"}
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="Gender"
                    value="other"
                    checked={formData.Gender === "other"}
                    onChange={handleChange}
                  />{" "}
                  Other
                </label>
              </div>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
}
