<template>
  <ion-page>
    <ion-content>
      <div class="kapedoko-page">
        <div class="h-[240px] bg-kapedokoPrimary-500 relative">
          <div
            class="h-full flex flex-col justify-center gap-5 absolute inset-0 px-5 top-14 z-10"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="h-8">
                  <LogoKapedokoLight class="h-full w-full object-cover" />
                </div>
                <div class="h-8">
                  <LogoVerticalKapedokoTextLight
                    class="h-full w-full object-cover"
                  />
                </div>
              </div>
              <UIcon
                name="i-lucide-circle-user-round"
                class="w-6 h-6 text-white"
              />
            </div>
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
            <div
              class="bg-white h-[100px] w-full rounded-lg flex items-center p-5 shadow"
            >
              <span class="font-bold text-primary-500"
                >Visit Bubbalab Cafe</span
              >
            </div>
          </div>
          <LogoKapedokoLight
            class="size-[250px] absolute -top-3 -right-10 opacity-5"
          />
        </div>
        <!-- <StickyHeader /> -->
        <div class="pt-16 pb-5 px-5 flex flex-col gap-4">
          <div v-for="i in 5">
            <CoffeeShopBlock />
          </div>
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <NavigationBar />
    </ion-footer>
  </ion-page>
</template>

<script lang="ts" setup>
</script>

<style></style>
