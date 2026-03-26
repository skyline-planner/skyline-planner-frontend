import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { startGoogleOAuth } from "../api/authApi";
import { useAuthStore } from "@/shared/stores/authStore";

/**
 * SCR-02 로그인 화면
 * - Google OAuth 버튼을 통해 소셜 로그인 진행
 * - MSW 환경에서는 목업 토큰을 저장하고 홈으로 이동
 * - 실제 환경에서는 백엔드 OAuth 엔드포인트로 리다이렉트
 * - 이미 로그인된 사용자는 홈으로 리다이렉트한다
 */
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // 이미 인증된 사용자는 홈으로 이동
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  /**
   * Google 로그인 버튼 클릭 핸들러
   */
  async function handleGoogleLogin() {
    setIsLoading(true);
    try {
      await startGoogleOAuth();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      {/* 상단 로고 */}
      <header className="px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800 leading-tight">Skyline Planner</div>
            <div className="text-[10px] text-gray-400 leading-tight tracking-widest uppercase">
              Travel Optimizer
            </div>
          </div>
        </div>
      </header>

      {/* 배경 구름 장식 */}
      <div className="relative flex-1 flex items-center justify-center px-4">
        <CloudDecoration className="absolute top-4 left-8 w-20 h-12 opacity-60" />
        <CloudDecoration className="absolute bottom-16 right-12 w-28 h-16 opacity-40" />
        <CloudDecoration className="absolute top-1/3 right-8 w-16 h-10 opacity-30" />

        {/* 로그인 카드 */}
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm px-8 py-10 flex flex-col items-center gap-6 z-10">
          {/* 지구본 아이콘 */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-9 h-9 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93V18c0-.55.45-1 1-1s1 .45 1 1v1.93C16.06 19.48 19 16.24 19 12h-1c-.55 0-1-.45-1-1s.45-1 1-1h1.93C18.48 6.94 15.24 4 11.07 4.07V5c0 .55-.45 1-1 1s-1-.45-1-1V4.07C5.54 4.56 3 8.07 3 12c0 4.24 2.94 7.48 6.93 7.93z" />
            </svg>
          </div>

          {/* 문구 */}
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800 mb-2">다음 여행을 시작하세요</h1>
            <p className="text-sm text-gray-400">
              수천 명의 여행자들과 함께 꿈의 여행을
              <br />
              계획해보세요.
            </p>
          </div>

          {/* Google 로그인 버튼 */}
          <div className="w-full flex flex-col items-center gap-3">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium rounded-xl py-3 transition-colors"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              구글로 시작하기
            </button>
            <p className="text-xs text-gray-400">구글 계정으로 간편하게 시작해보세요</p>
          </div>

          {/* 구분선 */}
          <div className="w-full border-t border-gray-100" />

          {/* 약관 동의 안내 */}
          <p className="text-xs text-blue-400 hover:underline cursor-pointer">
            가입시 서비스 약관에 동의합니다
          </p>
        </div>
      </div>

      {/* 하단 푸터 */}
      <footer className="py-6 flex flex-col items-center gap-3">
        <div className="flex gap-6 text-xs text-gray-400">
          <span className="hover:text-gray-600 cursor-pointer">개인정보 처리방침</span>
          <span className="hover:text-gray-600 cursor-pointer">이용약관</span>
          <span className="hover:text-gray-600 cursor-pointer">고객센터</span>
        </div>
        <div className="flex gap-4 text-gray-300">
          <SoundIcon />
          <ShareIcon />
          <GlobeIcon />
        </div>
        <p className="text-xs text-gray-300">© 2024 Skyline Planner Inc.</p>
      </footer>
    </div>
  );
}

/** Google 로고 SVG 아이콘 */
function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/** 구름 장식 SVG */
function CloudDecoration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 70" fill="none" aria-hidden="true">
      <rect x="10" y="30" width="100" height="35" rx="17.5" fill="#bfdbfe" />
      <circle cx="35" cy="35" r="20" fill="#bfdbfe" />
      <circle cx="65" cy="25" r="25" fill="#bfdbfe" />
      <circle cx="90" cy="35" r="18" fill="#bfdbfe" />
    </svg>
  );
}

/** 소리 아이콘 */
function SoundIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  );
}

/** 공유 아이콘 */
function ShareIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

/** 지구 아이콘 */
function GlobeIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
    </svg>
  );
}
