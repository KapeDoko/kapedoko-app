import { defineStore } from 'pinia'
import type { User, Session } from '@supabase/supabase-js'
import type { AuthChangeEvent } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const { $supabase } = useNuxtApp() as any
  const user = ref<User | null>(null)
  const loading = ref<boolean>(true)
  const initialized = ref<boolean>(false) // Track if initialization is done

  // Initialize and listen to changes
  async function init(): Promise<void> {
    loading.value = true
    const { data: { session } } = await $supabase.auth.getSession()
    user.value = session?.user ?? null
    initialized.value = true // Set to true after checking session
    
    $supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      user.value = session?.user ?? null
      loading.value = false
    })
  }

  async function signUp(email: string, pass: string) {
    const { data, error } = await $supabase.auth.signUp({ email, password: pass })
    if (error) throw error
    return data
  }

  async function signIn(email: string, pass: string) {
    const { data, error } = await $supabase.auth.signInWithPassword({ email, password: pass })
    if (error) throw error
    return data
  }

  async function signOut(): Promise<void> {
    await $supabase.auth.signOut()
    user.value = null
  }

  return { user, loading, init, signUp, signIn, signOut, initialized }
})