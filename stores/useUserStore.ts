import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isOnboardingFinished: false as boolean,
  }),
  getters: {},
  actions: {
    finishOnboarding() {
      this.isOnboardingFinished = true;
    },
  },
});
