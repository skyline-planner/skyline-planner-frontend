import { useNavigate } from "react-router-dom";

/**
 * SCR-01 마케팅 랜딩 페이지
 */
export default function MarketingPage() {
  const navigate = useNavigate();
  const goToAuth = () => navigate("/auth");

  return (
    <div className="min-h-screen bg-[#e8f3fb] font-sans overflow-x-hidden">

      {/* ════════════════ 헤더 ════════════════ */}
      <header className="sticky top-0 z-50 bg-[#e8f3fb]/95 backdrop-blur-md border-b border-sky-100/60">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={goToAuth}
              className="px-3 sm:px-5 py-2 text-sm text-gray-600 hover:text-sky-500 font-medium transition-colors"
            >
              로그인
            </button>
            <button
              onClick={goToAuth}
              className="px-4 sm:px-6 py-2 bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white text-sm font-semibold rounded-lg shadow-sm shadow-sky-200 transition-all duration-200 hover:shadow-md hover:shadow-sky-200"
            >
              시작하기
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════ 히어로 ════════════════ */}
      <section className="w-full">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-16 pb-20 sm:pt-20 sm:pb-28 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* 텍스트 */}
          <div className="flex-1 w-full text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-gray-900 leading-[1.15] mb-5">
              이동은 줄이고,<br />
              여행은 즐겁게.<br />
              <span className="text-sky-400">경로 최적화의</span><br />
              <span className="text-sky-400">시작.</span>
            </h1>
            <p className="text-[14px] sm:text-base text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
              Skyline Planner는 AI 기반으로 여행지 모든 경로를
              최적하게 조정합니다. 단 한 번의 클릭으로 요금을 한
              눈에 비교하고 최소 시간 여행이 가능해집니다.
            </p>
            <button
              onClick={goToAuth}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-sky-400 hover:bg-sky-500 active:scale-95 text-white font-bold rounded-xl text-base shadow-lg shadow-sky-200 transition-all duration-200 hover:shadow-xl hover:shadow-sky-300 hover:-translate-y-0.5"
            >
              시작하기
            </button>
          </div>

          {/* 3D 지도 카드 */}
          <div className="w-full max-w-[420px] lg:max-w-none lg:w-[460px] flex-shrink-0">
            <div className="group bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_32px_64px_-12px_rgba(14,165,233,0.35)] hover:-translate-y-1" style={{ aspectRatio: "4/3" }}>
              <div className="relative w-full h-full">
                {/* 격자 배경 */}
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: "linear-gradient(rgba(56,189,248,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.08) 1px,transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* 지도 SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 345" fill="none">
                  {/* 빌딩 블록 */}
                  {[
                    [30,40,40,30],[80,40,28,30],[120,40,36,30],[30,80,40,18],[80,80,28,18],[120,80,36,18],
                    [200,30,44,34],[254,30,30,34],[294,30,40,34],[200,74,44,20],[254,74,30,20],[294,74,40,20],
                    [360,40,36,28],[406,40,30,28],[360,78,36,18],[406,78,30,18],
                    [30,220,50,28],[90,220,34,28],[134,220,46,28],[30,258,50,20],[90,258,34,20],
                    [200,210,44,30],[254,210,36,30],[200,250,44,18],[254,250,36,18],
                    [340,200,50,32],[400,200,36,32],[340,242,50,20],
                  ].map(([x,y,w,h],i) => (
                    <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#1e293b" stroke="#334155" strokeWidth="0.5"/>
                  ))}
                  {/* 도로 */}
                  <line x1="0" y1="172" x2="460" y2="172" stroke="#334155" strokeWidth="2"/>
                  <line x1="175" y1="0" x2="175" y2="345" stroke="#334155" strokeWidth="2"/>
                  <line x1="330" y1="0" x2="330" y2="345" stroke="#334155" strokeWidth="1.5"/>
                  <line x1="0" y1="115" x2="460" y2="115" stroke="#334155" strokeWidth="1"/>
                  <line x1="0" y1="230" x2="460" y2="230" stroke="#334155" strokeWidth="1"/>
                  {/* 경로 (A → B) */}
                  <path d="M 60 280 C 80 200, 150 160, 230 130 S 350 95, 400 60"
                    stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeDasharray="10 5" opacity="0.9"/>
                  {/* 핀 A */}
                  <circle cx="60" cy="280" r="14" fill="#38bdf8" opacity="0.15"/>
                  <circle cx="60" cy="280" r="8" fill="#38bdf8" opacity="0.4"/>
                  <circle cx="60" cy="280" r="4" fill="#38bdf8"/>
                  <line x1="60" y1="276" x2="60" y2="256" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8"/>
                  <circle cx="60" cy="252" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5"/>
                  <text x="60" y="256" textAnchor="middle" fontSize="9" fill="#38bdf8" fontWeight="bold">A</text>
                  {/* 핀 B */}
                  <circle cx="400" cy="60" r="14" fill="#22d3ee" opacity="0.15"/>
                  <circle cx="400" cy="60" r="8" fill="#22d3ee" opacity="0.4"/>
                  <circle cx="400" cy="60" r="4" fill="#22d3ee"/>
                  <line x1="400" y1="56" x2="400" y2="36" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8"/>
                  <circle cx="400" cy="32" r="10" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5"/>
                  <text x="400" y="36" textAnchor="middle" fontSize="9" fill="#22d3ee" fontWeight="bold">B</text>
                </svg>
                {/* 오버레이 카드 */}
                <div className="absolute bottom-5 left-5 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-2.5">
                  <p className="text-[10px] text-gray-400 mb-0.5">최적 경로 절약</p>
                  <p className="text-sm font-bold text-sky-400">2시간 15분 단축</p>
                </div>
                <div className="absolute top-5 right-5 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-gray-400 mb-0.5">경로 점수</p>
                  <p className="text-sm font-bold text-green-400">94 / 100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ Plan A/B 비교 ════════════════ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="text-center mb-12">
            <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-gray-900 mb-3">두 가지 대안을 동시에</h2>
            <p className="text-[13px] sm:text-[14px] text-gray-400 max-w-md mx-auto">
              A안과 B안을 실시간으로 비교하세요. 어떤 플랜이 더 시간과 경비를 아껴주는지 확인해보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {/* Plan A 카드 */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <MapThumbnail variant="planA" />
                <span className="absolute top-3 right-3 text-[11px] bg-gray-700 text-white px-2.5 py-1 rounded-full font-medium shadow-sm">
                  사용자 직접 추천
                </span>
              </div>
              <div className="p-5">
                <p className="text-[11px] text-gray-400 mb-1.5">사용자가 직접 설계한 플랜</p>
                <p className="text-[13px] font-semibold text-gray-700 leading-snug mb-4">
                  내가 가고 싶은 관광명을 일정에 맞춰<br />직접 입력합니다.
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                  <span className="text-[13px] font-bold text-gray-700">2시간 15분</span>
                  <span className="text-[13px] font-bold text-blue-500">₩18,500</span>
                </div>
              </div>
            </div>

            {/* Plan B 카드 */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-sky-100 shadow-md hover:shadow-xl hover:shadow-sky-100 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <MapThumbnail variant="planB" />
                <span className="absolute top-3 right-3 text-[11px] bg-sky-500 text-white px-2.5 py-1 rounded-full font-medium shadow-sm">
                  AI 최적화 추천
                </span>
              </div>
              <div className="p-5">
                <p className="text-[11px] text-gray-400 mb-1.5">AI가 최적화한 플랜</p>
                <p className="text-[13px] font-semibold text-gray-700 leading-snug mb-4">
                  동일 관광명을 동선과 시간 기준으로<br />최적화하여 재조정합니다.
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-sky-50">
                  <span className="text-[13px] font-bold text-gray-700">2시간 55분</span>
                  <span className="text-[13px] font-bold text-teal-500">₩24,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 드래그 기능 ════════════════ */}
      <section className="bg-[#e8f3fb] py-20 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            {/* 텍스트 */}
            <div className="flex-1 w-full">
              <h2 className="text-[1.6rem] sm:text-[1.9rem] font-bold text-gray-900 leading-snug mb-4">
                드래그하고, 옮기고,<br />발견하세요
              </h2>
              <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed mb-6">
                한 번의 움직임으로 전체 일정을 재구성하세요.
                북마크 카드를 드래그하면 지도 경로가 즉시
                업데이트됩니다. Skyline Planner와 함께하면
                언제든 완벽한 일정 순서를 찾아볼 수 있습니다.
              </p>
              <button className="flex items-center gap-2 text-sky-500 text-[13px] font-semibold hover:text-sky-700 transition-colors group">
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                지정할 방법 순서 최적화 달성하기
              </button>
            </div>

            {/* 드래그 목업 */}
            <div className="flex-shrink-0 w-full max-w-[280px] space-y-3">
              {[
                { label: "장소 1: 경복궁", time: "09:00 AM · 11:00 AM", active: false, done: true },
                { label: "장소 2: 북촌 한옥마을", time: "장소 추가...", active: true, done: false },
                { label: "장소 3: 남산타워", time: "02:00 PM · 04:00 PM", active: false, done: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                    item.active
                      ? "bg-sky-50 border-sky-300 shadow-lg shadow-sky-100 scale-[1.02]"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {/* 드래그 핸들 */}
                  <svg className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 cursor-grab" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[12px] font-semibold truncate ${item.active ? "text-sky-700" : "text-gray-700"}`}>
                      {item.label}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                  {item.active && <div className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0 animate-pulse"/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ AI 분석 ════════════════ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* AI 점수 카드 */}
          <div className="flex-shrink-0 w-full max-w-sm lg:w-80 group bg-gray-50 rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[14px] font-bold text-gray-800">AI 경로분석</p>
              {/* 원형 게이지 */}
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="#e5e7eb" strokeWidth="5.5"/>
                  <circle cx="32" cy="32" r="26" fill="none" stroke="#38bdf8" strokeWidth="5.5"
                    strokeDasharray="163.4" strokeDashoffset="24.5" strokeLinecap="round"
                    className="transition-all duration-1000"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-black text-sky-500">94</span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mb-5">경로 점수</p>
            <div className="space-y-4">
              {[
                { label: "연료 효율", value: "평균 대비 +12%", width: "78%", color: "bg-green-400" },
                { label: "교통혼잡 회피", value: "최적화 완료", width: "90%", color: "bg-sky-400" },
                { label: "탄소 배출량", value: "낮은 영향", width: "38%", color: "bg-gray-300" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-gray-600">{m.label}</span>
                    <span className="text-gray-400">{m.value}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full transition-all duration-700`} style={{ width: m.width }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 텍스트 */}
          <div className="flex-1">
            <h2 className="text-[1.6rem] sm:text-[1.9rem] font-bold text-gray-900 leading-snug mb-4">
              AI 통찰력으로<br />더 똑똑한 여행을
            </h2>
            <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed mb-7 max-w-md">
              Skyline Planner만의 '경로 점수'가 실시간 교통
              팩터부터 고도 데이터까지 수 개의 데이터 포인트를
              분석합니다. 여행이 단순히 빠른 경로를 넘어 지속
              가능하고 스트레스 없는 여정이 되도록 보장합니다.
            </p>
            <ul className="space-y-3">
              {[
                "실시간 날씨 정보 통합",
                "전기차 충전소 및 연료 가격 모니터링",
                "스마트 혼잡 구간 예측",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-gray-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-50 flex items-center justify-center">
                    <svg className="w-3 h-3 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ════════════════ CTA ════════════════ */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 text-center">
          <h2 className="text-[2rem] sm:text-[2.6rem] font-black text-white leading-[1.2] mb-5">
            완벽한 여행을 계획할<br />
            준비가 되셨나요?<br />
            지금 시작하세요.
          </h2>
          <p className="text-[13px] sm:text-[14px] text-gray-400 leading-relaxed mb-10">
            Skyline Planner의 경쟁력 있는 특징은<br />
            30,000명 이상의 여행자가 신뢰합니다.
          </p>
          <button
            onClick={goToAuth}
            className="inline-flex items-center gap-2 px-10 py-4 bg-sky-400 hover:bg-sky-500 active:scale-95 text-white font-bold rounded-xl text-base shadow-xl shadow-sky-900/30 transition-all duration-200 hover:shadow-2xl hover:shadow-sky-900/40 hover:-translate-y-0.5"
          >
            시작하기
          </button>
          <p className="mt-5 text-[12px] text-gray-600">⭐ 30,000명 이상의 여행자가 신뢰합니다</p>
        </div>
      </section>

      {/* ════════════════ 푸터 ════════════════ */}
      <footer className="bg-[#e8f3fb] border-t border-sky-100 py-8">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo small />
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[12px] text-gray-400">
            {["개인정보 처리방침", "서비스 약관", "이용 정책"].map((t) => (
              <span key={t} className="hover:text-gray-600 cursor-pointer transition-colors">{t}</span>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 whitespace-nowrap">© 2024 Skyline Planner AI, Inc.</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── 공통 컴포넌트 ─── */

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`${small ? "w-6 h-6" : "w-8 h-8"} bg-sky-400 rounded-full flex items-center justify-center flex-shrink-0`}>
        <svg className={`${small ? "w-3 h-3" : "w-4 h-4"} text-white`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
      <div>
        <p className={`${small ? "text-[11px]" : "text-[13px]"} font-bold text-gray-800 leading-tight`}>Skyline Planner</p>
        <p className={`${small ? "text-[8px]" : "text-[9px]"} text-gray-400 tracking-[0.15em] uppercase leading-tight`}>Travel Optimizer</p>
      </div>
    </div>
  );
}

function MapThumbnail({ variant }: { variant: "planA" | "planB" }) {
  const isA = variant === "planA";
  const accent = isA ? "#60a5fa" : "#2dd4bf";
  const bg1   = isA ? "#dbeafe" : "#ccfbf1";
  const bg2   = isA ? "#bfdbfe" : "#99f6e4";

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 288 176" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`grad-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bg1}/>
          <stop offset="100%" stopColor={bg2}/>
        </linearGradient>
      </defs>
      <rect width="288" height="176" fill={`url(#grad-${variant})`}/>
      {/* 도로 */}
      <line x1="0" y1="88" x2="288" y2="88" stroke="white" strokeWidth="2.5" opacity="0.7"/>
      <line x1="0" y1="55" x2="288" y2="55" stroke="white" strokeWidth="1.5" opacity="0.5"/>
      <line x1="0" y1="121" x2="288" y2="121" stroke="white" strokeWidth="1.5" opacity="0.5"/>
      <line x1="96" y1="0" x2="96" y2="176" stroke="white" strokeWidth="2" opacity="0.6"/>
      <line x1="192" y1="0" x2="192" y2="176" stroke="white" strokeWidth="1.5" opacity="0.5"/>
      <line x1="48" y1="0" x2="48" y2="176" stroke="white" strokeWidth="1" opacity="0.3"/>
      <line x1="144" y1="0" x2="144" y2="176" stroke="white" strokeWidth="1" opacity="0.3"/>
      <line x1="240" y1="0" x2="240" y2="176" stroke="white" strokeWidth="1" opacity="0.3"/>
      {/* 블록 */}
      {[
        [8,8,32,38],[50,8,38,38],[8,60,32,20],[50,60,38,20],
        [106,8,30,38],[146,8,36,38],[106,60,30,20],[146,60,36,20],
        [202,8,32,38],[244,8,30,38],[202,60,32,20],[244,60,30,20],
        [8,96,32,20],[50,96,38,20],[106,96,30,20],[146,96,36,20],
        [202,96,32,20],[244,96,30,20],
        [8,128,80,38],[106,128,76,38],[202,128,78,38],
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="white" opacity="0.45"/>
      ))}
      {/* 경로 */}
      <path
        d={isA
          ? "M 25 148 L 55 108 L 115 78 L 195 52 L 262 28"
          : "M 25 148 Q 80 115 130 85 Q 190 55 262 28"}
        stroke={accent} strokeWidth="3" fill="none" strokeDasharray="10 5" opacity="0.9"
      />
      {/* 핀 출발 */}
      <circle cx="25" cy="148" r="12" fill={accent} opacity="0.2"/>
      <circle cx="25" cy="148" r="7" fill={accent} opacity="0.9"/>
      {/* 핀 도착 */}
      <circle cx="262" cy="28" r="12" fill={accent} opacity="0.2"/>
      <circle cx="262" cy="28" r="7" fill={accent} opacity="0.9"/>
    </svg>
  );
}
