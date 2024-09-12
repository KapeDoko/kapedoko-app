<template>
  <ion-page>
    <ion-content>
      <div class="kapedoko-page">
        <div class="h-[240px] bg-kapedokoPrimary-500 relative">
          <LogoKapedokoLight
            class="size-[250px] absolute -top-3 -right-10 opacity-5"
          />
        </div>
        <div class="flex flex-col gap-5 absolute top-0 z-10 w-full">
          <ion-toolbar class="opacity-0"></ion-toolbar>
          <div class="px-5 flex items-center justify-between">
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
          <SearchBar class="px-5" @click="router.push('/search')" />
          <AdCarouselSmall class="px-5" />
        </div>

        <div class="pt-16 pb-5 px-5 relative">
          <CoffeeShopListWithSort />
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <NavigationBar />
    </ion-footer>
  </ion-page>
</template>

<script lang="ts" setup>
const router = useRouter();
</script>

<style></style>
