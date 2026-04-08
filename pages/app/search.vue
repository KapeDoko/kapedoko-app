<template>
  <ion-page>
    <ion-content>
      <div class="h-[190px] bg-kapedokoPrimary-500 relative">
        <div class="h-full flex flex-col gap-5 absolute inset-0 z-10">
          <ion-toolbar class="opacity-0"></ion-toolbar>
          <div class="px-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="h-6">
                <UIcon name="i-lucide-arrow-left" class="w-6 h-6 text-white" @click="router.go(-1)" />
              </div>
              <div class="h-8">
                <span class="text-white text-xl font-bold">Search shops</span>
              </div>
            </div>
          </div>
          <SearchBar class="px-5" v-model="SEARCH_RESULTS" v-model:loading="isSearching" />
        </div>
        <img :src="searchHeroLogo" class="size-[250px] absolute -top-3 -right-10 opacity-5" />
      </div>
      <div class="flex flex-col gap-4 py-5 px-5">
        <div v-if="isSearching" class="flex flex-col gap-4">
          <div v-for="index in 4" :key="index"
            class="flex w-full overflow-hidden bg-white rounded-lg shadow animate-pulse">
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

        <div v-else-if="SEARCH_RESULTS?.length" class="flex flex-col gap-4">
          <div v-for="cafe in SEARCH_RESULTS" :key="cafe.cafeName">
            <CoffeeShopBlock :cafe="cafe" />
          </div>
        </div>

        <div class="text-black/25 flex justify-center items-center flex-col px-5 py-5 w-full"
          v-else-if="SEARCH_RESULTS && !SEARCH_RESULTS.length">
          <UIcon name="i-lucide-coffee" class="size-6" />
          <span class="text-sm">No matches found</span>
        </div>
        <div class="text-black/25 flex justify-center items-center flex-col px-5 py-5 w-full" v-else>
          <UIcon name="i-lucide-coffee" class="size-6" />
          <span class="text-sm">Start typing to find a coffee shop</span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { type Cafe } from "@/types/cafe";
import searchHeroLogo from "@/assets/logo/KapeDoko-Light.svg";
const router = useRouter();

const SEARCH_RESULTS = ref<Cafe[] | null>(null);
const isSearching = ref(false);
</script>

<style></style>
