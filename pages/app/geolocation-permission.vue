<template>
  <ion-page>
    <ion-content class="permission-content" :fullscreen="true">
      <div class="min-h-full flex flex-col relative pb-20">
        <div class="h-[250px] bg-kapedokoPrimary-500 relative overflow-hidden">
          <img
            :src="logoBg"
            alt="KapeDoko logo background"
            class="size-[290px] absolute -top-10 -right-14 opacity-10"
          />

          <div class="absolute inset-0 z-10 flex flex-col">
            <ion-toolbar class="opacity-0"></ion-toolbar>
            <div class="px-5 pt-3 flex items-start justify-between text-white">
              <button
                class="size-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center"
                aria-label="Go back"
                @click="router.replace('/app')"
              >
                <UIcon name="i-lucide-arrow-left" class="w-5 h-5" />
              </button>
              <div class="size-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                <UIcon name="i-lucide-map-pin" class="w-5 h-5" />
              </div>
            </div>

            <div class="px-5 mt-6 text-white">
              <span class="text-[11px] tracking-[0.28em] uppercase opacity-75">Location Access</span>
              <h1 class="font-batangas text-[2rem] leading-none mt-1">Enable Geolocation</h1>
              <p class="text-sm opacity-80 mt-2 max-w-[320px]">
                We use your location to find nearby coffee shops and improve map accuracy.
              </p>
            </div>
          </div>
        </div>

        <div class="px-5 mt-5 z-20 flex-1">
          <div class="bg-white rounded-3xl shadow-[0_12px_40px_rgba(55,45,37,0.15)] p-5 border border-kapedokoSecondary-200/70 flex flex-col gap-5">
            <div class="rounded-2xl border px-4 py-3" :class="statusClass">
              <p class="text-[11px] uppercase tracking-[0.2em] text-kapedokoGray-500">Permission status</p>
              <p class="mt-1 text-sm font-semibold text-kapedokoPrimary-700">{{ statusLabel }}</p>
            </div>

            <p class="text-sm text-kapedokoGray-700 leading-relaxed">
              If you deny access, map features will stay disabled until permission is granted from system settings.
            </p>

            <p class="text-xs text-kapedokoGray-500 leading-relaxed bg-kapedokoSecondary-50 border border-kapedokoSecondary-200 rounded-xl px-3 py-2">
              {{ settingsInstructions }}
            </p>

            <p v-if="errorMessage" class="text-sm text-kapedokoRed-700 bg-kapedokoRed-50 border border-kapedokoRed-100 rounded-xl px-3 py-2">
              {{ errorMessage }}
            </p>

            <div class="flex flex-col gap-3">
              <UButton
                block
                class="h-12 font-semibold rounded-xl"
                color="gray"
                variant="solid"
                :loading="isRequesting"
                :disabled="isRequesting"
                @click="requestPermission"
              >
                <span class="flex items-center gap-2 justify-center w-full">
                  <UIcon name="i-lucide-navigation" class="w-5 h-5" />
                  <span>Enable Location Access</span>
                </span>
              </UButton>

              <UButton
                block
                class="h-11 font-semibold rounded-xl"
                color="gray"
                variant="soft"
                :disabled="isRequesting"
                @click="openDeviceSettings"
              >
                Permission Help
              </UButton>

              <UButton
                block
                class="h-11 font-medium rounded-xl"
                color="gray"
                variant="ghost"
                :disabled="isChecking || isRequesting"
                @click="checkAndContinue"
              >
                I already enabled it
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import logoBg from "~/assets/logo/KapeDoko-Light.svg";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";

const router = useRouter();
const platform = Capacitor.getPlatform();
const isChecking = ref(true);
const isRequesting = ref(false);
const permissionStatus = ref<string>("prompt");
const errorMessage = ref("");

const isGranted = computed(() => permissionStatus.value === "granted");

const settingsInstructions = computed(() => {
  if (platform === "android") {
    return "Android: Settings > Apps > KapeDoko > Permissions > Location > Allow while using the app.";
  }

  if (platform === "ios") {
    return "iOS: Settings > Privacy & Security > Location Services > KapeDoko > While Using the App.";
  }

  return "Enable location permissions in your browser or system settings, then return to the app.";
});

const statusLabel = computed(() => {
  if (permissionStatus.value === "granted") return "Location permission granted";
  if (permissionStatus.value === "denied") return "Location access denied";
  if (permissionStatus.value === "prompt-with-rationale") return "Permission needs your approval";
  return "Permission not granted yet";
});

const statusClass = computed(() => {
  if (isGranted.value) {
    return "bg-kapedokoGreen-50 border-kapedokoGreen-100";
  }

  if (permissionStatus.value === "denied") {
    return "bg-kapedokoRed-50 border-kapedokoRed-100";
  }

  return "bg-kapedokoSecondary-50 border-kapedokoSecondary-200";
});

const getPermissionStatus = async () => {
  if (Capacitor.getPlatform() === "web") {
    permissionStatus.value = "granted";
    return true;
  }

  const result = await Geolocation.checkPermissions();
  permissionStatus.value = result.location;
  return result.location === "granted";
};

const checkAndContinue = async () => {
  isChecking.value = true;
  errorMessage.value = "";

  try {
    const granted = await getPermissionStatus();
    if (granted) {
      await router.replace("/app/map");
    }
  } catch (error) {
    errorMessage.value = "Unable to check location permission right now.";
    console.error("Failed to check geolocation permission:", error);
  } finally {
    isChecking.value = false;
  }
};

const requestPermission = async () => {
  isRequesting.value = true;
  errorMessage.value = "";

  try {
    const result = await Geolocation.requestPermissions();
    permissionStatus.value = result.location;

    if (result.location === "granted") {
      await router.replace("/app/map");
      return;
    }

    errorMessage.value = `Location permission was not granted. ${settingsInstructions.value}`;
  } catch (error) {
    errorMessage.value = "Permission request failed. Please try again.";
    console.error("Failed to request geolocation permission:", error);
  } finally {
    isRequesting.value = false;
  }
};

const openDeviceSettings = async () => {
  try {
    if (Capacitor.getPlatform() === "web") {
      return;
    }

    const result = await Geolocation.requestPermissions();
    permissionStatus.value = result.location;

    if (result.location === "granted") {
      await router.replace("/app/map");
      return;
    }

    errorMessage.value = settingsInstructions.value;
  } catch (error) {
    errorMessage.value = "Unable to update permission right now. Please try again.";
    console.error("Failed to retry geolocation permission:", error);
  }
};

onMounted(async () => {
  await checkAndContinue();
});
</script>

<style scoped>
.permission-content {
  --background: linear-gradient(
    to bottom,
    theme("colors.kapedokoPrimary.500") 0%,
    theme("colors.kapedokoPrimary.500") 210px,
    theme("colors.kapedokoGray.50") 210px,
    theme("colors.kapedokoGray.50") 100%
  );
}
</style>