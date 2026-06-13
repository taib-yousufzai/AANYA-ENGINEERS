import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { isAuthenticated } from "@/lib/auth";

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Wraps protected admin routes.
 * Redirects to /admin/login if no valid session is found.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
