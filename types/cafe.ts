// /types/cafe.ts
export type Cafe = {
  cafeName: string | null;
  cafeImage: string | null;
  cafeRating: number | null;
  cafeDistance: number | null;
  cafeWifi: boolean | null;
  cafePlugs: boolean | null;
  isOpen: boolean | null;
  openingTime: string | null;
  cafeAddress: string | null;
  cafeCoordinates: {
    lng: number;
    lat: number;
  };
};

export type FoursquareCategory = {
  fsq_category_id: string;
  name: string;
  short_name: string;
  plural_name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
};

export type FoursquarePlace = {
  fsq_place_id: string;
  name: string;
  latitude: number;
  longitude: number;
  categories?: FoursquareCategory[];
  chains?: Array<{
    fsq_chain_id: string;
    name: string;
  }>;
  date_created?: string;
  date_refreshed?: string;
  distance?: number;
  extended_location?: Record<string, unknown>;
  link?: string;
  placemaker_url?: string;
  related_places?: {
    parent?: {
      fsq_place_id: string;
      categories?: FoursquareCategory[];
      name?: string;
    };
  };
  social_media?: {
    twitter?: string;
    facebook_id?: string;
    instagram?: string;
  };
  tel?: string;
  website?: string;
  email?: string;
  location?: {
    address?: string;
    locality?: string;
    region?: string;
    postcode?: string;
    country?: string;
    formatted_address?: string;
  };
  photos?: Array<{
    prefix: string;
    suffix: string;
  }>;
};

export type FoursquareSearchResponse = {
  results: FoursquarePlace[];
  context?: {
    geo_bounds?: {
      circle?: {
        center?: {
          latitude: number;
          longitude: number;
        };
        radius?: number;
      };
    };
  };
  message?: string;
};

export type FoursquareCafeResult = FoursquarePlace;

export type FetchNearbyCafesResponse = FoursquareSearchResponse;

export type UseCafesResponse = {
  fetchNearbyCafes: (lat: number, lng: number) => Promise<Cafe[]>;
};