<template>
  <UButton
    label="Leave a review"
    class="h-12"
    :ui="{
      color: {
        gray: {
          solid: 'dark:bg-white dark:text-primary-500 font-bold text-lg',
        },
      },
    }"
    color="gray"
    block
    variant="solid"
  ></UButton>

  <div class="flex flex-col gap-5">
    <span class="font-bold text-lg">Reviews by our KapéBeans</span>

    <div class="space-y-3 divide-gray-200 divide divide-y-2">
      <div class="text-sm flex flex-col gap-2 pt-3">
        <div class="flex item-center gap-2 text-sm">
          <span class="font-bold">Janelle R.</span>
          <div class="bg-primary-500 text-white p-1 rounded">
            <div class="flex items-center gap-2 text-xs">
              <span>+1</span>
              <UIcon name="i-lucide-wifi" class="w-4 h-4 transition-all" />
            </div>
          </div>
          <div class="bg-primary-500 text-white p-1 rounded">
            <div class="flex items-center gap-2 text-xs">
              <span>+1</span>
              <UIcon name="i-lucide-plug" class="w-4 h-4 transition-all" />
            </div>
          </div>
        </div>
        <span
          >"The perfect app for coffee lovers!" I love how KapéDoko brings
          people together. The community vibe is unmatched, and I've met so many
          fellow coffee enthusiasts. The features are intuitive, and the
          interface is sleek. It feels like I'm hanging out with friends over a
          cup of coffee. Highly recommend!</span
        >
      </div>
      <div class="text-sm flex flex-col gap-2 pt-3">
        <div class="flex item-center gap-2 text-sm">
          <span class="font-bold">Janelle R.</span>
          <div class="bg-primary-500 text-white p-1 rounded">
            <div class="flex items-center gap-2 text-xs">
              <span>+1</span>
              <UIcon name="i-lucide-wifi" class="w-4 h-4 transition-all" />
            </div>
          </div>
          <div class="bg-primary-500 text-white p-1 rounded">
            <div class="flex items-center gap-2 text-xs">
              <span>+1</span>
              <UIcon name="i-lucide-plug" class="w-4 h-4 transition-all" />
            </div>
          </div>
        </div>
        <span
          >"The perfect app for coffee lovers!" I love how KapéDoko brings
          people together. The community vibe is unmatched, and I've met so many
          fellow coffee enthusiasts. The features are intuitive, and the
          interface is sleek. It feels like I'm hanging out with friends over a
          cup of coffee. Highly recommend!</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
