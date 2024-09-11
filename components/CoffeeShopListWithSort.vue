<template>
  <div class="flex flex-col gap-4">
    <UCarousel
      v-slot="{ item, index }"
      :items="SORT_BY"
      :ui="{ item: 'snap-start', container: 'flex gap-3' }"
    >
      <div
        class="px-5 py-1 rounded transition-all cursor-pointer"
        :class="
          item.isActive
            ? 'bg-kapedokoPrimary-500 text-white font-bold'
            : 'bg-black/10'
        "
        @click="
          () => {
            toggleSort(index);
          }
        "
      >
        <span class="text-sm">{{ item.name }}</span>
      </div>
    </UCarousel>
    <div v-for="cafe in CAFE_DATA">
      <CoffeeShopBlock :cafe="cafe" />
    </div>
  </div>
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
    cafeName: "Java Junction",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.0,
    cafeDistance: 1.5,
    cafeWifi: false,
    cafePlugs: true,
    isOpen: true,
    openingTime: "7:00 AM",
    cafeAddress: "654 Coffee Ct, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.905242, lat: 40.73061 },
  },
  {
    cafeName: "Espresso Emporium",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.3,
    cafeDistance: 0.7,
    cafeWifi: true,
    cafePlugs: true,
    isOpen: true,
    openingTime: "7:15 AM",
    cafeAddress: "987 Mocha St, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.895242, lat: 40.73061 },
  },
  {
    cafeName: "Latte Lounge",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.6,
    cafeDistance: 1.1,
    cafeWifi: true,
    cafePlugs: false,
    isOpen: false,
    openingTime: "8:30 AM",
    cafeAddress: "159 Latte Ln, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.885242, lat: 40.73061 },
  },
  {
    cafeName: "Mocha Mecca",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.1,
    cafeDistance: 0.9,
    cafeWifi: true,
    cafePlugs: true,
    isOpen: true,
    openingTime: "7:00 AM",
    cafeAddress: "753 Cappuccino Dr, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.875242, lat: 40.73061 },
  },
  {
    cafeName: "Cappuccino Corner",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.4,
    cafeDistance: 0.4,
    cafeWifi: true,
    cafePlugs: true,
    isOpen: true,
    openingTime: "7:30 AM",
    cafeAddress: "852 Americano Ave, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.865242, lat: 40.73061 },
  },
  {
    cafeName: "Americano Avenue",
    cafeImage: "https://picsum.photos/200",
    cafeRating: 4.9,
    cafeDistance: 0.2,
    cafeWifi: true,
    cafePlugs: true,
    isOpen: true,
    openingTime: "6:45 AM",
    cafeAddress: "246 Brewster Blvd, Coffee Town, CT 12345",
    cafeCoordinates: { lng: -73.855242, lat: 40.73061 },
  },
]);

const SORT_BY = ref([
  {
    name: "Near You",
    value: "near-you",
    isActive: true,
  },
  {
    name: "Popular",
    value: "popular",
    isActive: false,
  },

  {
    name: "WiFi Access",
    value: "wifi-access",
    isActive: false,
  },

  {
    name: "Plugs Available",
    value: "plugs-available",
    isActive: false,
  },
]);

const toggleSort = (index: number) => {
  SORT_BY.value.forEach((item, i) => {
    item.isActive = i === index;
  });
};
</script>

<style></style>
