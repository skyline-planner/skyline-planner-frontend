import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/stores/authStore";
import { fetchTripsSummary, fetchUserStats } from "../api/authApi";
import { queryKeys } from "@/shared/api/queryKeys";
import type { TripSummary } from "@/shared/types/domain";

/**
 * SCR-04 홈 대시보드
 */
export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, clearAuth } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth", { replace: true });
  }, [isAuthenticated, navigate]);

  const { data: tripSummaries } = useQuery({
    queryKey: queryKeys.users.tripsSummary(),
    queryFn: async () => (await fetchTripsSummary()).data,
    enabled: isAuthenticated,
  });

  const { data: userStats } = useQuery({
    queryKey: queryKeys.users.stats(),
    queryFn: async () => (await fetchUserStats()).data,
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) return null;

  const nickname = user?.nickname ?? "사용자";

  function handleLogout() {
    clearAuth();
    navigate("/auth", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-[#f0f6ff]">

      {/* ═══════════════ 사이드바 ═══════════════ */}
      <aside className="w-52 min-h-screen bg-white border-r border-gray-100 flex flex-col py-6 px-3 fixed top-0 left-0 h-full z-20">

        {/* 로고 */}
        <div className="flex items-center gap-2.5 px-2 mb-6">
          <div className="w-9 h-9 bg-sky-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-sky-200">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-800 leading-tight">Skyline Planner</p>
            <p className="text-[9px] text-gray-400 tracking-widest uppercase">Travel Optimizer</p>
          </div>
        </div>

        {/* 내비게이션 */}
        <nav className="flex flex-col gap-0.5">
          <SideNavItem
            icon={<HomeIcon />} label="홈" active
            onClick={() => navigate("/home")}
          />
          <SideNavItem
            icon={<ProfileIcon />} label="프로필"
            onClick={() => navigate("/profile")}
          />
          <SideNavItem
            icon={<MyTripIcon />} label="내 여행"
            onClick={() => navigate("/trips")}
          />
          <SideNavItem
            icon={<SettingIcon />} label="설정"
          />
        </nav>

        <div className="flex-1" />

        {/* 새로운 모험 버튼 */}
        <button
          onClick={() => navigate("/trips/new")}
          className="flex items-center justify-center gap-2 w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white text-sm font-semibold rounded-xl px-4 py-2.5 mb-3 transition-all duration-200 shadow-sm shadow-sky-200 hover:shadow-md hover:shadow-sky-200"
        >
          <span className="text-base leading-none font-bold">+</span>
          새로운 모험
        </button>

        {/* 로그아웃 */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-1.5 w-full text-[12px] text-gray-400 hover:text-red-400 py-1.5 mb-3 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          로그아웃
        </button>

        {/* 프로필 섹션 */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2.5 px-2 pt-3 border-t border-gray-100 hover:bg-gray-50 rounded-xl transition-colors group w-full text-left"
        >
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {nickname[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-gray-700 truncate">{nickname}</p>
            <p className="text-[10px] text-sky-400 font-medium">Premium</p>
          </div>
          <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </aside>

      {/* ═══════════════ 메인 콘텐츠 ═══════════════ */}
      <main className="flex-1 ml-52 px-8 py-8 max-w-5xl">

        {/* 인사말 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            다음은 어디로 떠나볼까요, {nickname}님?
          </h1>
          <p className="text-sm text-gray-400">마시멜로처럼 부드러운 여행 계획을 시작해보세요.</p>
        </div>

        {/* 새 여행 CTA 카드 */}
        <section className="bg-white rounded-2xl p-7 mb-8 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex-1">
            <span className="inline-block text-xs text-sky-500 font-semibold bg-sky-50 px-2.5 py-0.5 rounded-full mb-3">
              추천
            </span>
            <h2 className="text-xl font-bold text-gray-800 mb-2">새 여행 만들기</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              새로운 모험을 시작하고 경로를 손쉽게 최적화하세요.<br />
              경유지를 추가하고 최적의 경로를 찾아 여행을 즐겨보세요.
            </p>
            <button
              onClick={() => navigate("/trips/new")}
              className="flex items-center gap-2 bg-sky-400 hover:bg-sky-500 active:scale-95 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-all duration-200 shadow-sm shadow-sky-200"
            >
              <span className="text-base font-bold leading-none">⊕</span>
              새 여행 계획하기
            </button>
          </div>
          {/* 원형 일러스트 */}
          <div className="flex-shrink-0 ml-6 w-28 h-28 rounded-full bg-sky-50 flex items-center justify-center">
            <svg className="w-14 h-14 text-sky-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 6h-2V5c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v1H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 5h6v1H9V5zm8 14H7V8h10v11zm-5-9h-1v3H9v1h2v3h1v-3h2v-1h-2z"/>
            </svg>
          </div>
        </section>

        {/* 최근 저장된 여행 */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-800">최근 저장된 여행</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                {tripSummaries?.length ?? 0}개
              </span>
            </div>
            <button
              onClick={() => navigate("/trips")}
              className="text-xs text-sky-400 hover:text-sky-600 font-medium transition-colors"
            >
              여행 전체보기 →
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {(tripSummaries ?? []).slice(0, 4).map((trip, idx) => (
              <TripCard key={trip.id} trip={trip} index={idx} />
            ))}
          </div>
        </section>

        {/* 나의 여행 통계 */}
        <section className="bg-white rounded-2xl p-7 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-base font-bold text-gray-800 mb-1">나의 여행 통계</h2>
            <p className="text-xs text-gray-400">지금까지 절약한 거리와 시간을 확인하세요</p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <StatCircle value="1,240" unit="km절약"  label="최적화 거리"  sublabel="전체 이동 중 75% 최적화" stroke="#38bdf8" valueColor="text-sky-400"/>
            <StatCircle value="42"    unit="시간절약" label="절약된 시간"  sublabel="대기 시간 및 이동 시간 포함" stroke="#4ade80" valueColor="text-green-400"/>
            <StatCircle value="86%"   unit=""         label="플랜 달성률"  sublabel="계획 대비 실제 방문 완료" stroke="#c084fc" valueColor="text-purple-400"/>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ─── 사이드바 내비 아이템 ─── */
interface SideNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SideNavItem({ icon, label, active = false, onClick }: SideNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-colors",
        active
          ? "bg-sky-50 text-sky-600 font-semibold"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
      ].join(" ")}
    >
      <span className="w-4 h-4 flex-shrink-0">{icon}</span>
      {label}
    </button>
  );
}

/* ─── 여행 카드 ─── */
// 목업용 지역별 스타일
const TRIP_STYLES: Array<{ bg: string; accent: string; mapColor: string }> = [
  { bg: "from-emerald-100 to-green-200",  accent: "#34d399", mapColor: "#6ee7b7" },
  { bg: "from-sky-100 to-blue-200",       accent: "#38bdf8", mapColor: "#7dd3fc" },
  { bg: "from-indigo-100 to-blue-200",    accent: "#818cf8", mapColor: "#a5b4fc" },
  { bg: "from-orange-100 to-rose-200",    accent: "#fb923c", mapColor: "#fca5a5" },
];

// 날짜 차이 계산 (일 수)
function calcDays(start: string, end: string): number {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)) + 1);
}

// 목업용 장소 수 (index 기반)
const MOCK_PLACE_COUNTS = [5, 8, 4, 12];

function TripCard({ trip, index }: { trip: TripSummary; index: number }) {
  const navigate = useNavigate();
  const style = TRIP_STYLES[index % TRIP_STYLES.length];
  const days = calcDays(trip.startDate, trip.endDate);
  const places = MOCK_PLACE_COUNTS[index % MOCK_PLACE_COUNTS.length];

  return (
    <div
      onClick={() => navigate(`/trips/${trip.id}`)}
      className="cursor-pointer group flex flex-col gap-2"
    >
      {/* 썸네일 */}
      <div className={`relative bg-gradient-to-br ${style.bg} rounded-2xl overflow-hidden aspect-square shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-200`}>
        {/* 간단한 지도 격자 */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 120 120">
          <line x1="0" y1="60" x2="120" y2="60" stroke="white" strokeWidth="1.5"/>
          <line x1="60" y1="0" x2="60" y2="120" stroke="white" strokeWidth="1.5"/>
          <line x1="0" y1="30" x2="120" y2="30" stroke="white" strokeWidth="0.8"/>
          <line x1="0" y1="90" x2="120" y2="90" stroke="white" strokeWidth="0.8"/>
          <line x1="30" y1="0" x2="30" y2="120" stroke="white" strokeWidth="0.8"/>
          <line x1="90" y1="0" x2="90" y2="120" stroke="white" strokeWidth="0.8"/>
          {/* 블록 */}
          {[[8,8,18,18],[36,8,18,18],[68,8,18,18],[8,36,18,18],[68,36,18,18],[8,68,18,18],[36,68,18,18],[68,68,18,18],[36,96,48,16]].map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="white" opacity="0.5"/>
          ))}
          {/* 경로 */}
          <path d="M 20 100 Q 50 50 100 20" stroke="white" strokeWidth="2" fill="none" strokeDasharray="6 3" opacity="0.8"/>
          {/* 핀 */}
          <circle cx="20" cy="100" r="5" fill={style.accent} opacity="0.9"/>
          <circle cx="100" cy="20" r="5" fill={style.accent} opacity="0.9"/>
        </svg>
        {/* 지도 핀 아이콘 중앙 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2">
            <svg className="w-4 h-4" style={{ color: style.accent }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
      </div>
      {/* 텍스트 */}
      <div>
        <p className="text-[12px] font-semibold text-gray-800 truncate">{trip.title}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">
          {places}개 장소 · {days}일
        </p>
      </div>
    </div>
  );
}

/* ─── 원형 통계 ─── */
interface StatCircleProps {
  value: string; unit: string; label: string; sublabel: string;
  stroke: string; valueColor: string;
}

function StatCircle({ value, unit, label, sublabel, stroke, valueColor }: StatCircleProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r="40" fill="none" stroke="#f3f4f6" strokeWidth="6"/>
          <circle cx="48" cy="48" r="40" fill="none" stroke={stroke} strokeWidth="6"
            strokeDasharray="251.2" strokeDashoffset="50.24" strokeLinecap="round"/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-lg font-black ${valueColor}`}>{value}</span>
          {unit && <span className="text-[9px] text-gray-400 font-medium">{unit}</span>}
        </div>
      </div>
      <div className="text-center">
        <p className="text-[13px] font-semibold text-gray-700">{label}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{sublabel}</p>
      </div>
    </div>
  );
}

/* ─── 아이콘 ─── */
function HomeIcon() {
  return <svg fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>;
}
function ProfileIcon() {
  return <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>;
}
function MyTripIcon() {
  return <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-2.18c.07-.44.18-.87.18-1.33C18 2.54 16.46 1 14.67 1c-1.01 0-1.87.47-2.49 1.2L12 2.85l-.17-.65C11.13 1.47 10.26 1 9.33 1 7.54 1 6 2.54 6 4.33c0 .46.11.89.18 1.33H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>;
}
function SettingIcon() {
  return <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>;
}
