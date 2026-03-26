import { http, HttpResponse } from "msw";
import type { ApiResponse } from "@/shared/types/api";
import type { User, UserStats, TripSummary } from "@/shared/types/domain";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

// 목업 유저 데이터
const MOCK_USER: User = {
  id: 1,
  email: "alex@example.com",
  role: "USER",
  nickname: "알렉스",
  bio: "여행을 좋아하는 사람입니다.",
  avatarUrl: null,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  deletedAt: null,
};

// 목업 유저 통계
const MOCK_USER_STATS: UserStats = {
  tripCount: 12,
  completedTripCount: 8,
  savedTripCount: 5,
};

// 목업 최근 여행 요약
const MOCK_TRIP_SUMMARIES: TripSummary[] = [
  {
    id: 1,
    title: "교토의 여름",
    startDate: "2024-07-10",
    endDate: "2024-07-15",
    country: "Japan",
    city: "Kyoto",
    status: "COMPLETED",
  },
  {
    id: 2,
    title: "런던 주말 여행",
    startDate: "2024-08-20",
    endDate: "2024-08-23",
    country: "UK",
    city: "London",
    status: "COMPLETED",
  },
  {
    id: 3,
    title: "뉴욕 익스프레스",
    startDate: "2024-09-05",
    endDate: "2024-09-09",
    country: "USA",
    city: "New York",
    status: "PLANNING",
  },
  {
    id: 4,
    title: "파리 로맨틱 투어",
    startDate: "2024-10-01",
    endDate: "2024-10-07",
    country: "France",
    city: "Paris",
    status: "PLANNING",
  },
];

export const handlers = [
  /**
   * 내 프로필 조회 핸들러
   * Authorization 헤더가 없으면 401 반환
   */
  http.get(`${BASE_URL}/users/me`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json<ApiResponse<unknown>>(
        { data: null, error: "Unauthorized", status: 401 },
        { status: 401 }
      );
    }
    return HttpResponse.json<ApiResponse<unknown>>({
      data: MOCK_USER,
      error: null,
      status: 200,
    });
  }),

  /**
   * 사용자 통계 조회 핸들러
   */
  http.get(`${BASE_URL}/users/me/stats`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json<ApiResponse<unknown>>(
        { data: null, error: "Unauthorized", status: 401 },
        { status: 401 }
      );
    }
    return HttpResponse.json<ApiResponse<unknown>>({
      data: MOCK_USER_STATS,
      error: null,
      status: 200,
    });
  }),

  /**
   * 홈 화면 최근 여행 요약 조회 핸들러
   */
  http.get(`${BASE_URL}/users/me/trips/summary`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json<ApiResponse<unknown>>(
        { data: null, error: "Unauthorized", status: 401 },
        { status: 401 }
      );
    }
    return HttpResponse.json<ApiResponse<unknown>>({
      data: MOCK_TRIP_SUMMARIES,
      error: null,
      status: 200,
    });
  }),
];
