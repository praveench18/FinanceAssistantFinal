import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/Addexpense";
import Expenses from "./pages/Expenses";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddExpense />
          </ProtectedRoute>
        }
      />

      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/budget"
        element={
          <ProtectedRoute>
            <Budget />
          </ProtectedRoute>
        }
      />
      <Route
      path="/reports"
      element={
        <ProtectedRoute>
            <Reports />
        </ProtectedRoute>
      }
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
      path="/verify-otp"
      element={<VerifyOTP />}
      />
      <Route
      path="/reset-password"
      element={<ResetPassword />}
      />
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;