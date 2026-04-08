import type {
  FetchNearbyCafesResponse,
  FoursquareSearchResponse,
} from "@/types/cafe";

type CachedEntry = {
  data: FetchNearbyCafesResponse;
  expiresAt: number;
};

const LOCAL_CACHE_TTL_MS = 5 * 60 * 1000;
const DEFAULT_COOLDOWN_MS = 30 * 1000;
const EMPTY_SEARCH_RESPONSE: FetchNearbyCafesResponse = { results: [] };

const localResponseCache = new Map<string, CachedEntry>();
const rateLimitCooldownUntil = new Map<string, number>();

const normalizeCoord = (value: number): number => Number(value.toFixed(4));

const getStatusCode = (error: unknown): number | null => {
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

const getRetryAfterMs = (error: unknown): number | null => {
  if (!error || typeof error !== "object") {
    return null;
  }

  const maybeHeaders = (error as { response?: { headers?: Headers } }).response?.headers;
  const retryAfterRaw = maybeHeaders?.get("retry-after");
  if (!retryAfterRaw) {
    return null;
  }

  const seconds = Number(retryAfterRaw);
  if (Number.isFinite(seconds) && seconds > 0) {
    return seconds * 1000;
  }

  const asDate = Date.parse(retryAfterRaw);
  if (Number.isFinite(asDate)) {
    const delta = asDate - Date.now();
    return delta > 0 ? delta : null;
  }

  return null;
};

export default defineEventHandler(
  cachedEventHandler(
    async (event): Promise<FetchNearbyCafesResponse> => {
      const config = useRuntimeConfig(event);
      const query = getQuery(event);

      const latRaw = Number(query.lat);
      const lngRaw = Number(query.lng);

      console.log(`Received request for coordinates: ${query.lat}, ${query.lng}`);

      if (!Number.isFinite(latRaw) || !Number.isFinite(lngRaw)) {
        throw createError({
          statusCode: 400,
          statusMessage: "Invalid coordinates",
        });
      }

      const lat = normalizeCoord(latRaw);
      const lng = normalizeCoord(lngRaw);
      const cacheKey = `${lat}:${lng}`;
      const now = Date.now();

      const cached = localResponseCache.get(cacheKey);
      if (cached && cached.expiresAt > now) {
        return cached.data;
      }

      console.log(`No valid cache found for coordinates: ${lat}, ${lng}`);

      const cooldownUntil = rateLimitCooldownUntil.get(cacheKey) ?? 0;
      if (cooldownUntil > now) {
        return cached?.data ?? EMPTY_SEARCH_RESPONSE;
      }

      console.log(`Fetching cafes from API for coordinates: ${lat}, ${lng}`);

      const apiKey = String(config.foursquareApiKey ?? "").trim();
      if (!apiKey) {
        console.log("Foursquare API key is missing in configuration");
        throw createError({
          statusCode: 500,
          statusMessage: "Missing Foursquare API key",
        });
      }

      console.log("Using Foursquare API key:", apiKey);

      const ll = `${lat.toFixed(4)},${lng.toFixed(4)}`;
      const params = new URLSearchParams({
        fsq_category_ids: "5665c7b9498e7d8a4f2c0f06,63be6904847c3692a84b9bb6,52e81612bcbc57f1066b7a0c,4bf58dd8d48988d16d941735,4bf58dd8d48988d1e0931735,56aa371be4b08b9a8d573508,4bf58dd8d48988d1dc931735",
        ll: ll,
        sort: "DISTANCE",
        limit: "30",
        radius: "2000",
      });
      
      const requestUrl = `https://places-api.foursquare.com/places/search?${params.toString()}`;

      console.log(`Constructed API request with params: ${params.toString()}`);

      console.log(`Making API request to URL: ${requestUrl}`);
      try {
        const data = await $fetch<FoursquareSearchResponse>(
          requestUrl,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
              "X-Places-Api-Version": "2025-06-17",
            },
          },
        );

        const safeResponse: FetchNearbyCafesResponse = {
          ...data,
          results: Array.isArray(data.results)
            ? data.results.filter(
              (place) =>
                typeof place.latitude === "number" &&
                typeof place.longitude === "number",
            )
            : [],
        };

        localResponseCache.set(cacheKey, {
          data: safeResponse,
          expiresAt: Date.now() + LOCAL_CACHE_TTL_MS,
        });
        rateLimitCooldownUntil.delete(cacheKey);

        return safeResponse;
      } catch (error) {
        const statusCode = getStatusCode(error);

        if (statusCode === 429) {
          const retryAfterMs = getRetryAfterMs(error) ?? DEFAULT_COOLDOWN_MS;
          rateLimitCooldownUntil.set(cacheKey, Date.now() + retryAfterMs);
          return cached?.data ?? EMPTY_SEARCH_RESPONSE;
        }

        throw error;
      }
    },
    {
      maxAge: 60 * 5,
      getKey: (event) => {
        const query = getQuery(event);
        const lat = Number(query.lat);
        const lng = Number(query.lng);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return `cafes:invalid:${query.lat}:${query.lng}`;
        }

        return `cafes:${normalizeCoord(lat)}:${normalizeCoord(lng)}`;
      },
    },
  ),
);