<template>
  <div class="flex gap-2 w-full">
    <UInput
      icon="i-lucide-coffee"
      size="xl"
      color="gray"
      :ui="{
        icon: { trailing: { pointer: '' } },
        color: {
          gray: {
            outline:
              'dark:bg-white/500 dark:text-black focus:ring-0 ring-0 text-sm h-12',
          },
        },
      }"
      :trailing="false"
      placeholder="Search a coffee shop"
      class="flex-grow"
    />
    <UButton
      icon="i-lucide-search"
      size="xl"
      :ui="{
        color: {
          gray: {
            solid:
              'dark:bg-white/500 dark:text-primary-500 focus:ring-0 ring-0 text-sm h-12 dark:hover:bg-white/200',
          },
        },
      }"
      class="w-[60px]"
      block
      color="gray"
      square
      variant="solid"
    />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
