<template>
  <ion-content class="ion-padding">
    <div class="h-full">
      <div
        class="flex flex-col w-full items-center justify-center h-[calc(100vh-100px)]"
      >
        <div class="flex flex-col items-start gap-2 px-5">
          <img src="/assets/logo/KapeDoko-Dark.svg" class="size-12" />
          <span class="text-primary-500 font-bold text-2xl"
            >Choose your location</span
          >
          <span class="text-foreground"
            >To skip this step from now on, allow location access for your
            Kapedoko services</span
          >
          <div class="flex gap-2 w-full">
            <UInput
              size="xl"
              color="gray"
              disabled
              :ui="{
                icon: { trailing: { pointer: '' } },
                color: {
                  gray: {
                    outline:
                      'dark:bg-white border-2 border-primary-500 dark:text-black focus:ring-0 ring-0 text-sm h-12',
                  },
                },
              }"
              :trailing="false"
              v-model="SAVED_LOCATION_ADDRESS"
              v-if="SAVED_LOCATION_ADDRESS"
              class="flex-grow search-bar font-bold pointer-events-none"
            >
            </UInput>

            <UButton
              :label="SAVED_LOCATION_ADDRESS ? 'Change' : 'Set Location'"
              class="h-12"
              v-if="SAVED_LOCATION_ADDRESS"
              :ui="{
                color: {
                  gray: {
                    solid:
                      'dark:bg-primary-500 dark:text-white focus:ring-0 ring-0 text-sm h-12 dark:hover:bg-white/200',
                  },
                },
              }"
              color="gray"
              variant="solid"
            ></UButton>
          </div>
        </div>

        <div class="z-30 absolute bottom-0 w-full px-5">
          <UButton
            :label="
              SAVED_LOCATION_ADDRESS
                ? 'Use This Location'
                : 'Enable Location Access'
            "
            block
            class="h-12 font-bold"
            :ui="{
              color: {
                gray: {
                  solid:
                    'dark:bg-primary-500 dark:text-white focus:ring-0 ring-0 text-sm h-12 dark:hover:bg-white/200',
                },
              },
            }"
            color="gray"
            variant="solid"
          ></UButton>
          <ion-toolbar class="opacity-0"></ion-toolbar>
        </div>
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
const SAVED_LOCATION_ADDRESS = ref<string>("29 Exequiel Street, Concepcion Uno");

onMounted(() => {});
</script>

<style></style>
