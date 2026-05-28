// src/pages/Dashboard.tsx

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Card from "../components/card";
import card from "../assets/profiles.png";
import placeholder from "../assets/placeholder.webp"

const Dashboard: React.FC = () => {

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // dummy data
  const cards = [1, 2, 3, 4, 5, 6];

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">

      {/* Navbar */}
      <Navbar showLinks={true} />

      {/* Hero Section */}
      <div className="px-10 mt-4">
        <div className="w-full h-[300px] rounded-2xl overflow-hidden border">
          <img
            src={placeholder}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="px-10 mt-8">

        <div
          ref={sectionRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
                      transition-all duration-700
                      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {cards.map((_, index) => (
            <div
              key={index}
              className="transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Card
                title="Title"
                description="Description"
                image={card}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Footer (optional) */}
      <div className="mt-auto">
        <Footer /> 
      </div>

    </div>
  );
};

export default Dashboard;