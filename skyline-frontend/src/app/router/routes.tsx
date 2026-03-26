import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import LandingPage from "@/features/auth/pages/LandingPage";
import AuthPage from "@/features/auth/pages/AuthPage";
import NotFoundPage from "@/features/auth/pages/NotFoundPage";
import TripsPage from "@/features/trips/pages/TripsPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";

/** SCR-04 홈 (Phase B에서 구현) - 임시 플레이스홀더 */
function HomePage() {
  return <div>SCR-04 Home (Phase B)</div>;
}

export const routes: RouteObject[] = [
  // SCR-01 홈(랜딩): 인증 여부에 따라 대시보드 또는 /auth로 리다이렉트
  { path: "/", element: <LandingPage /> },

  // SCR-02 로그인 (Google OAuth)
  { path: "/auth", element: <AuthPage /> },

  // Phase B에서 구현할 메인 홈
  { path: "/home", element: <HomePage /> },

  // 기존 feature 라우트 (Phase E, F에서 구현)
  { path: "/trips", element: <TripsPage /> },
  { path: "/profile", element: <ProfilePage /> },

  // SCR-13 404
  { path: "/404", element: <NotFoundPage /> },
  { path: "*", element: <Navigate to="/404" replace /> },
];
