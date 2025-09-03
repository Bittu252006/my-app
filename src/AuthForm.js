import React, { useState } from "react";

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    phone_no: "",
    gender: "",
    role: "",
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
          email: formData.email,
          password: formData.password,
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
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
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
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone_no"
              placeholder="Phone Number"
              value={formData.phone_no}
              onChange={handleChange}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
            />
            <div className="gender">
              <label className="text-gray-700 font-medium">Gender</label>
              <div className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === "other"}
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
