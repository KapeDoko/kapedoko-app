<template>
  <ion-content>
    <ion-toolbar class="opacity-0" />
    <div class="px-5">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-coffee"
          class="w-6 h-6 text-kapeDoKoPrimary-500"
        />
        <span class="text-lg text-primary-600 font-bold">Cafes near me</span>
      </div>

      <div class="flex flex-col gap-4 py-5">
        <div v-for="cafe in CAFE_DATA">
          <CoffeeShopBlock :cafe="cafe" />
        </div>
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
const CAFE_DATA = ref([
  {
    cafeName: "Krooks Coffee House",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.5,
    cafeDistance: 0.5,
    cafeWifi: true,
    cafePlugs: true,
    isOpen: true,
    openingTime: "7:00 AM",
    cafeAddress: "123 Brew St, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.935242, lat: 40.73061 },
  },
  {
    cafeName: "Bean There",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.7,
    cafeDistance: 1.2,
    cafeWifi: false,
    cafePlugs: false,
    isOpen: false,
    openingTime: "8:00 AM",
    cafeAddress: "456 Java Rd, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.935242, lat: 40.74061 },
  },
  {
    cafeName: "Brewed Awakening",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.2,
    cafeDistance: 0.8,
    cafeWifi: true,
    cafePlugs: false,
    isOpen: true,
    openingTime: "6:30 AM",
    cafeAddress: "789 Espresso Ave, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.925242, lat: 40.73061 },
  },
  {
    cafeName: "The Daily Grind",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.8,
    cafeDistance: 0.3,
    cafeWifi: true,
    cafePlugs: true,
    isOpen: true,
    openingTime: "7:30 AM",
    cafeAddress: "321 Brew Blvd, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.915242, lat: 40.73061 },
  },
  {
    cafeName: "The Daily Grind",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.8,
    cafeDistance: 0.3,
    cafeWifi: true,
    cafePlugs: true,
    isOpen: true,
    openingTime: "7:30 AM",
    cafeAddress: "321 Brew Blvd, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.915242, lat: 40.73061 },
  },
  {
    cafeName: "The Daily Grind",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.8,
    cafeDistance: 0.3,
    cafeWifi: true,
    cafePlugs: true,
    isOpen: true,
    openingTime: "7:30 AM",
    cafeAddress: "321 Brew Blvd, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.915242, lat: 40.73061 },
  },
  {
    cafeName: "The Daily Grind",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.8,
    cafeDistance: 0.3,
    cafeWifi: true,
    cafePlugs: true,
    isOpen: true,
    openingTime: "7:30 AM",
    cafeAddress: "321 Brew Blvd, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.915242, lat: 40.73061 },
  },
  {
    cafeName: "The Daily Grind",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.8,
    cafeDistance: 0.3,
    cafeWifi: true,
    cafePlugs: true,
    isOpen: true,
    openingTime: "7:30 AM",
    cafeAddress: "321 Brew Blvd, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.915242, lat: 40.73061 },
  },
]);
</script>

<style></style>
