// src/components/navbar.tsx

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import maleProfile from "../assets/male_profile.png";
import femaleProfile from "../assets/female_profile.png";
import othersProfile from "../assets/others_profile.png";

interface NavbarProps {
  showLinks?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showLinks = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userSex, setUserSex] = useState("Others");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const profileImages: Record<string, string> = {
    Male: maleProfile,
    Female: femaleProfile,
    Others: othersProfile,
  };

  const selectedProfileImage = profileImages[userSex] || othersProfile;

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn") === "true");
    setUserSex(localStorage.getItem("userSex") || "Others");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="w-[98%] flex justify-between items-center px-10 py-4 mx-auto backdrop-blur-md bg-transparent">
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="logo"
          className="w-14 h-14 rounded-full object-cover"
        />
        <span className="text-lg font-bold text-black">Quick LOAN Check</span>
      </div>

      {/* Right: Navigation (hidden in auth pages) */}
      {showLinks && (
        <div className="flex items-center gap-6 text-gray-600 font-medium relative">
          <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
          <Link to="/loan" className="hover:text-blue-500">Apply Loan</Link>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <img
                src={selectedProfileImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-gray-200 shadow-xl z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>

                {!loggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login/SignUp
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/logout"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Logout
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;