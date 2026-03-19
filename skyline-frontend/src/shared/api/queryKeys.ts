import type { TripListParams } from '../types/api';

export const queryKeys = {
  // Auth 
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  // Users 
  users: {
    all: ['users'] as const,
    me: () => [...queryKeys.users.all, 'me'] as const,
    stats: () => [...queryKeys.users.all, 'me', 'stats'] as const,
    tripsSummary: () => [...queryKeys.users.all, 'me', 'trips', 'summary'] as const,
    saves: (params?: Record<string, unknown>) =>
      [...queryKeys.users.all, 'me', 'saves', params] as const,
    nicknameCheck: (nickname: string) =>
      [...queryKeys.users.all, 'nickname', 'check', nickname] as const,
  },

  // Trips 
  trips: {
    all: ['trips'] as const,
    list: (params?: TripListParams) => [...queryKeys.trips.all, 'list', params] as const,
    nearest: () => [...queryKeys.trips.all, 'nearest'] as const,
    detail: (tripId: number) => [...queryKeys.trips.all, tripId] as const,
    days: (tripId: number) => [...queryKeys.trips.all, tripId, 'days'] as const,
    weather: (tripId: number) => [...queryKeys.trips.all, tripId, 'weather'] as const,
    stats: (tripId: number) => [...queryKeys.trips.all, tripId, 'stats'] as const,
    shares: (tripId: number, status?: string) =>
      [...queryKeys.trips.all, tripId, 'shares', status] as const,
    photos: (tripId: number, params?: Record<string, unknown>) =>
      [...queryKeys.trips.all, tripId, 'photos', params] as const,
    logs: (tripId: number, params?: Record<string, unknown>) =>
      [...queryKeys.trips.all, tripId, 'logs', params] as const,
  },

  // Plans 
  plans: {
    all: (tripId: number) => [...queryKeys.trips.all, tripId, 'plans'] as const,
    detail: (tripId: number, planId: number) =>
      [...queryKeys.plans.all(tripId), planId] as const,
    items: (tripId: number, planId: number, params?: Record<string, unknown>) =>
      [...queryKeys.plans.detail(tripId, planId), 'items', params] as const,
    item: (tripId: number, planId: number, itemId: number) =>
      [...queryKeys.plans.detail(tripId, planId), 'items', itemId] as const,
  },

  // Places 
  places: {
    all: ['places'] as const,
    search: (q: string, region?: string) =>
      [...queryKeys.places.all, 'search', q, region] as const,
    regions: (q: string) => [...queryKeys.places.all, 'regions', q] as const,
    recommendations: (region: string, type?: string) =>
      [...queryKeys.places.all, 'recommendations', region, type] as const,
    autocomplete: (q: string) => [...queryKeys.places.all, 'autocomplete', q] as const,
    detail: (placeId: number) => [...queryKeys.places.all, placeId] as const,
  },

  // Public Share 
  publicShare: {
    all: ['public', 'shares'] as const,
    detail: (token: string) => [...queryKeys.publicShare.all, token] as const,
  },
} as const;
