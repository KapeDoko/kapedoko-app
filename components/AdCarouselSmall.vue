<template>
  <UCarousel
    ref="kapedokoAdCarousel"
    v-slot="{ item }"
    :items="CAFE_AD_BLOCK"
    :ui="{
      item: 'basis-full',
      indicators: {
        wrapper: 'relative bottom-2 mt-4 mb-2 gap-1',
        base: 'h-2 w-2 rounded-full',
        active: 'bg-primary-500 dark:bg-primary-500',
        inactive: 'bg-black/20 dark:bg-black/20',
      },
    }"
    class="rounded-lg overflow-hidden"
    indicators
  >
    <div class="bg-white h-[100px] w-full rounded-lg flex items-center shadow">
      <span class="text-primary-500 p-5 text-lg"
        ><span class="font-bold">{{ item.title }}</span></span
      >
      <div class="w-[50vw] h-full">
        <img
          :src="item.image"
          class="h-full w-full object-cover rounded-r-lg"
        />
      </div>
    </div>
  </UCarousel>
</template>

<script lang="ts" setup>
const kapedokoAdCarousel = ref();

onMounted(() => {
  setInterval(() => {
    if (!kapedokoAdCarousel.value) return;

    if (kapedokoAdCarousel.value.page === kapedokoAdCarousel.value.pages) {
      return kapedokoAdCarousel.value.select(0);
    }

    kapedokoAdCarousel.value.next();
  }, 3000);
});

const CAFE_AD_BLOCK = [
  {
    id: 1,
    title: "Visit Krooks Coffee House",
    image: "https://picsum.photos/200",
  },
  {
    id: 2,
    title: "Visit Bubbalab Cafe",
    image: "https://picsum.photos/200",
  },
  {
    id: 3,
    title: "Visit Bakehouse Manila",
    image: "https://picsum.photos/200",
  },
];
</script>

<style></style>
