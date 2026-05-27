// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.tsx";
import Signup from "./pages/signup.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;