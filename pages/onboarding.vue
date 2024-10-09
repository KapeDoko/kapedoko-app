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
            indicators: {
              wrapper: ' gap-1 bottom-28 z-30',
              base: 'h-2 w-2 rounded-full',
              active: 'bg-primary-500 dark:bg-primary-500',
              inactive: 'bg-black/20 dark:bg-black/20',
            },
          }"
          class="rounded-lg overflow-hidden"
          :indicators="!isFinished"
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
          <div
            class="z-30 absolute bottom-0 w-full bg-white/50 pt-5 backdrop-blur-sm"
            :class="!isFinished ? '' : 'opacity-0 hidden'"
          >
            <div
              class="flex flex-col items-center relative text-center px-5 gap-10 transition-all"
            >
              <div class="flex flex-col gap-4">
                <div class="flex justify-center" v-if="item.icons">
                  <div v-for="icon in item.icons">
                    <UIcon :name="icon" class="w-9 h-9 text-primary-500" />
                  </div>
                </div>
                <span class="font-bold">{{ item.description }}</span>
              </div>
              <UButton
                label="Next"
                block
                class="h-12 font-bold"
                :ui="{
                  color: {
                    gray: {
                      solid:
                        'dark:bg-primary-500 dark:text-white focus:ring-0 ring-0 text-sm h-12 dark:hover:bg-white/200',
                    },
                  },
                }"
                v-if="index != 2"
                color="gray"
                variant="solid"
                @click="onboardingCarousel?.next()"
              ></UButton>
            </div>
            <ion-toolbar class="opacity-0"></ion-toolbar>
          </div>
        </UCarousel>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
const onboardingCarousel = ref<{
  page: number;
  pages: number;
  next(): void;
} | null>(null);
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
