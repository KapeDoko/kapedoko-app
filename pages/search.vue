<template>
  <ion-page>
    <ion-content>
      <div class="h-[190px] bg-kapedokoPrimary-500 relative">
        <div class="h-full flex flex-col gap-5 absolute inset-0 z-10">
          <ion-toolbar class="opacity-0"></ion-toolbar>
          <div class="px-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="h-6">
                <UIcon
                  name="i-lucide-arrow-left"
                  class="w-6 h-6 text-white"
                  @click="router.go(-1)"
                />
              </div>
              <div class="h-8">
                <span class="text-white text-xl font-bold">Search shops</span>
              </div>
            </div>
          </div>
          <SearchBar class="px-5" v-model="SEARCH_RESULTS" />
        </div>
        <img
          src="/assets/logo/KapeDoko-Light.svg"
          class="size-[250px] absolute -top-3 -right-10 opacity-5"
        />
      </div>
      <div class="flex flex-col gap-4 py-5 px-5">
        <div v-for="cafe in SEARCH_RESULTS">
          <CoffeeShopBlock :cafe="cafe" />
        </div>

        <div
          class="text-black/25 flex justify-center items-center flex-col px-5 py-5 w-full"
          v-if="!SEARCH_RESULTS"
        >
          <UIcon name="i-lucide-coffee" class="size-6" />
          <span class="text-sm">No coffee beans left</span>
        </div>
        <div
          class="text-black/25 flex justify-center items-center flex-col px-5 py-5 w-full"
          v-else
        >
          <UIcon name="i-lucide-coffee" class="size-6" />
          <span class="text-sm">Bottoms up?</span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { type Cafe } from "@/types/cafe";
const router = useRouter();

const SEARCH_RESULTS = ref<Cafe[] | null>(null);
</script>

<style></style>
