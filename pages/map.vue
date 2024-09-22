<template>
  <ion-page>
    <ion-content v-if="isLocationEnabled">
      <div class="h-full relative">
        <!-- MapBox Header -->
        <div
          v-if="isLoaded"
          class="h-[190px] w-full absolute top-0 z-30 bg-gradient-to-b from-white to-white/0 flex flex-col gap-5"
        >
          <ion-toolbar class="opacity-0"></ion-toolbar>
          <div class="px-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="h-6">
                <UIcon
                  name="i-lucide-arrow-left"
                  class="w-6 h-6 text-kapeDoKoPrimary-500"
                  @click="router.back()"
                />
              </div>
              <div class="h-6">
                <LogoKapedokoDark class="h-full w-full object-cover" />
              </div>
              <div class="h-6">
                <LogoHorizontalKapedokoTextDark
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
            <span class="text-kapedokoPrimary-500 font-bold text-sm">MAPS</span>
          </div>
          <div class="px-5">
            <UInput
              size="xl"
              color="gray"
              :ui="{
                icon: { trailing: { pointer: '' } },
                color: {
                  gray: {
                    outline:
                      'dark:bg-white/500 dark:text-black focus:ring-0 ring-0 text-sm h-12',
                  },
                },
              }"
              :trailing="false"
              placeholder="Search a coffee shop"
              class="flex-grow search-bar shadow-lg"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-x"
                  class="text-gray-500"
                  @click="() => {}"
                /> </template
            ></UInput>
          </div>
        </div>

        <!-- MapBox Container -->
        <div
          ref="MAPBOX_CONTAINER_REF"
          id="sessionMap"
          class="w-full h-full overflow-hidden z-10 rounded-lg"
        ></div>

        <!-- Show cafes near me Button -->
        <div
          class="absolute z-30 inset-x-0 px-5 transition-all delay-1000"
          :class="SHOW_CAFES_BUTTON ? 'bottom-10' : '-bottom-20'"
        >
          <UButton
            block
            class="h-12 font-bold shadow-lg"
            :ui="{
              color: {
                gray: {
                  solid:
                    'dark:bg-primary-500 dark:text-white focus:ring-0 ring-0 text-sm h-12 dark:hover:bg-white/200',
                },
              },
            }"
            color="gray"
            variant="solid"
            @click="openShowCafesNearMeModal"
            id="open-cafes-near-me-modal"
            ><span class="flex items-center gap-2">
              <UIcon name="i-lucide-coffee" class="w-5 h-5 text-white"></UIcon
              >Show cafes near me</span
            ></UButton
          >
        </div>
      </div>

      <!-- MapBox Cafes Near Me Modal -->
      <ion-modal
        v-if="isLoaded"
        ref="CAFES_NEAR_ME_REF"
        :is-open="true"
        trigger="open-cafes-near-me-modal"
        :initial-breakpoint="0.25"
        :breakpoints="[0, 0.25, 0.5, 1]"
        :backdrop-dismiss="true"
        :backdrop-breakpoint="0.5"
      >
        <MapCafesNearMe />
      </ion-modal>
    </ion-content>
    <MapLocationNotEnabled v-else />
  </ion-page>
</template>

<script lang="ts" setup>
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { type LngLatLike } from "mapbox-gl";
import { useResizeObserver } from "@vueuse/core";
import { Geolocation } from "@capacitor/geolocation";
import { loadingController } from "@ionic/vue";
import MapCafesNearMe from "@/components/map/CafesNearMe.vue";

type Coordinates = {
  lng: number;
  lat: number;
};

// MapBox variables
const MAPBOX_STYLE = "mapbox://styles/mapbox/standard";
const INITIAL_COORDINATES = ref(<LngLatLike>[0, 0]);
const MAPBOX_CONTAINER_REF = ref<HTMLElement | null>(null);
const map = ref();
mapboxgl.accessToken =
  "pk.eyJ1IjoiY3l5eS1jeXl5MzAiLCJhIjoiY20xYnN3amY4MHE0aTJqb295N3ZtbjkwbSJ9.y7Pa7j8EQNkU7Y-WCjR4Lg";

// Map Page variables
const SHOW_CAFES_BUTTON = ref(false);
const CAFES_NEAR_ME_REF = ref<HTMLElement | null>(null);
const isLoaded = ref(false);
const loader = ref();
const router = useRouter();

// Geolocation variables
const isLocationEnabled = ref(true);

onUnmounted(() => {
  map.value?.remove();
  modalController.dismiss();
});

onMounted(async () => {
  showLoading();
  await initializeMapLocation();
  createMapInstance();
  openShowCafesNearMeModal();

  // Check if map is fully loaded
  map.value?.on("load", () => {
    isLoaded.value = true;
    loader.value?.dismiss();
  });

  map.value?.on("dragstart", () => {
    modalController.dismiss();
  });

  SHOW_CAFES_BUTTON.value = true;
});

const initializeMapLocation = async () => {
  INITIAL_COORDINATES.value = (await getInitialLocation()) as LngLatLike;
  if (INITIAL_COORDINATES.value.code) {
    console.error(INITIAL_COORDINATES.value.message);
    loader.value?.dismiss();
    isLocationEnabled.value = false;
    return;
  }
};

const createMapInstance = async () => {
  if (MAPBOX_CONTAINER_REF.value) {
    map.value = new mapboxgl.Map({
      container: MAPBOX_CONTAINER_REF.value,
      center: INITIAL_COORDINATES.value, // starting position [lng, lat]
      zoom: 17, // starting zoom
      style: MAPBOX_STYLE, // style URL
    });
  }

  useResizeObserver(MAPBOX_CONTAINER_REF, () => {
    map.value?.resize();
  });
};

const getInitialLocation = async () => {
  try {
    const position = await Geolocation.getCurrentPosition();
    return [position.coords.longitude, position.coords.latitude];
  } catch (error) {
    return error;
  }
};

const showLoading = async () => {
  loader.value = await loadingController.create({
    message: "Loading map...",
  });
  await loader.value.present();
};

const openShowCafesNearMeModal = async () => {
  // Cafes near the user's location must be fetched here
  const coords = {
    lng: (INITIAL_COORDINATES.value as [number, number])[0],
    lat: (INITIAL_COORDINATES.value as [number, number])[1],
  } as Coordinates;
  addGeolocatePingInMap(coords);
};

const addGeolocatePingInMap = (coords: Coordinates) => {
  // Check if the user's location is already marked
  const existingMarker = document.querySelector(".geolocate-ping");
  if (existingMarker) {
    existingMarker.remove();
  }

  const baseCircle = document.createElement("div");
  baseCircle.className =
    "w-4 h-4 rounded-full bg-blue-500 relative flex items-center justify-center geolocate-ping";
  const innerCircle = document.createElement("div");
  innerCircle.className =
    "w-16 h-16 rounded-full bg-blue-500 animate-ping opacity-50 absolute";
  baseCircle.appendChild(innerCircle);

  new mapboxgl.Marker(baseCircle)
    .setLngLat([coords.lng, coords.lat])
    .addTo(map.value!);

  flyToLocation();
};

const flyToLocation = () => {
  map.value?.flyTo({
    center: INITIAL_COORDINATES.value,
    essential: true,
  });
};
</script>

<style></style>
