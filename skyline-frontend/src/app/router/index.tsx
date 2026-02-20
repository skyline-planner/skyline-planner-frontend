import { Navigate, Route, Routes } from "react-router-dom";

function LandingPage() {
  return <div>SCR-01 Landing</div>;
}
function AuthPage() {
  return <div>SCR-02 Auth</div>;
}
function HomePage() {
  return <div>SCR-04 Home</div>;
}
function TripsPage() {
  return <div>SCR-08 Trips</div>;
}
function ProfilePage() {
  return <div>SCR-10 Profile</div>;
}
function NotFoundPage() {
  return <div>SCR-13 404</div>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route path="/home" element={<HomePage />} />
      <Route path="/trips" element={<TripsPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* 없는 주소는 바로 404 페이지를 보여준다 */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
