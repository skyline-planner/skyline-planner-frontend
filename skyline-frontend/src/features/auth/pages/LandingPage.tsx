import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/stores/authStore";
import { api } from "@/shared/api/client";
import { queryKeys } from "@/shared/api/queryKeys";
import type { ApiResponse } from "@/shared/types/api";
import type { TripSummary, UserStats } from "@/shared/types/domain";

/**
 * SCR-01 홈(랜딩) 화면
 * - 로그인된 사용자에게는 홈 대시보드를 보여준다
 * - 미로그인 사용자는 로그인 페이지로 리다이렉트한다
 */
export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  // 미로그인 상태면 로그인 페이지로 이동
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // 최근 여행 요약 조회
  const { data: tripSummaries } = useQuery({
    queryKey: queryKeys.users.tripsSummary(),
    queryFn: async () => {
      const res = await api.get<ApiResponse<TripSummary[]>>("/users/me/trips/summary");
      return res.data.data;
    },
    enabled: isAuthenticated,
  });

  // 사용자 통계 조회
  const { data: userStats } = useQuery({
    queryKey: queryKeys.users.stats(),
    queryFn: async () => {
      const res = await api.get<ApiResponse<UserStats>>("/users/me/stats");
      return res.data.data;
    },
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) return null;

  const nickname = user?.nickname ?? "사용자";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 왼쪽 사이드바 */}
      <aside className="w-56 min-h-screen bg-white border-r border-gray-100 flex flex-col py-6 px-4 gap-6">
        {/* 로고 */}
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-800 leading-tight">Skyline Planner</div>
            <div className="text-[9px] text-gray-400 tracking-widest uppercase leading-tight">
              Travel Optimizer
            </div>
          </div>
        </div>

        {/* 내비게이션 */}
        <nav className="flex flex-col gap-1 mt-2">
          <NavItem icon={<HomeIcon />} label="홈" active />
          <NavItem icon={<TripIcon />} label="트리핑" />
          <NavItem icon={<MyTripIcon />} label="내 여행" />
          <NavItem icon={<SettingIcon />} label="설정" />
        </nav>

        <div className="flex-1" />

        {/* 새 여행 만들기 버튼 */}
        <button
          onClick={() => navigate("/trips/new")}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-colors"
        >
          <span className="text-lg leading-none">+</span>
          새 여행 만들기
        </button>

        {/* 유저 정보 */}
        <div className="flex items-center gap-2 px-2 border-t border-gray-100 pt-4">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {nickname[0]}
          </div>
          <span className="text-sm text-gray-700 truncate">{nickname}</span>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-10 py-8 max-w-4xl">
        {/* 인사말 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            다음은 어디로 떠나볼까요, {nickname}님?
          </h1>
          <p className="text-sm text-gray-400">
            AI를 활용하여 부드러운 여행 계획을 시작해보세요.
          </p>
        </div>

        {/* 새 여행 만들기 카드 */}
        <section className="bg-white rounded-2xl p-6 mb-8 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
              새로운
            </span>
            <h2 className="text-lg font-bold text-gray-800 mt-2 mb-2">새 여행 만들기</h2>
            <p className="text-sm text-gray-400 mb-4">
              새로운 모험을 시작하고 경로를 손쉽게 최적화하세요.
              <br />
              경유지를 추가하고 최적의 경로를 찾아 여행을 즐겨보
              <br />
              세요.
            </p>
            <button
              onClick={() => navigate("/trips/new")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-colors"
            >
              <span className="text-base leading-none">+</span>
              새 여행 계획하기
            </button>
          </div>
          <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 ml-6">
            <LuggageIcon className="w-12 h-12 text-blue-300" />
          </div>
        </section>

        {/* 최근 저장된 여행 */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-800">최근 저장된 여행</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {tripSummaries?.length ?? 0}개
              </span>
            </div>
            <button
              onClick={() => navigate("/trips")}
              className="text-xs text-blue-400 hover:text-blue-600 flex items-center gap-1"
            >
              여행 전체보기 &rarr;
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {(tripSummaries ?? []).slice(0, 4).map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

        {/* 나의 여행 통계 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-base font-bold text-gray-800 mb-1">나의 여행 통계</h2>
            <p className="text-xs text-gray-400">지금까지 달성한 여행의 성과를 확인하세요</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <StatCircle
              value="1,240"
              unit="km 달성"
              label="최적화 거리"
              sublabel="동네사이를 70% 최적화"
              color="text-blue-400"
              stroke="#60a5fa"
            />
            <StatCircle
              value={String(userStats?.completedTripCount ?? 42)}
              unit="시간 절약"
              label="절약한 시간"
              sublabel="내가 사랑 절약한 시간도 소설됩"
              color="text-green-400"
              stroke="#4ade80"
            />
            <StatCircle
              value="86%"
              unit=""
              label="플랜 달성률"
              sublabel="계획대비 실제 성과율 완료됩"
              color="text-purple-400"
              stroke="#c084fc"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/** 사이드바 내비게이션 아이템 */
interface NavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <button
      className={[
        "flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition-colors",
        active
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
      ].join(" ")}
    >
      <span className="w-4 h-4">{icon}</span>
      {label}
    </button>
  );
}

/** 최근 여행 카드 */
interface TripCardProps {
  trip: TripSummary;
}

function TripCard({ trip }: TripCardProps) {
  // 지역별 배경색 팔레트 (목업용)
  const colorMap: Record<string, string> = {
    Japan: "bg-emerald-100",
    UK: "bg-sky-100",
    USA: "bg-indigo-100",
    France: "bg-rose-100",
  };
  const bgColor = colorMap[trip.country ?? ""] ?? "bg-gray-100";

  return (
    <div className="flex flex-col gap-2 cursor-pointer group">
      <div
        className={`${bgColor} rounded-xl h-24 flex items-center justify-center group-hover:opacity-90 transition-opacity`}
      >
        <MapPinIcon className="w-8 h-8 text-white opacity-40" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-700 truncate">{trip.title}</p>
        <p className="text-[10px] text-gray-400">
          {trip.city ?? trip.country} &middot; {trip.startDate.slice(0, 7)}
        </p>
      </div>
    </div>
  );
}

/** 원형 통계 카드 */
interface StatCircleProps {
  value: string;
  unit: string;
  label: string;
  sublabel: string;
  color: string;
  stroke: string;
}

function StatCircle({ value, unit, label, sublabel, color, stroke }: StatCircleProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* SVG 원형 게이지 (단순 장식용) */}
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#f3f4f6" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={stroke}
            strokeWidth="6"
            strokeDasharray="213.6"
            strokeDashoffset="42.72"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-base font-bold ${color}`}>{value}</span>
          {unit && <span className="text-[9px] text-gray-400">{unit}</span>}
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-700">{label}</p>
        <p className="text-[10px] text-gray-400">{sublabel}</p>
      </div>
    </div>
  );
}

// SVG 아이콘 모음

function HomeIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function TripIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
    </svg>
  );
}

function MyTripIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6h-2.18c.07-.44.18-.87.18-1.33C18 2.54 16.46 1 14.67 1c-1.01 0-1.87.47-2.49 1.2L12 2.85l-.17-.65C11.13 1.47 10.26 1 9.33 1 7.54 1 6 2.54 6 4.33c0 .46.11.89.18 1.33H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

function SettingIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
  );
}

function LuggageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 6h-2V5c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v1H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 5h6v1H9V5zm8 14H7V8h10v11z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}
