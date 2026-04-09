<template>
  <div class="h-[100px] flex items-center">
    <div class="flex max-w-[300px] w-full m-auto justify-between">
      <NuxtLink
        v-for="icon in icons"
        :key="icon.name"
        :to="icon.link"
        custom
        v-slot="{ isActive, navigate }"
      >
        <div
          class="flex flex-col gap-1 transition-all cursor-pointer"
          @click="navigate"
        >
          <!-- Icon container -->
          <div
            class="p-1 rounded flex items-center transition-all"
            :class="isActive
              ? 'bg-kapedokoPrimary-500 shadow-sm'
              : ''"
          >
            <UIcon
              :name="icon.name"
              class="w-6 h-6 transition-all"
              :class="isActive
                ? 'text-white'
                : 'text-kapedokoPrimary-500/35'"
            />
          </div>

          <!-- Active indicator -->
          <div
            class="h-2 w-full rounded-full transition-all"
            :class="isActive
              ? 'bg-kapedokoPrimary-500'
              : 'bg-transparent'"
          ></div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const icons = [
  { name: 'i-lucide-home', link: '/app' },
  { name: 'i-lucide-heart', link: '/app/favorites' },
  { name: 'i-lucide-map', link: '/app/map' },
  { name: 'i-lucide-circle-user-round', link: '/app/profile' },
];
</script>

<style scoped></style>