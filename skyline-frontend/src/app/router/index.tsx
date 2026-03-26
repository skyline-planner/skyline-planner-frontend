import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

/**
 * 앱 전체 라우터
 * 라우트 정의는 routes.tsx에서 관리하고, 여기서는 렌더링만 담당한다.
 */
export function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
