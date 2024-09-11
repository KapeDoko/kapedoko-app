<template>
  <div class="font-satoshi">
    <ion-app>
      <ion-router-outlet />
    </ion-app>
  </div>
</template>

<script lang="ts" setup>
import { StatusBar } from "@capacitor/status-bar";

// Display content under transparent status bar (Android only)
StatusBar.setOverlaysWebView({ overlay: true });
</script>
