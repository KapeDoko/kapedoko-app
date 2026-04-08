<template>
  <div class="h-[100px] items-center flex">
    <div class="flex max-w-[300px] w-full m-auto justify-between">
      <div
        v-for="icon in icons"
        :key="icon.name"
        class="flex flex-col gap-1 transition-all"
        @click="navigateTo(icon.link)"
      >
        <div
          class="p-1 rounded flex items-center transition-all"
          :class="isActive(icon.link) ? 'bg-kapedokoPrimary-500 shadow-sm' : ''"
        >
          <UIcon
            :name="icon.name"
            class="w-6 h-6 transition-all"
            :class="isActive(icon.link) ? 'text-white' : 'text-kapedokoPrimary-500/35'"
          />
        </div>
        <div
          class="h-2 w-full rounded-full transition-all"
          :class="isActive(icon.link) ? 'bg-kapedokoPrimary-500' : 'bg-transparent'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();

const icons = [
  { name: 'i-lucide-home', link: '/app' },
  { name: 'i-lucide-heart', link: '/app/favorites' },
  { name: 'i-lucide-map', link: '/app/map' },
  { name: 'i-lucide-circle-user-round', link: '/app/profile' },
];

const normalizePath = (path: string) => {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
};

const activeLink = computed(() => {
  const currentPath = normalizePath(route.path);
  const normalizedLinks = icons.map((icon) => normalizePath(icon.link));

  const exactMatch = normalizedLinks.find((link) => link === currentPath);
  if (exactMatch) {
    return exactMatch;
  }

  // Prefer the most specific parent match for nested routes.
  const parentMatches = normalizedLinks
    .filter((link) => currentPath.startsWith(`${link}/`))
    .sort((a, b) => b.length - a.length);

  if (parentMatches.length > 0) {
    return parentMatches[0];
  }

  // Keep at least one active tab for app routes.
  if (currentPath.startsWith('/app')) {
    return '/app';
  }

  return null;
});

const isActive = (link: string) => {
  return activeLink.value === normalizePath(link);
};

const navigateTo = (link: string) => {
  if (isActive(link)) {
    return;
  }

  router.push(link);
};
</script>

<style></style>
