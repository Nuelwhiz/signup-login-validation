import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resePassword";
//import ProtectedRoute from "./protector/protectRoute";
import PublicRoute from "./protector/publicRoute";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <div>
        <ToastContainer position="top-center" autoClose={2000} />
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/Login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />

            <Route
              path="/auth/reset-password/:token"
              element={<ResetPassword />}
            />

            <Route
              path="/Home"
              element={
                <>
                  <Home />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
