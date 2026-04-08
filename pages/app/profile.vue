<template>
  <ion-page>
    <ion-content class="profile-content" :fullscreen="true">
      <div class="min-h-full flex flex-col relative pb-6">
        <div class="h-[265px] bg-kapedokoPrimary-500 relative overflow-hidden">
          <img
            :src="logoBg"
            alt="KapeDoko logo background"
            class="size-[290px] absolute -top-12 -right-16 opacity-10"
          />
          <div class="absolute -bottom-16 -left-16 size-56 rounded-full bg-kapedokoSecondary-500/20 blur-2xl"></div>
          <div class="absolute inset-0 z-10 flex flex-col">
            <ion-toolbar class="opacity-0"></ion-toolbar>
            <div class="px-5 pt-2 flex items-start justify-between text-white">
              <button
                class="size-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Go back"
                @click="router.back()"
              >
                <UIcon name="i-lucide-arrow-left" class="w-5 h-5" />
              </button>
              <div class="size-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                <UIcon name="i-lucide-circle-user-round" class="w-5 h-5" />
              </div>
            </div>

            <div class="px-5 mt-5 text-white">
              <span class="text-[11px] tracking-[0.28em] uppercase opacity-75">Account Center</span>
              <h1 class="font-batangas text-[2rem] leading-none mt-1">Profile</h1>
              <p class="text-sm opacity-80 mt-2">Manage your account and sign out securely.</p>
            </div>
          </div>
        </div>

        <div class="px-5 -mt-14 z-20 flex-1">
          <div class="bg-white rounded-3xl shadow-[0_12px_40px_rgba(55,45,37,0.15)] p-5 border border-kapedokoSecondary-200/70 flex flex-col gap-6">
            <div class="flex items-center justify-between gap-3">
              <div>
                <span class="text-[11px] text-kapedokoGray-500 uppercase tracking-[0.24em]">Signed in as</span>
                <p class="font-semibold text-kapedokoPrimary-700 mt-1 break-all">
                  {{ authStore.user?.email || "No email available" }}
                </p>
                <p class="text-xs text-kapedokoGray-500 mt-2">{{ profileSubtitle }}</p>
              </div>
              <div class="rounded-2xl bg-kapedokoPrimary-50 p-3.5 border border-kapedokoPrimary-100">
                <UIcon
                  name="i-lucide-coffee"
                  class="w-6 h-6 text-kapedokoPrimary-500"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-2xl bg-kapedokoSecondary-50 border border-kapedokoSecondary-200 px-3 py-3">
                <p class="text-[11px] uppercase tracking-[0.2em] text-kapedokoGray-500">Status</p>
                <p class="mt-1 text-sm font-semibold text-kapedokoPrimary-700">Active</p>
              </div>
              <div class="rounded-2xl bg-kapedokoGreen-50 border border-kapedokoGreen-100 px-3 py-3">
                <p class="text-[11px] uppercase tracking-[0.2em] text-kapedokoGray-500">Session</p>
                <p class="mt-1 text-sm font-semibold text-kapedokoPrimary-700">Secure</p>
              </div>
            </div>

            <UButton
              block
              class="h-12 font-semibold rounded-xl"
              color="red"
              variant="solid"
              :loading="isSigningOut"
              :disabled="isSigningOut"
              @click="handleSignOut"
            >
              <span class="flex items-center gap-2 justify-center w-full">
                <UIcon name="i-lucide-log-out" class="w-5 h-5" />
                <span>{{ isSigningOut ? "Signing out..." : "Log out" }}</span>
              </span>
            </UButton>

            <p class="text-xs text-kapedokoGray-500 text-center leading-relaxed">
              Logging out removes your local session from this device.
            </p>
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
import logoBg from "~/assets/logo/KapeDoko-Light.svg";

const router = useRouter();
const authStore = useAuthStore();
const isSigningOut = ref(false);

const profileSubtitle = computed(() => {
  const email = authStore.user?.email;
  if (!email) return "Your account information is currently unavailable.";

  const firstPart = email.split("@")[0] || "User";
  return `Welcome back, ${firstPart}.`;
});

const handleSignOut = async () => {
  if (isSigningOut.value) return;

  try {
    isSigningOut.value = true;
    await authStore.signOut();
    await router.replace("/");
  } catch (error) {
    console.error("Failed to sign out:", error);
  } finally {
    isSigningOut.value = false;
  }
};

</script>

<style scoped>
.profile-content {
  --background: linear-gradient(
    to bottom,
    theme("colors.kapedokoPrimary.500") 0%,
    theme("colors.kapedokoPrimary.500") 220px,
    theme("colors.kapedokoGray.50") 220px,
    theme("colors.kapedokoGray.50") 100%
  );
}
</style>