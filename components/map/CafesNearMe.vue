<template>
  <ion-content>
    <div class="px-5 pt-8">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-coffee"
          class="w-6 h-6 text-kapeDoKoPrimary-500"
        />
        <span class="text-lg text-primary-600 font-bold">Cafes near me</span>
      </div>
      <p class="text-xs text-gray-500 mt-1">{{ rawResults.length }} results</p>

      <div class="flex flex-col gap-4 py-5">
        <div v-for="(cafe, index) in cafes" :key="`${cafe.cafeCoordinates.lat}-${cafe.cafeCoordinates.lng}-${index}`">
          <CoffeeShopBlock :cafe="cafe" />
        </div>
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
const cafeStore = useCafeStore();
const cafes = computed(() => cafeStore.nearbyCafes);
const rawResults = computed(() => cafeStore.nearbyCafesRaw);
</script>

<style></style>
