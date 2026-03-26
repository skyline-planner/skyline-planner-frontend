import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/authApi";
import { useAuthStore } from "@/shared/stores/authStore";
import { queryKeys } from "@/shared/api/queryKeys";

/**
 * 현재 로그인된 사용자 정보를 조회하는 훅
 
* - isAuthenticated가 true일 때만 쿼리를 실행한다
 * - 성공 시 authStore의 user를 업데이트한다
 */
export function useMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: async () => {
      const res = await fetchMe();
      if (res.data) setUser(res.data);
      return res.data;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5분간 fresh 유지
  });
}
