<template>
  <ion-page>
    <ion-content>
      <div
        class="transition-all"
        :class="onboardingCarousel?.page !== 3 ? '' : 'bg-kapedokoPrimary-500'"
      >
        <div>
          <ion-toolbar class="opacity-0"></ion-toolbar>
          <LogoKapedokoDark
            class="h-14 w-full transition-all"
            :class="onboardingCarousel?.page !== 3 ? '' : 'opacity-0'"
          />
        </div>
        <UCarousel
          ref="onboardingCarousel"
          v-slot="{ item, index }"
          :items="ONBOARDING_CAROUSEL"
          :ui="{
            item: 'basis-full',
          }"
          class="rounded-lg overflow-hidden"
        >
          <OnboardingPanelThree class="absolute px-5" v-if="index == 2" />

          <div
            class="relative h-[calc(100vh-100px)] w-full flex transition-all"
            v-if="index != 2"
          >
            <OnboardingPanelOne
              v-if="index == 0"
              class="absolute z-30 transition-all"
              :class="onboardingCarousel?.page !== 1 ? 'opacity-0' : ''"
              id="onboardingPanelOne"
            />
            <OnboardingPanelTwo
              v-if="index == 1"
              class="absolute -z-0"
              :class="onboardingCarousel?.page !== 2 ? 'opacity-0' : ''"
            />
          </div>
          <div class="z-30 absolute bottom-0 w-full">
            <div
              class="flex flex-col items-center relative text-center px-5 gap-10 transition-all"
              :class="!isFinished ? '' : 'opacity-0'"
            >
              <div class="flex flex-col gap-4">
                <div class="flex justify-center" v-if="item.icons">
                  <div v-for="icon in item.icons">
                    <UIcon :name="icon" class="w-9 h-9 text-primary-500" />
                  </div>
                </div>
                <span class="font-bold">{{ item.description }}</span>
              </div>
            </div>
            <ion-toolbar class="opacity-0"></ion-toolbar>
          </div>
        </UCarousel>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
const onboardingCarousel = ref<{ page: number; pages: number } | null>(null);
const isFinished = ref(false);

// Add opacity-0 to the onboardingCarousel once the current
const ONBOARDING_CAROUSEL = ref([
  {
    title: "WiFi and power outlets",
    description:
      "Check if the coffee shop offers WiFi and power outlets by looking for the WiFi and power plug icons.",
    icons: ["i-lucide-wifi", "i-lucide-plug"],
  },
  {
    title: "Find coffee shops",
    description: "Use our maps to find the exact location of coffee shops.",
    icons: ["i-lucide-map-pin", "i-lucide-map"],
  },
  {
    title: "You're all set!",
    description: "",
    icons: [],
  },
]);

watch(
  () => onboardingCarousel.value?.page,
  (value) => {
    if (value === 3) {
      isFinished.value = true;
    } else {
      isFinished.value = false;
    }
  }
);
</script>

<style></style>
