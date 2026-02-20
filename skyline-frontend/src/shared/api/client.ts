import axios from "axios";

/**
 * axios 인스턴스 생성
 * - baseURL은 .env에서 읽어옴
 * - 모든 API 요청은 이 인스턴스를 사용함
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false, // 지금은 토큰 방식이므로 false
});

/**
 * 요청 인터셉터
 * - 모든 요청 전에 실행됨
 * - access_token이 있으면 자동으로 Authorization 헤더에 붙여줌
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * 응답 인터셉터
 * - 에러를 한 번에 처리할 수 있는 위치
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 예: 401이면 로그인 페이지로 보내는 처리 가능
    if (error.response?.status === 401) {
      console.warn("인증 만료. 다시 로그인 필요.");
    }

    return Promise.reject(error);
  }
);
