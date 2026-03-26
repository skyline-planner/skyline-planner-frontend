import { create } from "zustand";
import type { User } from "@/shared/types/domain";

/**
 * 인증 상태를 관리하는 전역 Zustand 스토어
 * - user: 현재 로그인된 사용자 정보 (null이면 미로그인)
 * - isAuthenticated: 로그인 여부 (access_token 존재 여부로 초기화)
 */
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  // 페이지 로드 시 localStorage에 토큰이 있으면 인증된 상태로 초기화
  isAuthenticated: !!localStorage.getItem("access_token"),

  setUser: (user) => set({ user }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  clearAuth: () => {
    localStorage.removeItem("access_token");
    set({ user: null, isAuthenticated: false });
  },
}));
