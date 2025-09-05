<template>
  <div>
    <div class="flex justify-between gap-5">
      <span class="font-bold text-xl">Bubbalab Cafe - Lamp Quarters</span>
      <UButton
        class="font-bold shadow h-8"
        :ui="{
          color: {
            gray: {
              solid:
                'dark:bg-primary-500 dark:text-white focus:ring-0 ring-0 text-xs dark:hover:bg-white/200',
            },
          },
        }"
        color="gray"
        variant="solid"
        id="open-cafes-near-me-modal"
        ><span class="flex items-center gap-2">
          <UIcon name="i-lucide-coffee" class="w-5 h-5 text-white"></UIcon
          >Navigate to this cafe</span
        ></UButton
      >
    </div>
    <div class="flex flex-col gap-1 py-2">
      <div class="flex gap-1 pt-1">
        <UIcon name="i-lucide-wifi" class="text-foreground"></UIcon>
        <UIcon name="i-lucide-plug" class="text-foreground"></UIcon>
        <!-- <span
          class="text-foreground text-xs"
          >No WiFi and Plugs</span
        > -->
      </div>
      <span class="text-sm"
        >Gil Fernando Ave Centro de Buenviaje, Sto. Nino, Marikina, 1800 Metro
        Manila</span
      >
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold">4.8</span>
        <div class="flex">
          <UIcon name="i-lucide-star" class="w-3 h-3 text-foreground"></UIcon>
          <UIcon name="i-lucide-star" class="w-3 h-3 text-foreground"></UIcon>
          <UIcon name="i-lucide-star" class="w-3 h-3 text-foreground"></UIcon>
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="flex gap-3 items-center">
        <span
          class="text-xs text-white px-3 py-2 rounded bg-kapedokoGreen-500 font-bold"
          >Open</span
        >
        <span class="text-xs font-bold text-foreground-500/50"
          >Opens till 10pm</span
        >
      </div>

      <UButton
        class="font-bold shadow h-8"
        :ui="{
          color: {
            gray: {
              solid:
                'dark:bg-foreground-500/20 dark:text-foreground focus:ring-0 ring-0 text-xs dark:hover:bg-white/200',
            },
          },
        }"
        color="gray"
        variant="solid"
        id="open-cafes-near-me-modal"
        ><span class="flex items-center gap-2">
          <UIcon name="i-lucide-phone" class="w-5 h-5 text-foreground"></UIcon
          >Call this cafe</span
        ></UButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
