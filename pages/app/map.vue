<template>
  <ion-page>
    <ion-content v-if="isLocationEnabled" class="map-content" :fullscreen="true">
      <div class="h-full relative">
        <!-- MapBox Header -->
        <div v-if="isLoaded"
          class="h-[200px] w-full absolute top-0 z-30 bg-gradient-to-b from-kapedokoPrimary-500/85 via-kapedokoPrimary-500/45 to-transparent flex flex-col gap-5">
          <ion-toolbar class="opacity-0"></ion-toolbar>
          <div class="px-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button
                class="size-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center"
                aria-label="Go back"
                @click="router.back()"
              >
                <UIcon name="i-lucide-arrow-left" class="w-5 h-5 text-white" />
              </button>
              <div class="h-6">
                <LogoKapedokoDark class="h-full w-full object-cover" />
              </div>
              <div class="h-6">
                <LogoHorizontalKapedokoTextDark class="h-full w-full object-cover" />
              </div>
            </div>
            <span class="text-white font-bold text-xs tracking-[0.22em]">MAPS</span>
          </div>
          <div class="px-5">
            <UInput size="xl" color="gray" :ui="{
              icon: { trailing: { pointer: '' } },
              color: {
                gray: {
                  outline:
                    'dark:bg-white/500 dark:text-black focus:ring-0 ring-0 text-sm h-12 rounded-xl',
                },
              },
            }" :trailing="false" placeholder="Search a coffee shop" class="flex-grow search-bar shadow-lg">
              <template #trailing>
                <UIcon name="i-lucide-x" class="text-gray-500" @click="() => { }" />
              </template>
            </UInput>
          </div>
        </div>

        <!-- MapBox Container -->
        <div ref="MAPBOX_CONTAINER_REF" id="sessionMap" class="w-full h-full overflow-hidden z-10 rounded-lg"></div>

        <!-- Show cafes near me Button -->
        <div class="absolute z-30 inset-x-0 px-5 transition-all delay-1000"
          :class="SHOW_CAFES_BUTTON ? 'bottom-10' : '-bottom-20'">
          <UButton block class="h-12 font-bold shadow-lg rounded-xl" :ui="{
            color: {
              gray: {
                solid:
                  'dark:bg-primary-500 dark:text-white focus:ring-0 ring-0 text-sm h-12 dark:hover:bg-white/200',
              },
            },
          }" color="gray" variant="solid" @click="openShowCafesNearMeModal" id="open-cafes-near-me-modal"><span
              class="flex items-center gap-2">
              <UIcon name="i-lucide-coffee" class="w-5 h-5 text-white"></UIcon>Show cafes near me
            </span></UButton>
        </div>
      </div>

      <!-- MapBox Cafes Near Me Modal -->
      <ion-modal v-if="isLoaded" ref="CAFES_NEAR_ME_REF" :is-open="true" trigger="open-cafes-near-me-modal"
        :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 1]" :backdrop-dismiss="true" :backdrop-breakpoint="0.5">
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
import type { Cafe } from "@/types/cafe";

type Coordinates = {
  lng: number;
  lat: number;
};

// MapBox variables
const MAPBOX_STYLE = "mapbox://styles/mapbox/standard";
const INITIAL_COORDINATES = ref(<LngLatLike>[0, 0]);
const MAPBOX_CONTAINER_REF = ref<HTMLElement | null>(null);
const map = ref();
let cafeMarkers: mapboxgl.Marker[] = [];
const activeCafeMarkerElement = ref<HTMLElement | null>(null);
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

// Register observer during setup to avoid lifecycle hook warnings.
useResizeObserver(MAPBOX_CONTAINER_REF, () => {
  map.value?.resize();
});

