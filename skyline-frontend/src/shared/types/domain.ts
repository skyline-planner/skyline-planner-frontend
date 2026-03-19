// User 

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  role: UserRole;
  nickname: string | null;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UserStats {
  tripCount: number;
  completedTripCount: number;
  savedTripCount: number;
}

// Place 

export type PlaceCategory = 'ATTRACTION' | 'RESTAURANT' | 'CAFE' | 'LODGING' | 'TRANSPORT' | 'ETC';

export interface Place {
  id: number;
  name: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  address: string | null;
  country: string | null;
  city: string | null;
  externalSource: string | null;
  externalId: string | null;
  meta: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface Region {
  query: string;
  country: string;
  city: string;
}

// Trip 

export type TripStatus = 'PLANNING' | 'ONGOING' | 'COMPLETED';
export type PlanType = 'A' | 'B';
export type Currency = 'KRW' | 'USD' | 'EUR' | 'JPY' | string;

export interface Trip {
  id: number;
  userId: number;
  title: string;
  regionQuery: string | null;
  country: string | null;
  city: string | null;
  startDate: string;
  endDate: string;
  status: TripStatus;
  partyCount: number;
  budgetTotal: number | null;
  currency: Currency;
  activePlanType: PlanType;
  weatherSummary: Record<string, unknown> | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TripSummary {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  country: string | null;
  city: string | null;
  status: TripStatus;
}

export interface TripStats {
  totalDays: number;
  totalPlaces: number;
  totalCost: number;
  currency: Currency;
}

// TripDay 

export interface TripDay {
  id: number;
  tripId: number;
  dayIndex: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// Plan 

export type PlanState = 'editing' | 'analyzed' | 'compared' | 'confirmed';

export interface Plan {
  id: number;
  tripId: number;
  type: PlanType;
  label: string | null;
  version: number;
  state: PlanState;
  meta: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

// PlanItem 

export type TransportMode = 'WALK' | 'BUS' | 'SUBWAY' | 'CAR' | 'TAXI' | 'PLANE' | 'SHIP';

export interface PlanItem {
  id: number;
  planId: number;
  dayId: number;
  orderIndex: number;
  place: Place;
  startTime: string | null;
  endTime: string | null;
  memo: string | null;
  cost: number | null;
  tags: string | null;
  transportMode: TransportMode | null;
  moveMinutes: number | null;
  moveDistanceM: number | null;
  createdAt: string;
  updatedAt: string;
}

// Report 

export type SuggestionSeverity = 'INFO' | 'WARNING' | 'ERROR';

export interface TripSuggestion {
  id: number;
  reportId: number;
  title: string;
  message: string;
  severity: SuggestionSeverity | null;
  category: string | null;
  targetPlanItemIds: number[] | null;
  actionType: string | null;
  actionPayload: Record<string, unknown> | null;
  createdAt: string;
}

export interface TripReport {
  id: number;
  tripId: number;
  planId: number | null;
  routeScore: number | null;
  moveEfficiencyPct: number | null;
  spotDensity: number | null;
  lodgingRatioPct: number | null;
  totalDistanceKm: number | null;
  totalCost: number | null;
  totalMoveMinutes: number | null;
  savedDistanceKm: number | null;
  savedMinutes: number | null;
  reviewCount: number;
  summary: string | null;
  details: Record<string, unknown> | null;
  suggestions: TripSuggestion[];
  createdAt: string;
  updatedAt: string;
}

// Share 

export interface TripShare {
  id: number;
  tripId: number;
  token: string;
  isPublic: boolean;
  expiresAt: string | null;
  createdAt: string;
  revokedAt: string | null;
}

// Photo 

export interface TripPhoto {
  id: number;
  tripId: number;
  url: string;
  caption: string | null;
  placeId: number | null;
  createdAt: string;
}

// Log 

export interface TripLog {
  id: number;
  tripId: number;
  dayId: number | null;
  planItemId: number | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}
