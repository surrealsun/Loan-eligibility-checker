// src/components/layout/Footer.tsx

import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white mt-10">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Loan Check</h2>
          <h3 className="text-md font-semibold mb-4">Know Your Loan Chances Instantly</h3>
          <p className="text-sm text-gray-400">
            Smart and fast loan eligibility checking system to help you
            make better financial decisions.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link to="/loan" className="hover:text-white">Apply Loan</Link></li>
            <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Policies</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="/security" className="hover:text-white">Security</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li>Email: support@gmail.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: Chennai, India</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Quick Loan Check. No Copyright.
      </div>

    </footer>
  );
};

export default Footer;