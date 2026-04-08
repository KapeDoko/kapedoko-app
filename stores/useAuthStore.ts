import { defineStore } from 'pinia'
import type { User, Session } from '@supabase/supabase-js'
import type { AuthChangeEvent } from '@supabase/supabase-js'
import { Preferences } from '@capacitor/preferences'

type StoredAuthUser = {
  id: string
  email: string | null
}

const AUTH_USER_STORAGE_KEY = 'auth:user'

export const useAuthStore = defineStore('auth', () => {
  const { $supabase } = useNuxtApp() as any
  const user = ref<User | null>(null)
  const loading = ref<boolean>(true)
  const initialized = ref<boolean>(false) // Track if initialization is done

  const toStoredAuthUser = (sessionUser: User | null): StoredAuthUser | null => {
    if (!sessionUser) {
      return null
    }

    return {
      id: sessionUser.id,
      email: sessionUser.email ?? null,
    }
  }

  const readStoredAuthUser = async (): Promise<StoredAuthUser | null> => {
    const { value } = await Preferences.get({ key: AUTH_USER_STORAGE_KEY })

    if (!value) {
      return null
    }

    try {
      return JSON.parse(value) as StoredAuthUser
    } catch {
      await Preferences.remove({ key: AUTH_USER_STORAGE_KEY })
      return null
    }
  }

  const writeStoredAuthUser = async (sessionUser: User | null): Promise<void> => {
    const storedUser = toStoredAuthUser(sessionUser)

    if (!storedUser) {
      await Preferences.remove({ key: AUTH_USER_STORAGE_KEY })
      return
    }

    await Preferences.set({
      key: AUTH_USER_STORAGE_KEY,
      value: JSON.stringify(storedUser),
    })
  }

  const applyStoredAuthUser = (storedUser: StoredAuthUser | null) => {
    if (!storedUser) {
      return
    }

    user.value = {
      id: storedUser.id,
      email: storedUser.email,
    } as User
  }

  // Initialize and listen to changes
  async function init(): Promise<void> {
    loading.value = true

    // Fast hydration for middleware checks before network/session refresh completes.
    applyStoredAuthUser(await readStoredAuthUser())

    const { data: { session } } = await $supabase.auth.getSession()
    user.value = session?.user ?? null
    await writeStoredAuthUser(session?.user ?? null)
    initialized.value = true // Set to true after checking session
    loading.value = false
    
    $supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      user.value = session?.user ?? null
      void writeStoredAuthUser(session?.user ?? null)
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
    await writeStoredAuthUser(data.session?.user ?? null)
    return data
  }

  async function signOut(): Promise<void> {
    await $supabase.auth.signOut()
    user.value = null
    await writeStoredAuthUser(null)
  }

  return { user, loading, init, signUp, signIn, signOut, initialized }
})