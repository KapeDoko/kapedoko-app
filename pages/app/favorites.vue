<template>
  <ion-page>
    <ion-content class="favorites-content" :fullscreen="true">
      <div class="min-h-full flex flex-col relative">
        <div class="h-[245px] bg-kapedokoPrimary-500 relative overflow-hidden">
          <img
            :src="logoBg"
            alt="KapeDoko logo background"
            class="size-[285px] absolute -top-10 -right-14 opacity-10"
          />
          <div class="absolute inset-0 z-20 flex flex-col">
            <ion-toolbar class="opacity-0"></ion-toolbar>
            <div class="px-5 pt-3 flex items-start justify-between text-white">
              <button
                class="size-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Go back"
                @click="router.go(-1)"
              >
                <UIcon name="i-lucide-arrow-left" class="w-5 h-5" />
              </button>
              <div class="size-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                <UIcon name="i-lucide-heart" class="w-5 h-5" />
              </div>
            </div>

            <div class="px-5 mt-6 text-white">
              <span class="text-[11px] tracking-[0.28em] uppercase opacity-75">Saved Spots</span>
              <h1 class="font-batangas text-[2rem] leading-none mt-1">Favorites</h1>
              <p class="text-sm opacity-80 mt-2">Your curated list of go-to coffee shops.</p>
            </div>
          </div>
        </div>

        <div class="px-5 -mt-6 z-30 flex-1 flex flex-col gap-5 pb-5">
          <div class="bg-white rounded-3xl shadow-[0_12px_40px_rgba(55,45,37,0.15)] p-4 sm:p-5 border border-kapedokoSecondary-200/70">
            <div class="flex items-center justify-between gap-3">
              <div class="flex flex-col">
                <span class="text-[11px] uppercase tracking-[0.22em] text-kapedokoGray-500">Collection</span>
                <span class="font-semibold text-kapedokoPrimary-700">Here are your favorite coffee shops</span>
              </div>
              <div class="flex gap-1">
                <button
                  class="rounded-xl p-2 flex items-center shadow-sm border transition-all"
                  @click="changeLayout(1)"
                  :class="
                    isAlbumLayoutActive
                      ? 'bg-kapedokoPrimary-500 text-white border-kapedokoPrimary-500'
                      : 'bg-white text-kapedokoPrimary-500 border-kapedokoSecondary-200'
                  "
                  aria-label="Album layout"
                >
                  <UIcon name="i-lucide-panel-left" class="w-5 h-5" />
                </button>
                <button
                  class="rounded-xl p-2 flex items-center shadow-sm border transition-all"
                  @click="changeLayout(2)"
                  :class="
                    isListLayoutActive
                      ? 'bg-kapedokoPrimary-500 text-white border-kapedokoPrimary-500'
                      : 'bg-white text-kapedokoPrimary-500 border-kapedokoSecondary-200'
                  "
                  aria-label="List layout"
                >
                  <UIcon name="i-lucide-layout-list" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Album Style -->
          <div v-if="isAlbumLayoutActive" class="flex-1 pb-2">
            <div class="bg-kapedokoPrimary-500 flex flex-col gap-5 rounded-3xl p-4 sm:p-5 h-full shadow-lg">
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
                    class="object-cover h-[82%] w-full rounded-2xl"
                  />
                  <div
                    class="flex flex-col items-center justify-center h-[18%] text-center"
                  >
                    <span class="font-bold text-xl font-batangas">{{
                      cafe.cafeName
                    }}</span>
                    <span class="text-white/85 text-sm">{{ cafe.cafeAddress }}</span>
                  </div>
                </div>
              </div>
              <div class="flex gap-3 items-center justify-center text-white pt-1">
                <UIcon
                  name="i-lucide-circle-arrow-left"
                  class="w-8 h-8"
                  @click="scrollAlbum(1)"
                  :class="albumCounter > 0 ? '' : 'opacity-0'"
                />
                <UIcon
                  name="i-lucide-circle-arrow-right"
                  class="w-8 h-8"
                  @click="scrollAlbum(0)"
                  :class="
                    albumCounter === CAFE_DATA.length - 1 ? 'opacity-0' : ''
                  "
                />
              </div>
            </div>
          </div>

          <div v-if="isListLayoutActive" class="flex-1 pb-2 transition-all z-30">
            <div class="flex flex-col gap-3">
              <div
                v-for="(cafe, index) in CAFE_DATA"
                :key="index"
                class="shadow-md p-4 rounded-2xl transition-all bg-white border border-kapedokoSecondary-200/80 hover:bg-kapedokoPrimary-50"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 min-w-0">
                    <img
                      :src="cafe.cafeImage"
                      alt="Cafe Image"
                      class="object-cover h-[60px] w-[60px] rounded-full shrink-0"
                    />
                    <div class="flex flex-col min-w-0">
                      <span class="font-bold font-batangas text-lg leading-tight">{{
                        cafe.cafeName
                      }}</span>
                      <span class="text-sm text-kapedokoGray-600 truncate">{{ cafe.cafeAddress }}</span>
                    </div>
                  </div>
                  <div class="flex shrink-0">
                    <UIcon name="fa-solid-heart" class="w-4 h-4 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

    <ion-footer class="sticky bottom-0 w-full bg-white/95 backdrop-blur-sm border-t border-kapedokoSecondary-200/80">
      <NavigationBar />
    </ion-footer>
  </ion-page>
</template>

<script lang="ts" setup>
import logoBg from "~/assets/logo/KapeDoko-Light.svg";

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

<style scoped>
.favorites-content {
  --background: linear-gradient(
    to bottom,
    theme("colors.kapedokoPrimary.500") 0%,
    theme("colors.kapedokoPrimary.500") 210px,
    theme("colors.kapedokoGray.50") 210px,
    theme("colors.kapedokoGray.50") 100%
  );
}
</style>
