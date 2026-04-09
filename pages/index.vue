<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="h-[100dvh] bg-kapedokoPrimary-50 flex flex-col overflow-hidden">
        <div class="bg-kapedokoPrimary-500">
          <div class="h-[250px] pt-5 relative overflow-hidden shrink-0">
            <img src="/assets/logo/KapeDoko-Light.svg" alt="Kapedoko"
              class="size-[260px] absolute -top-4 -right-10 opacity-10" />
            <div class="relative z-10 px-6 pt-12 text-white flex flex-col gap-2.5">
              <div class="h-8 w-[120px]">
                <LogoHorizontalKapedokoTextLight class="h-full w-full" />
              </div>
              <div class="flex flex-col leading-tight">
                <span class="text-xs uppercase tracking-[0.2em] opacity-80">Welcome back</span>
                <h1 class="font-batangas text-[2.1rem]">Brew and Begin</h1>
              </div>
              <p class="text-sm text-white/80 max-w-[270px] leading-snug">
                Sign in to save your favorite coffee spots and continue exploring nearby cafes.
              </p>
            </div>
          </div>
        </div>

        <div class="px-5 pt-5 pb-8 flex flex-1">
          <UCard class="w-full rounded-2xl" :ui="{
            ring: 'ring-0',
            shadow: 'shadow-xl',
            divide: 'divide-y-0',
            body: { padding: 'p-6 pt-5 sm:p-4 sm:pt-5' }
          }">
            <form @submit.prevent="handleLogin" class="flex flex-col justify-center">

              <div class="flex flex-col items-center">

                <UIcon name="i-lucide-coffee" class="w-10 h-10 text-kapedokoPrimary-500 mb-2" />

                <p class="text-center font-semibold text-sm text-kapedokoPrimary-500 pt-2 pb-6">
                  Find your next work-friendly cafe with Kapedoko.
                </p>
              </div>

              <div class="space-y-3.5">
                <UFormGroup label="Email" name="email">
                  <UInput v-model="email" type="email" placeholder="you@example.com" icon="i-lucide-mail" size="xl" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                  <UInput v-model="password" type="password" placeholder="********" icon="i-lucide-lock" size="xl" />
                </UFormGroup>

                <div v-if="errorMsg" class="text-red-500 px-2 py-2 rounded-md border border-red-500">
                  <p class="text-sm text-center capitalize">
                  {{ errorMsg }}
                </p>
                </div>

                <div class="flex flex-col gap-3 pt-3">
                  <UButton type="submit" block :loading="loading" color="gray" variant="solid" class="h-11 font-bold"
                    :ui="{
                      color: {
                        gray: {
                          solid: 'dark:bg-primary-500 dark:text-white focus:ring-0 ring-0 text-sm h-11 dark:hover:bg-white/200'
                        }
                      }
                    }">
                    Login
                  </UButton>

                  <UButton variant="ghost" block @click="handleSignUp" :disabled="loading"
                    class="h-10 font-medium text-kapedokoPrimary-500">
                    Create an account
                  </UButton>
                </div>
              </div>
            </form>
          </UCard>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  try {
    loading.value = true
    errorMsg.value = ''
    await auth.signIn(email.value, password.value)
    router.push('/app') // Redirect to home/map after success
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to sign in'
  } finally {
    loading.value = false
  }
}

async function handleSignUp() {
  try {
    loading.value = true
    errorMsg.value = ''
    await auth.signUp(email.value, password.value)
    alert('Check your email for the confirmation link!')
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to sign up'
  } finally {
    loading.value = false
  }
}
</script>