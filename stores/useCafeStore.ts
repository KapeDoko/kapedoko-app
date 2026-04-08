import type {
  Cafe,
  FetchNearbyCafesResponse,
  FoursquareCafeResult,
} from "@/types/cafe";
import { defineStore } from "pinia";

type CachedCafesEntry = {
  data: FetchNearbyCafesResponse;
  expiresAt: number;
};

const REQUEST_CACHE_TTL_MS = 60 * 1000;
const RATE_LIMIT_COOLDOWN_MS = 30 * 1000;
const EMPTY_SEARCH_RESPONSE: FetchNearbyCafesResponse = { results: [] };

const requestCache = new Map<string, CachedCafesEntry>();
const inFlightRequests = new Map<string, Promise<FetchNearbyCafesResponse>>();
const rateLimitCooldownUntil = new Map<string, number>();

const toCoordKey = (lat: number, lng: number): string => {
  const normalizedLat = Number(lat.toFixed(4));
  const normalizedLng = Number(lng.toFixed(4));
  return `${normalizedLat}:${normalizedLng}`;
};

const getErrorStatusCode = (error: unknown): number | null => {
  if (!error || typeof error !== "object") {
    return null;
  }

  const maybeError = error as {
    status?: number;
    statusCode?: number;
    response?: { status?: number };
    data?: { statusCode?: number };
  };

  return (
    maybeError.statusCode ??
    maybeError.status ??
    maybeError.response?.status ??
    maybeError.data?.statusCode ??
    null
  );
};

const mapFoursquareResultToCafe = (place: FoursquareCafeResult): Cafe => {
  return {
    cafeName: place.name ?? null,
    cafeImage: place.photos?.[0]
      ? `${place.photos[0].prefix}original${place.photos[0].suffix}`
      : null,
    cafeRating: null,
    cafeDistance: typeof place.distance === "number" ? place.distance : null,
    cafeWifi: null,
    cafePlugs: null,
    isOpen: null,
    openingTime: null,
    cafeAddress:
      place.location?.formatted_address ??
      place.location?.address ??
      null,
    cafeCoordinates: {
      lat: place.latitude,
      lng: place.longitude,
    },
  };
};

export const useCafeStore = defineStore("cafe", {
  state: () => ({
    nearbyCafesRaw: [] as FoursquareCafeResult[],
    nearbyCafes: [] as Cafe[],
    nearbyCafesContext: null as FetchNearbyCafesResponse["context"] | null,
  }),
  actions: {
    async fetchNearbyCafesServer(lat: number, lng: number): Promise<FetchNearbyCafesResponse> {
      const now = Date.now();
      const coordKey = toCoordKey(lat, lng);

      const cached = requestCache.get(coordKey);
      if (cached && cached.expiresAt > now) {
        return cached.data;
      }

      const cooldownUntil = rateLimitCooldownUntil.get(coordKey) ?? 0;
      if (cooldownUntil > now) {
        return cached?.data ?? EMPTY_SEARCH_RESPONSE;
      }

      const existingRequest = inFlightRequests.get(coordKey);
      if (existingRequest) {
        return existingRequest;
      }

      const request = (async () => {
        try {
          const normalizedLat = Number(lat.toFixed(4));
          const normalizedLng = Number(lng.toFixed(4));

          const cafes = await $fetch<FetchNearbyCafesResponse>(
            "/api/foursquare/search",
            {
              method: "GET",
              query: { lat: normalizedLat, lng: normalizedLng },
            },
          );

          console.log("Fetched cafes from API:", cafes);

          const safeCafes: FetchNearbyCafesResponse = {
            ...cafes,
            results: Array.isArray(cafes?.results) ? cafes.results : [],
          };
          requestCache.set(coordKey, {
            data: safeCafes,
            expiresAt: Date.now() + REQUEST_CACHE_TTL_MS,
          });
          rateLimitCooldownUntil.delete(coordKey);

          return safeCafes;
        } catch (error) {
          const statusCode = getErrorStatusCode(error);
          if (statusCode === 429) {
            rateLimitCooldownUntil.set(coordKey, Date.now() + RATE_LIMIT_COOLDOWN_MS);
          }

          console.error("Error fetching cafes:", error);
          return cached?.data ?? EMPTY_SEARCH_RESPONSE;
        } finally {
          inFlightRequests.delete(coordKey);
        }
      })();

      inFlightRequests.set(coordKey, request);
      return request;
    },

    async fetchNearbyCafes(lat: number, lng: number) {
      this.nearbyCafesRaw = [];
      this.nearbyCafes = [];

      const response = await this.fetchNearbyCafesServer(lat, lng);
      this.nearbyCafesRaw = response.results;
      this.nearbyCafesContext = response.context ?? null;
      this.nearbyCafes = response.results.map((place) => mapFoursquareResultToCafe(place));

      return this.nearbyCafes;
    },
  },
});
