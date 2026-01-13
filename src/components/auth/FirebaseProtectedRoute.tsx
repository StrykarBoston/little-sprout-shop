import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/FirebaseAuthContext';

interface FirebaseProtectedRouteProps {
  children: React.ReactNode;
}

const FirebaseProtectedRoute: React.FC<FirebaseProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default FirebaseProtectedRoute;
