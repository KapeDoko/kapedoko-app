<template>
  <div class="h-[100px] items-center flex">
    <div class="flex max-w-[300px] w-full m-auto justify-between">
      <div
        v-for="(icon, index) in icons"
        :key="icon.name"
        class="flex flex-col gap-1 transition-all"
        @click="toggleSelection(index)"
      >
        <div
          class="p-1 rounded flex items-center transition-all"
          :class="icon.isSelected ? 'bg-primary-500' : ''"
        >
          <UIcon
            :name="icon.name"
            class="w-6 h-6 text-primary-500/20 transition-all"
            :class="icon.isSelected ? 'bg-white' : ''"
          />
        </div>
        <div
          class="h-2 w-full rounded-full transition-all"
          :class="icon.isSelected ? 'bg-primary-500' : ''"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();

const icons = ref([
  { name: 'i-lucide-home', isSelected: true, link: '/'},
  { name: 'i-lucide-heart', isSelected: false, link: '/favorites'},
  { name: 'i-lucide-map', isSelected: false, link: '/map'},
  { name: 'i-lucide-circle-user-round', isSelected: false, link: '/profile'},
]);

const toggleSelection = (selectedIndex: number) => {
  icons.value.forEach((icon, index) => {
    icon.isSelected = index === selectedIndex;
    if(icon.isSelected) {
      useRouter().push(icon.link);
    }
  });
};

// Watch current route and update selected icon
watch(() => router.currentRoute.value.path, (path) => {
  icons.value.forEach((icon) => {
    icon.isSelected = icon.link === path;
  });
});
</script>

<style></style>
