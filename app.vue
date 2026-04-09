<template>
  <ion-app>
    <ClientOnly>
      <ion-router-outlet />
    </ClientOnly>
  </ion-app>
</template>

<script lang="ts" setup>
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { StatusBar } from "@capacitor/status-bar";
import { CheckPermission } from "./utils/geolocation";
import { useAuthStore } from "./stores/useAuthStore";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  void authStore.init();
});

const platform = Capacitor.getPlatform();

if (platform === "android") {
  StatusBar.setOverlaysWebView({ overlay: true });
}

watch(
  [() => authStore.user, () => route.path],
  async ([user, currentPath]) => {
    if (platform === "web") {
      return;
    }

    if (!user || !currentPath.startsWith("/app")) {
      return;
    }

    if (currentPath === "/app/geolocation-permission") {
      return;
    }

    const hasGeolocationPermission = await CheckPermission();
    if (!hasGeolocationPermission) {
      router.replace("/app/geolocation-permission");
    }
  },
  { immediate: true }
);

onMounted(() => {
  App.addListener("appStateChange", async ({ isActive }) => {
    if (!isActive || platform === "web" || !authStore.user) {
      return;
    }

    const hasGeolocationPermission = await CheckPermission();
    if (!hasGeolocationPermission) {
      if (route.path !== "/app/geolocation-permission") {
        await router.replace("/app/geolocation-permission");
      }

      return;
    }

    if (route.path === "/app/geolocation-permission") {
      await router.replace("/app/map");
    }
  });
});
</script>

<style>
* {
  font-family: "Satoshi", sans-serif;
}
</style>
