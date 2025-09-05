<template>
  <ion-page>
    <ion-content>
      <div class="flex flex-col h-screen">
        <div class="relative z-30">
          <div class="flex flex-col gap-5">
            <ion-toolbar class="opacity-0"></ion-toolbar>
            <div class="px-5 flex items-center justify-center">
              <div class="flex items-center gap-2 flex-1">
                <div class="h-6">
                  <UIcon
                    name="i-lucide-arrow-left"
                    class="w-6 h-6 text-primary-500"
                    @click="router.go(-1)"
                  />
                </div>
              </div>
              <span class="flex-1 -ml-[26px]">
                <UIcon name="i-lucide-heart" class="w-8 h-8 text-primary-500"
              /></span>
            </div>
          </div>
        </div>
        <div class="absolute -z-0 opacity-5 top-16 flex justify-center w-full">
          <img src="/assets/logo/KapeDoko-Dark.svg" class="" />
        </div>
        <div class="flex flex-col p-5 items-center">
          <span class="font-semibold">Here are your favorite</span>
          <span class="font-batangas font-bold text-2xl">coffee shops</span>
        </div>

        <!-- Style Changer -->
        <div class="flex flex-col items-end pb-3">
          <div class="flex gap-1 pr-5">
            <div
              class="rounded p-1 flex items-center shadow transition-all"
              @click="changeLayout(1)"
              :class="
                isAlbumLayoutActive
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-primary-500'
              "
            >
              <UIcon name="i-lucide-panel-left" class="w-6 h-6" />
            </div>
            <div
              class="rounded p-1 flex items-center shadow transition-all"
              @click="changeLayout(2)"
              :class="
                isListLayoutActive
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-primary-500'
              "
            >
              <UIcon name="i-lucide-layout-list" class="w-6 h-6" />
            </div>
          </div>
        </div>

        <!-- Album Style -->
        <div v-if="isAlbumLayoutActive" class="px-5 flex-1 pb-5" v-motion-pop-visible-once>
          <div class="bg-primary-500 flex flex-col gap-5 rounded-lg p-8 h-full">
            <div
              v-for="(cafe, index) in CAFE_DATA"
              :key="index"
              v-show="index === albumCounter"
              class="h-full text-white flex flex-col items-center"
            >
              <div class="w-full h-full flex flex-col gap-5">
                <img
                  :src="cafe.cafeImage"
                  alt="Cafe Image"
                  class="object-cover h-[80%] w-full rounded-lg"
                />
                <div
                  class="flex flex-col items-center justify-center h-[20%] text-center"
                >
                  <span class="font-bold text-xl font-batangas" v-motion-slide-visible-left>{{
                    cafe.cafeName
                  }}</span>
                  <span class="">{{ cafe.cafeAddress }}</span>
                </div>
              </div>
            </div>
            <div class="flex gap-2 items-center justify-center text-white">
              <UIcon
                name="i-lucide-circle-arrow-left"
                class="w-8 h-8"
                @click="scrollAlbum(1)"
                :class="albumCounter > 0 ? '' : 'text-black/20'"
              />
              <UIcon
                name="i-lucide-circle-arrow-right"
                class="w-8 h-8"
                @click="scrollAlbum(0)"
                :class="
                  albumCounter === CAFE_DATA.length - 1 ? 'text-black/20' : ''
                "
              />
            </div>
          </div>
        </div>

        <div v-if="isListLayoutActive" class="px-5 flex-1 pb-5 transition-all z-30">
          <div
            v-for="(cafe, index) in CAFE_DATA"
            :key="index"
            class="shadow-lg p-4 rounded-lg transition-all hover:bg-kapedokoPrimary-100"
            v-motion-slide-right
          >
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <img
                  :src="cafe.cafeImage"
                  alt="Cafe Image"
                  class="object-cover h-[60px] w-[60px] rounded-full"
                />
                <div class="flex flex-col">
                  <span class="font-bold font-batangas text-lg">{{
                    cafe.cafeName
                  }}</span>
                  <span class="text-sm">{{ cafe.cafeAddress }}</span>
                </div>
              </div>
              <div class="flex">
                <UIcon name="fa-solid-heart" class="w-4 h-4 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
const isAlbumLayoutActive = ref(true);
const isListLayoutActive = ref(false);
const albumCounter = ref(0);
const router = useRouter();

const changeLayout = (layout: number) => {
  if (layout === 1) {
    isAlbumLayoutActive.value = true;
    isListLayoutActive.value = false;
  } else {
    isAlbumLayoutActive.value = false;
    isListLayoutActive.value = true;
  }
};

const scrollAlbum = (action: number) => {
  if (action === 1) {
    if (albumCounter.value !== 0) {
      albumCounter.value--;
    }
  } else {
    if (albumCounter.value !== CAFE_DATA.value.length - 1) {
      albumCounter.value++;
    }
  }
};

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
]);
</script>

<style></style>
