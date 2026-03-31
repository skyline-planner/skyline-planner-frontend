import { useRoutes } from "react-router-dom";

import { routes } from "./routes";

/**
 * 앱 전체 라우터
 * 라우트 정의는 routes.tsx에서 관리하고, 여기서는 렌더링만 담당한다.
 * useRoutes를 사용해 중첩 라우트(ProtectedRoute children)를 지원한다.
 */
export function AppRouter() {
  const element = useRoutes(routes);
  return element;
}
