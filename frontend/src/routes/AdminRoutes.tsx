import { Routes, Route, Navigate } from "react-router-dom";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { ProtectedRoute } from "./ProtectedRoute";

export function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      {/* Future admin routes can go here */}
      <Route path="*" element={<Navigate to="/admin-dashboard" />} />
    </Routes>
  );
}
