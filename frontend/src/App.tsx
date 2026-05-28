// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.tsx";
import Signup from "./pages/signup.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Profile from "./pages/profile.tsx";
import Logout from "./pages/logout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;