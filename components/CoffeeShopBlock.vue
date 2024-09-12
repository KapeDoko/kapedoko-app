<template>
  <div class="flex w-full bg-white rounded-lg shadow">
    <div class="max-w-[90px]">
      <img
        :src="cafe.cafeImage"
        class="h-full w-full object-cover rounded-l-lg"
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
          <span class="text-xs">({{ cafe.cafeRating }})</span>
        </div>
        <span
          class="text-xs text-kapedokoGreen-500 font-bold"
          v-if="cafe.isOpen"
          >Open</span
        >
        <span class="text-xs text-kapedokoRed-500 font-bold text-right" v-else
          >Closed, opens at {{ cafe.openingTime }}</span
        >
      </div>
      <span class="font-bold text-foreground">{{ cafe.cafeName }}</span>
      <span class="text-sm line-clamp-1">{{ cafe.cafeAddress }}</span>
      <div class="flex gap-1 pt-1">
        <UIcon
          name="i-lucide-wifi"
          class="text-foreground"
          v-if="cafe.cafeWifi"
        ></UIcon>
        <UIcon
          name="i-lucide-plug"
          class="text-foreground"
          v-if="cafe.cafePlugs"
        ></UIcon>
        <span
          class="text-foreground text-xs"
          v-if="!cafe.cafeWifi && !cafe.cafePlugs"
          >No WiFi and Plugs</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type CoffeeShop = {
  cafeName: string;
  cafeImage: string;
  cafeRating: number;
  cafeDistance: number;
  cafeWifi: boolean;
  cafePlugs: boolean;
  isOpen: boolean;
  openingTime: string;
  cafeAddress: string;
  cafeCoordinates: { lng: number; lat: number };
};

const props = defineProps<{
  cafe: CoffeeShop;
}>();

const cafe = props.cafe;

const fullStars = (rating: number) => {
  return Math.floor(rating);
};

const hasHalfStar = () => {
  return cafe.cafeRating % 1 !== 0;
};
</script>

<style></style>
