import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./authPages/login";
import Signup from "./authPages/signup";

import ForgotPassword from "./authPages/forgotPassword";
import ResetPassword from "./authPages/resePassword";
import ProtectedRoute from "./protector/protectRoute";
import PublicRoute from "./protector/publicRoute";
import { ToastContainer } from "react-toastify";
import User from "./pages/user";
import DashBordLayout from "./layout/layout";
import Notify from "./pages/notification";
import Coin from "./pages/coin"; //import NotLoggedIn from "./pages/notLoggedIn";
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
                /* <PublicRoute> */
                <Login />
                /* </PublicRoute> */
              }
            />
            <Route
              path="/Signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            {/* <Route path="/NotLoggedIn" element={<NotLoggedIn />} /> */}

            <Route
              path="/auth/reset-password/:token"
              element={<ResetPassword />}
            />
            <Route
              path="/DashBordLayout"
              element={
                /*  <DashBordLayout /> */

                <ProtectedRoute>
                  <DashBordLayout />
                </ProtectedRoute>
              }
            >
              <Route path="user" element={<User />} />
              <Route path="notify" element={<Notify />} />
              <Route path="coin" element={<Coin />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
