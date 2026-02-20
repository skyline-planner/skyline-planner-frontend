import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import AuthPage from "@/features/auth/pages/AuthPage";
import TripsPage from "@/features/trips/pages/TripsPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";

function LandingPage() {
  return <div>SCR-01 Landing</div>;
}

function HomePage() {
  return <div>SCR-04 Home</div>;
}

function NotFoundPage() {
  return <div>SCR-13 404</div>;
}

export const routes: RouteObject[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/auth", element: <AuthPage /> },

  { path: "/home", element: <HomePage /> },
  { path: "/trips", element: <TripsPage /> },
  { path: "/profile", element: <ProfilePage /> },

  { path: "/404", element: <NotFoundPage /> },
  { path: "*", element: <Navigate to="/404" replace /> },
];