onUnmounted(() => {
  clearCafeMarkers();
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
  const result = await getInitialLocation();
  if (!result.success) {
    console.error(result.error);
    loader.value?.dismiss();
    isLocationEnabled.value = false;
    return;
  }
  INITIAL_COORDINATES.value = result.data as LngLatLike;
};

const createMapInstance = () => {
  if (MAPBOX_CONTAINER_REF.value) {
    map.value = new mapboxgl.Map({
      container: MAPBOX_CONTAINER_REF.value,
      center: INITIAL_COORDINATES.value, // starting position [lng, lat]
      zoom: 17, // starting zoom
      style: MAPBOX_STYLE, // style URL
    });
  }
};

const getInitialLocation = async () => {
  try {
    const position = await Geolocation.getCurrentPosition();
    return { success: true, data: [position.coords.longitude, position.coords.latitude] };
  } catch (error) {
    return { success: false, error };
  }
};

const showLoading = async () => {
  loader.value = await loadingController.create({
    message: "Loading map...",
  });
  await loader.value.present();
};

const openShowCafesNearMeModal = async () => {
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

const fitMapToCafes = (cafes: Cafe[]) => {
  if (!map.value) {
    return;
  }

  if (!cafes.length) {
    flyToLocation();
    return;
  }

  const bounds = new mapboxgl.LngLatBounds();
  const [userLng, userLat] = INITIAL_COORDINATES.value as [number, number];

  if (Number.isFinite(userLng) && Number.isFinite(userLat)) {
    bounds.extend([userLng, userLat]);
  }

  cafes.forEach((cafe) => {
    bounds.extend([cafe.cafeCoordinates.lng, cafe.cafeCoordinates.lat]);
  });

  const applyFit = () => {
    map.value?.fitBounds(bounds, {
      padding: {
        top: 220,
        right: 56,
        bottom: 220,
        left: 56,
      },
      maxZoom: 16,
      duration: 900,
      essential: true,
    });
  };

  if (map.value.loaded()) {
    applyFit();
    return;
  }

  map.value.once("load", applyFit);
};

const clearCafeMarkers = () => {
  cafeMarkers.forEach((marker) => marker.remove());
  cafeMarkers = [];
  activeCafeMarkerElement.value = null;
};

const setActiveCafeMarker = (markerElement: HTMLElement | null) => {
  if (activeCafeMarkerElement.value && activeCafeMarkerElement.value !== markerElement) {
    activeCafeMarkerElement.value.classList.remove("is-active");
  }

  activeCafeMarkerElement.value = markerElement;

  if (markerElement) {
    markerElement.classList.add("is-active");
  }
};

const createCafeMarkerElement = (name?: string, index = 0) => {
  const markerElement = document.createElement("button");
  markerElement.type = "button";
  markerElement.className = "cafe-marker";
  markerElement.setAttribute("aria-label", name ? `View ${name}` : "View cafe");
  markerElement.style.setProperty("--marker-delay", `${Math.min(index * 35, 280)}ms`);

  const halo = document.createElement("span");
  halo.className = "cafe-marker-halo";

  const shell = document.createElement("span");
  shell.className = "cafe-marker-shell";

  const core = document.createElement("span");
  core.className = "cafe-marker-core";

  const icon = document.createElement("span");
  icon.className = "cafe-marker-icon";
  icon.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 10h8v5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 11h2.2a1.8 1.8 0 0 1 0 3.6H15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 6.7c0 .8-.5 1.1-.9 1.6-.3.4-.5.8-.5 1.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 6.3c0 .8-.5 1.1-.9 1.6-.3.4-.5.8-.5 1.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

  core.appendChild(icon);
  shell.appendChild(halo);
  shell.appendChild(core);
  markerElement.appendChild(shell);

  return markerElement;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getCafeStatus = (cafe: Cafe) => {
  if (cafe.isOpen === true) {
    return { label: "Open now", className: "is-open" };
  }

  if (cafe.isOpen === false) {
    return {
      label: cafe.openingTime ? `Closed • Opens ${cafe.openingTime}` : "Closed now",
      className: "is-closed",
    };
  }

  return { label: "Hours unavailable", className: "is-unknown" };
};

const createCafePopupHtml = (cafe: Cafe) => {
  const safeName = escapeHtml(cafe.cafeName ?? "Unnamed cafe");
  const safeAddress = escapeHtml(cafe.cafeAddress ?? "Address unavailable");
  const status = getCafeStatus(cafe);
  const ratingLabel = typeof cafe.cafeRating === "number" ? cafe.cafeRating.toFixed(1) : "N/A";
  const distanceLabel = typeof cafe.cafeDistance === "number" ? `${Math.round(cafe.cafeDistance)} m away` : "Distance unavailable";

  return `
    <article class="cafe-popup-card" role="dialog" aria-label="Cafe details">
      <div class="cafe-popup-head">
        <span class="cafe-popup-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false"><path d="M7 10h8v5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 11h2.2a1.8 1.8 0 0 1 0 3.6H15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 6.7c0 .8-.5 1.1-.9 1.6-.3.4-.5.8-.5 1.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 6.3c0 .8-.5 1.1-.9 1.6-.3.4-.5.8-.5 1.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        </span>
        <h4 class="cafe-popup-title">${safeName}</h4>
      </div>

      <div class="cafe-popup-meta">
        <span class="cafe-popup-pill ${status.className}">${status.label}</span>
        <span class="cafe-popup-pill is-rating">★ ${ratingLabel}</span>
        <span class="cafe-popup-pill is-distance">${distanceLabel}</span>
      </div>

      <p class="cafe-popup-address">${safeAddress}</p>
    </article>
  `;
};

const addCafeMarkersInMap = (cafes: Cafe[]) => {
  if (!map.value) {
    return;
  }

  clearCafeMarkers();

  cafes.forEach((cafe, index) => {
    const markerElement = createCafeMarkerElement(cafe.cafeName ?? undefined, index);

    const popup = new mapboxgl.Popup({
      offset: 20,
      closeButton: true,
      maxWidth: "300px",
      className: "cafe-map-popup",
    }).setHTML(createCafePopupHtml(cafe));

    const marker = new mapboxgl.Marker({ element: markerElement, anchor: "bottom" })
      .setLngLat([cafe.cafeCoordinates.lng, cafe.cafeCoordinates.lat])
      .setPopup(popup)
      .addTo(map.value!);

    markerElement.addEventListener("click", () => {
      setActiveCafeMarker(markerElement);
      marker.togglePopup();
    });

    popup.on("close", () => {
      if (activeCafeMarkerElement.value === markerElement) {
        markerElement.classList.remove("is-active");
        activeCafeMarkerElement.value = null;
      }
    });

    cafeMarkers.push(marker);
  });

  fitMapToCafes(cafes);
};



const cafeStore = useCafeStore();
onMounted(async () => {
  const locationResult = await getInitialLocation();
  if (locationResult.success && locationResult.data) {
    await cafeStore.fetchNearbyCafes(locationResult.data[1], locationResult.data[0]);
    addCafeMarkersInMap(cafeStore.nearbyCafes);
  } else {
    console.error("Failed to get user location:", locationResult.error);
  }
});
</script>

<style>
.map-content {
  --background: theme("colors.kapedokoGray.50");
}

.cafe-marker {
  --marker-delay: 0ms;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 0;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
  animation: marker-fade-in 240ms ease both;
  animation-delay: var(--marker-delay);
}

.cafe-marker-shell {
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  place-items: center;
}

.cafe-marker-halo {
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  background: rgb(111 78 55 / 0.35);
  opacity: 0;
  transform: scale(0.8);
}

.cafe-marker-core {
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  border: 2px solid #fff;
  box-shadow: 0 10px 25px rgb(17 24 39 / 0.22);
  background: radial-gradient(circle at 30% 30%, #a47551 0%, #6f4e37 50%, #4a3223 100%);
  display: grid;
  place-items: center;
  color: #fff;
  transition: transform 180ms ease, box-shadow 180ms ease;
  animation: marker-core-enter 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--marker-delay);
}

.cafe-marker-icon {
  width: 13px;
  height: 13px;
  display: inline-flex;
}

.cafe-marker-icon svg {
  width: 100%;
  height: 100%;
}

.cafe-marker:hover .cafe-marker-core {
  transform: scale(1.08);
  box-shadow: 0 14px 28px rgb(17 24 39 / 0.28);
}

.cafe-marker.is-active .cafe-marker-core {
  animation: marker-click-pop 520ms cubic-bezier(0.2, 0.85, 0.35, 1.25);
  box-shadow: 0 16px 32px rgb(17 24 39 / 0.32);
}

.cafe-marker.is-active .cafe-marker-halo {
  animation: marker-ripple 700ms ease-out;
}

@keyframes marker-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes marker-core-enter {
  0% {
    transform: translateY(14px) scale(0.82);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

@keyframes marker-click-pop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1.06);
  }
}

@keyframes marker-ripple {
  0% {
    opacity: 0.65;
    transform: scale(0.7);
  }
  100% {
    opacity: 0;
    transform: scale(1.9);
  }
}

.mapboxgl-popup.cafe-map-popup .mapboxgl-popup-content {
  border-radius: 16px;
  border: 1px solid rgb(111 78 55 / 0.2);
  box-shadow: 0 18px 36px rgb(29 23 18 / 0.24);
  padding: 0;
  overflow: hidden;
  background: linear-gradient(155deg, #fffefc 0%, #f8f3ed 100%);
  animation: popup-float-in 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.mapboxgl-popup.cafe-map-popup .mapboxgl-popup-tip {
  border-top-color: #f8f3ed;
}

.mapboxgl-popup.cafe-map-popup .mapboxgl-popup-close-button {
  color: #5a3d2a;
  font-size: 18px;
  line-height: 1;
  margin-right: 2px;
  margin-top: 2px;
  border-radius: 9999px;
  width: 24px;
  height: 24px;
}

.mapboxgl-popup.cafe-map-popup .mapboxgl-popup-close-button:hover {
  background: rgb(111 78 55 / 0.12);
}

.cafe-popup-card {
  width: min(260px, 72vw);
  padding: 13px 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cafe-popup-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 18px;
}

.cafe-popup-icon {
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(145deg, #9a6b49 0%, #6f4e37 60%, #563a27 100%);
  box-shadow: 0 8px 16px rgb(77 54 38 / 0.25);
}

.cafe-popup-icon svg {
  width: 14px;
  height: 14px;
}

.cafe-popup-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.25;
  color: #2f1f14;
}

.cafe-popup-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cafe-popup-pill {
  font-size: 11px;
  font-weight: 600;
  border-radius: 9999px;
  padding: 4px 9px;
  line-height: 1.15;
}

.cafe-popup-pill.is-open {
  color: #0f766e;
  background: rgb(20 184 166 / 0.16);
}

.cafe-popup-pill.is-closed {
  color: #9f1239;
  background: rgb(244 63 94 / 0.15);
}

.cafe-popup-pill.is-unknown {
  color: #57534e;
  background: rgb(120 113 108 / 0.14);
}

.cafe-popup-pill.is-rating {
  color: #854d0e;
  background: rgb(251 191 36 / 0.2);
}

.cafe-popup-pill.is-distance {
  color: #5b3f2e;
  background: rgb(111 78 55 / 0.13);
}

.cafe-popup-address {
  margin: 0;
  font-size: 12px;
  line-height: 1.35;
  color: #6b4a35;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

@keyframes popup-float-in {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
