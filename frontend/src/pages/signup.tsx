// src/pages/Signup.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import maleProfile from "../assets/male_profile.png";
import femaleProfile from "../assets/female_profile.png";
import othersProfile from "../assets/others_profile.png";

/* Backend endpoint should look like this
fetch("/api/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...formData, age: ageNumber }),
});
*/

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    sex: "Male",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const profileImages: Record<string, string> = {
    Male: maleProfile,
    Female: femaleProfile,
    Others: othersProfile,
  };

  const getSelectedProfileImage = () => profileImages[formData.sex] || othersProfile;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setPasswordError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!/^[A-Za-z0-9_]+$/.test(formData.username)) {
      setError("Username may only contain letters, numbers, and underscore.");
      return;
    }

    if (formData.password.length < 8 || formData.password.length > 12) {
      setPasswordError("Password must be 8 to 12 characters.");
      return;
    }

    const ageNumber = Number(formData.age);
    if (!ageNumber || ageNumber < 21 || ageNumber > 65) {
      setError("Age must be between 21 and 65.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          username: formData.username,
          age: ageNumber,
          sex: formData.sex,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message || "Signup failed");
      }

      setSuccess("Signup successful. You can now login.");
      setPasswordError(null);
      localStorage.setItem("userSex", formData.sex);
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        age: "",
        sex: "Male",
        email: "",
        password: "",
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      <Navbar showLinks={false} />

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md m-auto">

          <div className="flex flex-col items-center gap-4 mb-6 text-black">
            <div className="flex items-center gap-4">
              <img
                src={getSelectedProfileImage()}
                alt={`${formData.sex} profile`}
                className="w-16 h-16 rounded-full border border-gray-300 object-cover"
              />
              
              <h2 className="text-xl font-semibold text-center mb-6 text-black">
                Sign Up
              </h2>
              
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 w-24">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="flex-1 border p-2 rounded-md"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 w-24">
                Last Name
              </label>
              <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="flex-1 border p-2 rounded-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700 w-24">
              {passwordError && (
                <p className="text-sm text-red-500 ml-24">{passwordError}</p>
              )}
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="letters/numbers/_ only"
                pattern="^[A-Za-z0-9_]+$"
                title="Username may only contain letters, numbers, and underscore"
                value={formData.username}
                onChange={handleChange}
                className="flex-1 border p-2 rounded-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="age" className="text-sm font-medium text-gray-700 w-24">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                required
                min={21}
                max={65}
                placeholder="21-65"
                title="Age must be between 21 and 65"
                value={formData.age}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 w-24">Sex</span>
              <div className="flex gap-4">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="sex"
                    value="Male"
                    checked={formData.sex === "Male"}
                    onChange={handleChange}
                    className="border bg-transparent"
                  />
                  Male
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="sex"
                    value="Female"
                    checked={formData.sex === "Female"}
                    onChange={handleChange}
                    className="border bg-transparent"
                  />
                  Female
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="sex"
                    value="Others"
                    checked={formData.sex === "Others"}
                    onChange={handleChange}
                    className="border bg-transparent"
                  />
                  Others
                </label>
              </div>
            </div>


            <div className="flex items-center gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 w-24">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 border p-2 rounded-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 w-24">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                minLength={8}
                maxLength={12}
                title="Password must be 8 to 12 characters"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 border p-2 rounded-md"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <button type="submit" className="btn-common bg-green-500 hover:bg-green-600">
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;