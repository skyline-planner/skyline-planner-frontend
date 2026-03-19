// 공통 API 응답 래퍼 

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
  error: string | null;
  status: number;
}

// Auth 

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
}

// Users / Profile 

export interface ProfileSetupRequest {
  nickname: string;
  bio?: string;
  avatarUrl?: string;
}

export interface ProfileUpdateRequest {
  nickname?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface NicknameCheckResponse {
  available: boolean;
}

// Trips 

export interface TripCreateRequest {
  title: string;
  regionQuery?: string;
  country?: string;
  city?: string;
  startDate: string;
  endDate: string;
  partyCount?: number;
  budgetTotal?: number;
  currency?: string;
}

export interface TripUpdateRequest {
  title?: string;
  regionQuery?: string;
  country?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  partyCount?: number;
  budgetTotal?: number;
  currency?: string;
}

export interface TripListParams {
  q?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: 'created_at' | 'start_date';
  compareOnly?: boolean;
  cursor?: string;
  limit?: number;
}

export interface TripExtendRequest {
  endDate: string;
}

// Places 

export interface PlaceSearchParams {
  q: string;
  region?: string;
  limit?: number;
}

export interface RegionSearchParams {
  q: string;
  limit?: number;
}

export interface PlaceRecommendationParams {
  region: string;
  type?: string;
  limit?: number;
}

// Plans 

export interface PlanActivateRequest {
  planId: number;
}

// PlanItems 

export interface PlanItemCreateRequest {
  dayId: number;
  placeId: number;
  orderIndex?: number;
  startTime?: string;
  endTime?: string;
  memo?: string;
  cost?: number;
  tags?: string;
  transportMode?: string;
}

export interface PlanItemUpdateRequest {
  startTime?: string;
  endTime?: string;
  memo?: string;
  cost?: number;
  tags?: string;
  transportMode?: string;
}

export interface PlanItemReorderRequest {
  items: Array<{
    id: number;
    dayId: number;
    orderIndex: number;
  }>;
}

// Share 

export interface ShareCreateRequest {
  isPublic?: boolean;
  expiresAt?: string;
}

// Photos 

export interface PhotoUploadRequest {
  file: File;
  caption?: string;
  placeId?: number;
}

// Logs 

export interface LogCreateRequest {
  content: string;
  dayId?: number;
  planItemId?: number;
}

export interface LogUpdateRequest {
  content: string;
}
