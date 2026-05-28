// src/pages/Login.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import profile  from "../assets/logo.png";

/* // after successful login
const { token } = await res.json();
localStorage.setItem('token', token);
// future requests:
fetch('/api/protected', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});
*/

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setError(null);
    setSuccess(null);
    if (name === "password") setPasswordError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.username || !formData.password) {
      setError("Please enter username and password.");
      return;
    }

    if (formData.password.length < 8 || formData.password.length > 12) {
      setPasswordError("Password must be 8 to 12 characters.");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Login failed");
      }

      localStorage.setItem("loggedIn", "true");
      setSuccess("Login successful");
      setPasswordError(null);
      setFormData({ username: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar showLinks={false} />

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

          {/* Image + Title */}
          <div className="flex justify-center items-center mb-5">
            <img src={profile} alt="user" className="w-20 h-20 m-0 rounded-full object-cover" />
            <h2 className="text-xl font-semibold mt-2 text-black">Account Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            {/* Forgot Password */}
            <Link to="/forgot-password" className="text-sm text-red-500 text-right">
              Forgot password?
            </Link>

            <button type="submit" className="btn-common bg-blue-500 hover:bg-blue-600">
              Login
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm">
              Don't have account?{" "}
              <Link to="/signup" className="text-red-500">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;