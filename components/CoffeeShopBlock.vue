<template>
  <div class="flex w-full bg-white rounded-lg shadow">
    <div class="relative max-w-[90px] min-h-full overflow-hidden rounded-l-lg bg-black/5">
      <div
        v-if="!isImageLoaded"
        class="absolute inset-0 animate-pulse bg-gradient-to-r from-black/10 via-black/5 to-black/10"
      />
      <img
        :src="cafe.cafeImage ?? 'https://picsum.photos/200'"
        class="h-full w-full object-cover rounded-l-lg transition-opacity duration-300"
        :class="isImageLoaded ? 'opacity-100' : 'opacity-0'"
        @load="isImageLoaded = true"
        @error="isImageLoaded = true"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col p-4 flex-grow">
      <div class="flex justify-between items-center gap-2">
        <div class="flex items-center">
          <UIcon
            v-for="star in fullStars(cafe.cafeRating)"
            :key="star"
            name="i-lucide-star"
            class="w-3 h-3 text-foreground"
          ></UIcon>
          <UIcon
            v-if="hasHalfStar()"
            name="i-lucide-star-half"
            class="w-3 h-3 text-foreground"
          ></UIcon>
          <span class="text-xs">({{ cafe.cafeRating ?? 'N/A' }})</span>
        </div>
        <span
          class="text-xs text-kapedokoGreen-500 font-bold"
          v-if="cafe.isOpen === true"
          >Open</span
        >
        <span class="text-xs text-kapedokoRed-500 font-bold text-right" v-else-if="cafe.isOpen === false"
          >Closed, opens at {{ cafe.openingTime ?? 'N/A' }}</span
        >
        <span class="text-xs text-gray-500 font-bold text-right" v-else
          >Hours unavailable</span
        >
      </div>
      <span class="font-bold text-foreground">{{ cafe.cafeName ?? 'Unnamed cafe' }}</span>
      <span class="text-sm line-clamp-1">{{ cafe.cafeAddress ?? 'Address unavailable' }}</span>
      <div class="flex gap-1 pt-1">
        <UIcon
          name="i-lucide-wifi"
          class="text-foreground"
          v-if="cafe.cafeWifi === true"
        ></UIcon>
        <UIcon
          name="i-lucide-plug"
          class="text-foreground"
          v-if="cafe.cafePlugs === true"
        ></UIcon>
        <span
          class="text-foreground text-xs"
          v-if="cafe.cafeWifi !== true && cafe.cafePlugs !== true"
          >Amenities unavailable</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Cafe } from "@/types/cafe";

const props = defineProps<{
  cafe: Cafe;
}>();

const cafe = props.cafe;
const isImageLoaded = ref(false);

const fullStars = (rating: number | null) => {
  if (typeof rating !== "number") {
    return 0;
  }

  return Math.floor(rating);
};

const hasHalfStar = () => {
  return typeof cafe.cafeRating === "number" && cafe.cafeRating % 1 !== 0;
};
</script>

<style></style>
