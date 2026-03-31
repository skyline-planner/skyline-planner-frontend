import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import MarketingPage from "@/features/auth/pages/MarketingPage";
import AuthPage from "@/features/auth/pages/AuthPage";
import HomePage from "@/features/auth/pages/HomePage";
import OnboardingPage from "@/features/auth/pages/OnboardingPage";
import NotFoundPage from "@/features/auth/pages/NotFoundPage";
import TripsPage from "@/features/trips/pages/TripsPage";
import TripCreatePage from "@/features/trips/pages/TripCreatePage";
import TripDetailPage from "@/features/trips/pages/TripDetailPage";
import TripEditPage from "@/features/trips/pages/TripEditPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import ReportPage from "@/features/report/pages/ReportPage";
import ProtectedRoute from "@/shared/components/ProtectedRoute";

export const routes: RouteObject[] = [
  // SCR-01 마케팅 랜딩 (비로그인 진입점)
  { path: "/", element: <MarketingPage /> },

  // SCR-02 로그인 / 회원가입 (Google OAuth)
  { path: "/auth", element: <AuthPage /> },

  // 로그인이 필요한 라우트 — ProtectedRoute가 미인증 시 /auth로 리다이렉트
  {
    element: <ProtectedRoute />,
    children: [
      // SCR-03 온보딩 (최초 로그인)
      { path: "/onboarding", element: <OnboardingPage /> },

      // SCR-04 홈 대시보드
      { path: "/home", element: <HomePage /> },

      // SCR-05 여행 생성
      { path: "/trips/new", element: <TripCreatePage /> },

      // SCR-06 일정 편집
      { path: "/trips/:id/edit", element: <TripEditPage /> },

      // SCR-07 여행 상세 기록
      { path: "/trips/:id", element: <TripDetailPage /> },

      // SCR-08 내 여행 관리
      { path: "/trips", element: <TripsPage /> },

      // SCR-09 최적화 리포트
      { path: "/report", element: <ReportPage /> },

      // SCR-10 프로필
      { path: "/profile", element: <ProfilePage /> },
    ],
  },

  // SCR-13 404
  { path: "/404", element: <NotFoundPage /> },
  { path: "*", element: <Navigate to="/404" replace /> },
];
