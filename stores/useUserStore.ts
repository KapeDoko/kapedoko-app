import { defineStore } from "pinia";

const ONBOARDING_STORAGE_KEY = "kapedoko:onboarding-finished";

export const useUserStore = defineStore("user", {
  state: () => ({
    isOnboardingFinished: false as boolean,
    isOnboardingHydrated: false as boolean,
  }),
  getters: {},
  actions: {
    hydrateOnboardingStatus() {
      if (this.isOnboardingHydrated) return;

      if (process.client) {
        this.isOnboardingFinished =
          localStorage.getItem(ONBOARDING_STORAGE_KEY) === "true";
      }

      this.isOnboardingHydrated = true;
    },

    finishOnboarding() {
      this.isOnboardingFinished = true;

      if (process.client) {
        localStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
      }
    },
  },
});
