import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/shared/stores/authStore";

/**
 * 로그인이 필요한 라우트를 보호하는 래퍼 컴포넌트.
 * 미인증 상태이면 /auth로 리다이렉트하고, 인증 상태이면 자식 라우트를 렌더링한다.
 */
export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
