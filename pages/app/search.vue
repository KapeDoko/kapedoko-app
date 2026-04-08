<template>
  <ion-page>
    <ion-content class="search-content" :fullscreen="true">
      <div class="min-h-full flex flex-col relative pb-20">
        <div class="h-[245px] bg-kapedokoPrimary-500 relative">
          <div class="h-full flex flex-col gap-4 absolute inset-0 z-30">
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
                <UIcon name="i-lucide-search" class="w-5 h-5" />
              </div>
            </div>

            <div class="px-5 mt-3 text-white">
              <span class="text-[11px] tracking-[0.28em] uppercase opacity-75">Explore</span>
              <h1 class="font-batangas text-[1.9rem] leading-none mt-1">Search Shops</h1>
              <div class="mt-3">
                <SearchBar class="pointer-events-auto" v-model="SEARCH_RESULTS" v-model:loading="isSearching" />
              </div>
            </div>
          </div>
          <img :src="searchHeroLogo" class="size-[250px] absolute -top-3 -right-10 opacity-10" />
        </div>

        <div class="flex-1 px-5 mt-8 pb-5 relative z-20">
          <div class="bg-white rounded-3xl shadow-[0_12px_40px_rgba(55,45,37,0.15)] p-4 sm:p-5 border border-kapedokoSecondary-200/70 min-h-[100px]">
            <div v-if="isSearching" class="flex flex-col gap-3">
              <div v-for="index in 4" :key="index"
                class="flex w-full overflow-hidden bg-kapedokoSecondary-50 rounded-2xl border border-kapedokoSecondary-200/70 animate-pulse">
                <div class="max-w-[90px] w-full bg-black/5" />
                <div class="flex flex-col flex-grow gap-3 p-4">
                  <div class="flex items-center justify-between gap-2">
                    <div class="h-3 w-20 rounded-full bg-black/10" />
                    <div class="h-3 w-14 rounded-full bg-black/10" />
                  </div>
                  <div class="h-4 w-3/4 rounded-full bg-black/10" />
                  <div class="h-3 w-11/12 rounded-full bg-black/10" />
                  <div class="flex gap-1 pt-1">
                    <div class="h-4 w-4 rounded-full bg-black/10" />
                    <div class="h-4 w-4 rounded-full bg-black/10" />
                    <div class="h-3 w-24 rounded-full bg-black/10" />
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="SEARCH_RESULTS?.length" class="flex flex-col gap-3">
              <div v-for="(cafe, index) in SEARCH_RESULTS" :key="cafe.cafeName ?? index">
                <CoffeeShopBlock :cafe="cafe" />
              </div>
            </div>

            <div class="text-kapedokoGray-500/80 flex justify-center items-center flex-col px-5 py-12 w-full"
              v-else-if="SEARCH_RESULTS && !SEARCH_RESULTS.length">
              <UIcon name="i-lucide-coffee" class="size-6" />
              <span class="text-sm mt-1">No matches found</span>
            </div>
            <div class="text-kapedokoGray-500/80 flex justify-center items-center flex-col px-5 py-12 w-full" v-else>
              <UIcon name="i-lucide-coffee" class="size-6" />
              <span class="text-sm mt-1">Start typing to find a coffee shop</span>
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
import { type Cafe } from "@/types/cafe";
import searchHeroLogo from "@/assets/logo/KapeDoko-Light.svg";
const router = useRouter();

const SEARCH_RESULTS = ref<Cafe[] | null>(null);
const isSearching = ref(false);
</script>

<style scoped>
.search-content {
  --background: linear-gradient(
    to bottom,
    theme("colors.kapedokoPrimary.500") 0%,
    theme("colors.kapedokoPrimary.500") 210px,
    theme("colors.kapedokoGray.50") 210px,
    theme("colors.kapedokoGray.50") 100%
  );
}
</style>
