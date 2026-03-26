import { useNavigate } from "react-router-dom";

/**
 * SCR-13 404 에러 페이지
 * - 존재하지 않는 경로 접근 시 표시된다
 * - 홈으로 돌아가기 / 문의하기 버튼 제공
 */
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        {/* 로고 */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800 leading-tight">Skyline Planner</div>
            <div className="text-[9px] text-gray-400 leading-tight tracking-widest uppercase">
              Travel Optimizer
            </div>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={() => navigate("/auth")}
          className="text-sm text-gray-500 hover:text-blue-500 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          기가 로그인하기
        </button>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 gap-8">
        {/* 404 일러스트 */}
        <div className="relative">
          <NotFoundIllustration />
        </div>

        {/* 텍스트 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">어라? 길을 잃었나요?</h1>
          <p className="text-sm text-gray-400">
            요청하신 페이지를 찾을 수 없어요.
            <br />
            Skyline Planner와 함께 다시 길을 찾아볼까요?
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl px-6 py-3 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            홈으로 돌아가기
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            문의하기
          </button>
        </div>
      </main>

      {/* 하단 푸터 */}
      <footer className="py-6 border-t border-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-6 text-xs text-gray-400">
            <span className="hover:text-gray-600 cursor-pointer">이용약관</span>
            <span className="hover:text-gray-600 cursor-pointer">개인정보처리방침</span>
            <span className="hover:text-gray-600 cursor-pointer">고객지원</span>
          </div>
          <div className="flex gap-4 text-gray-300">
            <ShareIconSmall />
            <GlobeIconSmall />
          </div>
          <p className="text-xs text-gray-300">© 2024 Skyline Planner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

/** 404 일러스트 SVG */
function NotFoundIllustration() {
  return (
    <div className="relative flex items-center justify-center">
      {/* 구름 + 404 배지 */}
      <div className="relative">
        {/* 구름 본체 */}
        <svg width="200" height="120" viewBox="0 0 200 120" fill="none" aria-hidden="true">
          <ellipse cx="100" cy="85" rx="80" ry="30" fill="#dbeafe" />
          <circle cx="60" cy="70" r="35" fill="#dbeafe" />
          <circle cx="100" cy="55" r="42" fill="#dbeafe" />
          <circle cx="145" cy="68" r="32" fill="#dbeafe" />
        </svg>

        {/* 404 텍스트 배지 */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
          404
        </div>

        {/* 작은 장식 별 */}
        <div className="absolute top-2 right-4 text-blue-200 text-xl">*</div>
        <div className="absolute bottom-8 left-2 text-blue-200 text-sm">*</div>
      </div>
    </div>
  );
}

function ShareIconSmall() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

function GlobeIconSmall() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
    </svg>
  );
}
