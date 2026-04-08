<template>
  <ion-app>
    <ClientOnly>
      <ion-router-outlet />
    </ClientOnly>
  </ion-app>
</template>

<script lang="ts" setup>
import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import { HandlePermission } from "./utils/geolocation";
import { Geolocation } from "@capacitor/geolocation";
import { useAuthStore } from "./stores/useAuthStore";

const authStore = useAuthStore()

onMounted(() => {
  authStore.init()
})

const isGeolocationPermission = ref();
const router = useRouter();
const platform = Capacitor.getPlatform();

if (platform === "android") {
  StatusBar.setOverlaysWebView({ overlay: true });
}

onMounted(async () => {
  if (platform === "web") {
    return;
  } else {
    isGeolocationPermission.value = await HandlePermission();

    if (!isGeolocationPermission.value) {
      router.push("/geolocation-permission");
    } else {
      await Geolocation.getCurrentPosition();
    }
  }
});
</script>

<style>
* {
  font-family: "Satoshi", sans-serif;
}
</style>
