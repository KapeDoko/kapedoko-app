<template>
  <div class="flex flex-col justify-between">
    <div class="relative h-[calc(45vh)] w-full">
      <div
        class="flex flex-col gap-3 px-5 w-full absolute bottom-0 -right-28 z-0"
      >
        <div v-for="cafe in CAFE_DATA" class="w-[100vw] shadow-lg">
          <CoffeeShopBlock :cafe="cafe" class=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const CAFE_DATA = ref([
  {
    cafeName: "The Great Cafe",
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
    cafeName: "Wonderful Cafe",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.7,
    cafeDistance: 1.2,
    cafeWifi: true,
    cafePlugs: false,
    isOpen: false,
    openingTime: "8:00 AM",
    cafeAddress: "456 Java Rd, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.935242, lat: 40.74061 },
  },
]);
</script>

<style></style>
