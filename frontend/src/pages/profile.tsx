import React from "react";
import Navbar from "../components/navbar";

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar showLinks={true} />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
          <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>
          <p className="text-gray-600">This is your profile page. Add profile details or editing functionality here.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
