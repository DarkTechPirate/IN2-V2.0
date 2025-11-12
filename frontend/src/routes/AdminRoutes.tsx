import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { ProtectedRoute } from "./ProtectedRoute";

export function AdminRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Future admin routes */}
      </Route>

      <Route path="*" element={<Navigate to="/admin-dashboard" />} />
    </Routes>
  );
}
