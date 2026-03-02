// /types/cafe.ts
export type Cafe = {
  cafeName: string;
  cafeImage: string;
  cafeRating: number;
  cafeDistance: number;
  cafeWifi: boolean;
  cafePlugs: boolean;
  isOpen: boolean;
  openingTime: string;
  cafeAddress: string;
  cafeCoordinates: {
    lng: number;
    lat: number;
  };
};
