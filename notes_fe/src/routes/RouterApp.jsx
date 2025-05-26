// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import untuk routing
import LoginPage from "../pages/LoginPage"; // Halaman login
import RegisterPage from "../pages/RegisterPage";
import Notes from "../pages/Notes";
import ProtectedRoute from "../pages/ProtectedRoute";

function RouterApp() {
  return (
    <Router>
      <Routes>
        {/* Pass setIsAuthenticated as prop to LoginPage */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default RouterApp;
