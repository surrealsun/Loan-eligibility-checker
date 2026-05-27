// src/components/navbar.tsx

import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  showLinks?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showLinks = true }) => {
  return (
    <div className="w-[98%] flex justify-between items-center px-10 py-4 mx-auto my-2 backdrop-blur-md bg-white/70 rounded-3xl shadow-sm ">

      {/* Right: Navigation (hidden in auth pages) */}
      {showLinks && (
        <div className="flex gap-6 text-gray-600 font-medium">
          <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
          <Link to="/loan" className="hover:text-blue-500">Apply Loan</Link>
          <Link to="/profile" className="hover:text-blue-500">Profile</Link>
        </div>
      )}

      {/* Left: Logo + Name */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-lg font-semibold">Your Name</span>
      </div>
      
    </div>
  );
};

export default Navbar;