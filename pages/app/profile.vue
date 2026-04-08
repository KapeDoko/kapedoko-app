<template>
  <ion-page>
    <ion-content>
      <div class="h-full flex flex-col relative">
        <div class="h-[220px] bg-kapedokoPrimary-500 relative">
          <img
            src="/assets/logo/KapeDoko-Light.svg"
            alt="KapeDoko logo background"
            class="size-[250px] absolute -top-3 -right-10 opacity-10"
          />
          <div class="absolute inset-0 z-10 flex flex-col gap-5">
            <ion-toolbar class="opacity-0"></ion-toolbar>
            <div class="px-5 flex items-center justify-between text-white">
              <div class="flex items-center gap-2">
                <div class="h-6">
                  <UIcon
                    name="i-lucide-arrow-left"
                    class="w-6 h-6"
                    @click="router.back()"
                  />
                </div>
                <div class="flex flex-col leading-none">
                  <span class="text-xs tracking-[0.25em] uppercase opacity-80"
                    >Account</span
                  >
                  <span class="font-batangas text-2xl">Profile</span>
                </div>
              </div>
              <UIcon name="i-lucide-circle-user-round" class="w-7 h-7" />
            </div>
          </div>
        </div>

        <div class="px-5 -mt-10 z-20 flex-1 pb-5">
          <div class="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-5">
            <div class="flex items-center justify-between gap-3">
              <div>
                <span class="text-xs text-black/40 uppercase tracking-[0.2em]"
                  >Signed in as</span
                >
                <p class="font-semibold mt-1 break-all">
                  {{ authStore.user?.email || "No email available" }}
                </p>
              </div>
              <div class="rounded-full bg-kapedokoPrimary-50 p-3">
                <UIcon
                  name="i-lucide-coffee"
                  class="w-5 h-5 text-kapedokoPrimary-500"
                />
              </div>
            </div>

            <UButton
              block
              class="h-12 font-semibold"
              color="red"
              variant="solid"
              :loading="isSigningOut"
              :disabled="isSigningOut"
              @click="handleSignOut"
            >
              <span class="flex items-center gap-2 justify-center w-full">
                <UIcon name="i-lucide-log-out" class="w-5 h-5" />
                <span>Log out</span>
              </span>
            </UButton>
          </div>
        </div>

        <ion-footer class="sticky bottom-0 w-full bg-white backdrop-blur-sm">
          <NavigationBar />
        </ion-footer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
const router = useRouter();
const authStore = useAuthStore();
const isSigningOut = ref(false);

const handleSignOut = async () => {
  if (isSigningOut.value) return;

  try {
    isSigningOut.value = true;
    await authStore.signOut();
    await router.replace("/login");
  } catch (error) {
    console.error("Failed to sign out:", error);
  } finally {
    isSigningOut.value = false;
  }
};

</script>

<style>

</style>