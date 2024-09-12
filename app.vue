<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts" setup>
import { StatusBar } from "@capacitor/status-bar";

// Display content under transparent status bar (Android only)
StatusBar.setOverlaysWebView({ overlay: true });
</script>

<style>
*{
  font-family: 'Satoshi', sans-serif;
}
</style>