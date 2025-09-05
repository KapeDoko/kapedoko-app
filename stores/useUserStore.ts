import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isOnboardingFinished: true as boolean,
  }),
  getters: {},
  actions: {
    finishOnboarding() {
      this.isOnboardingFinished = true;
    },
  },
});
