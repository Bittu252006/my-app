import React, { useState } from "react";

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    Name: "",
    Age: "",
    Email: "",
    Password: "",
    PhoneNo: "",
    Gender: "",
    Role: "",
  });

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
      setIsSignIn(true); // Switch to Sign In after signup
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
      if (data.user) alert(`Welcome ${data.user.name}`);
      else alert("Invalid credentials");
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
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
            <a href="#">Forgot Password?</a>
            <button type="submit">Sign In</button>
            <p>
              Don’t have an account?{" "}
              <span
                style={{ color: "#033452", cursor: "pointer" }}
                onClick={() => setIsSignIn(false)}
              >
                Sign Up
              </span>
            </p>
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
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="PhoneNo"
              placeholder="Phone Number"
              value={formData.PhoneNo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="Role"
              placeholder="Role"
              value={formData.Role}
              onChange={handleChange}
            />
            <div className="gender">
              <label className="text-gray-700 font-medium">Gender</label>
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
            <p>
              Already have an account?{" "}
              <span
                style={{ color: "#033452", cursor: "pointer" }}
                onClick={() => setIsSignIn(true)}
              >
                Sign In
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}