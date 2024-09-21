<template>
  <div class="flex gap-2 w-full">
    <UInput
      icon="i-lucide-coffee"
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
      class="flex-grow search-bar"
      v-model="searchQuery"
      :loading="isLoading"
    >
      <template #trailing v-if="searchQuery">
        <UIcon
          name="i-lucide-x"
          class="text-gray-500"
          @click="
            () => {
              clearSearch();
            }
          "
        /> </template
    ></UInput>
    <UButton
      icon="i-lucide-search"
      size="xl"
      :ui="{
        color: {
          gray: {
            solid:
              'dark:bg-white/500 dark:text-primary-500 focus:ring-0 ring-0 text-sm h-12 dark:hover:bg-white/200',
          },
        },
      }"
      class="w-[60px]"
      block
      color="gray"
      square
      variant="solid"
      @click="search"
    />
  </div>
</template>

<script lang="ts" setup>
import { type Cafe } from "@/types/cafe";

const searchQuery = ref<string>("");
const searchResults = ref<Cafe[] | null>(null);
const isLoading = ref(false);

const props = defineProps({
  modelValue: {
    type: Array as () => Cafe[] | null,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const search = () => {
  if (searchQuery.value) {
    isLoading.value = true;
    /* const data = searchCafe; */

    searchResults.value = CAFE_DATA.value as Cafe[];

    // Emit searchResults to the Parent Component
    isLoading.value = false;
  } else {
    searchResults.value = null;
  }
  emit("update:modelValue", searchResults.value);
};

const clearSearch = () => {
  searchQuery.value = "";
  searchResults.value = null;
  emit("update:modelValue", searchResults.value);
};

watch(
  () => searchQuery.value,
  (newValue) => {
    if (newValue) {
      search();
    } else {
      searchResults.value = null;
      emit("update:modelValue", searchResults.value);
    }
  }
);

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
]);
</script>

<style></style>
