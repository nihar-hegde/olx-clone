import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Providers/AuthProvider";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};
