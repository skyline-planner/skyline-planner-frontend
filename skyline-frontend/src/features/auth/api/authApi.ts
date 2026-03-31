import { api } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/types/api";
import type { User, UserStats, TripSummary } from "@/shared/types/domain";

/**
 * Google OAuth 로그인을 시작한다.
 * MSW 환경에서는 목업 토큰을 세팅하고 홈으로 이동,
 * 실제 환경에서는 백엔드가 Google 인증 페이지로 리다이렉트한다.
 */
export async function startGoogleOAuth(): Promise<void> {
  const isMock = import.meta.env.VITE_USE_MOCK === "true";

  if (isMock) {
    // MSW 목업 환경: 가상 토큰을 저장하고 홈으로 이동
    localStorage.setItem("access_token", "mock-access-token");
    window.location.href = "/home";
    return;
  }

  // 실제 환경: 백엔드 OAuth 엔드포인트로 이동 (리다이렉트)
  const redirectUri = `${window.location.origin}/auth/callback`;
  const state = crypto.randomUUID();
  sessionStorage.setItem("oauth_state", state);

  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
}

/**
 * 현재 로그인된 사용자의 프로필을 조회한다.
 */
export async function fetchMe(): Promise<ApiResponse<User>> {
  const res = await api.get<ApiResponse<User>>("/users/me");
  return res.data;
}

/**
 * 홈 화면에 표시할 최근 여행 요약 목록을 조회한다.
 */
export async function fetchTripsSummary(): Promise<ApiResponse<TripSummary[]>> {
  const res = await api.get<ApiResponse<TripSummary[]>>("/users/me/trips/summary");
  return res.data;
}

/**
 * 현재 로그인된 사용자의 여행 통계를 조회한다.
 */
export async function fetchUserStats(): Promise<ApiResponse<UserStats>> {
  const res = await api.get<ApiResponse<UserStats>>("/users/me/stats");
  return res.data;
}
