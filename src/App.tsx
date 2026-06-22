import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Login from "./authPages/login";
import Signup from "./authPages/signup";
import ForgotPassword from "./authPages/forgotPassword";
import ResetPassword from "./authPages/resePassword";
//import ProtectedRoute from "./protector/protectRoute";
//import PublicRoute from "./protector/publicRoute";
import DashBordLayout from "./layout/layout";
import User from "./pages/user";
import Notify from "./pages/notification";
import Coin from "./pages/coin";

import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Landing />} />

          <Route
            path="/login"
            element={
              /*  <PublicRoute> */
              <Login />
              /*    </PublicRoute> */
            }
          />

          <Route
            path="/signup"
            element={
              /*  <PublicRoute> */
              <Signup />
              /*  </PublicRoute> */
            }
          />

          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/auth/reset-password/:token"
            element={<ResetPassword />}
          />

          {/* PROTECTED ROUTES */}
          <Route
            path="/DashBordLayout"
            element={
              <DashBordLayout />

              /* <ProtectedRoute>
                <DashBordLayout />
              </ProtectedRoute> */
            }
          >
            <Route path="user" element={<User />} />
            <Route path="notify" element={<Notify />} />
            <Route path="coin" element={<Coin />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
