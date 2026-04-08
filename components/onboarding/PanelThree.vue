<template>
  <div
    class="flex flex-col w-full items-center justify-center h-[calc(100vh-100px)]"
  >
    <div class="flex flex-col items-center -mt-32">
      <img src="/assets/logo/KapeDoko-Light.svg" class="size-32" />
      <LogoVerticalKapedokoTextLight class="size-48" />
      <span class="text-white font-bold text-xl mt-20">You're all set!</span>
    </div>

    <div class="z-30 absolute bottom-0 w-full px-5">
      <UButton
        label="Let's go!"
        block
        class="h-12 font-bold"
        :ui="{
          color: {
            gray: {
              solid:
                'dark:bg-white dark:text-primary-500 focus:ring-0 ring-0 text-sm h-12 dark:hover:bg-white/200',
            },
          },
        }"
        color="gray"
        variant="solid"
        @click="finishedOnboarding"
      ></UButton>
      <ion-toolbar class="opacity-0"></ion-toolbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const userStore = useUserStore();

const finishedOnboarding = () => {
  console.log("Finished onboarding");
  userStore.isOnboardingFinished = true;
  router.push("/app");
};
</script>

<style></style>
