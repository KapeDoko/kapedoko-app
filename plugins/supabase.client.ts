import { createClient } from '@supabase/supabase-js'
import { Preferences } from '@capacitor/preferences'

const capacitorStorage = {
  getItem: async (key: string) => {
    const { value } = await Preferences.get({ key })
    return value
  },
  setItem: async (key: string, value: string) => {
    await Preferences.set({ key, value })
  },
  removeItem: async (key: string) => {
    await Preferences.remove({ key })
  },
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()  

  const supabase = createClient(     
    config.public.supabaseUrl,
    config.public.supabaseKey,
    {
      auth: {
        storage: capacitorStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    }
  )

  return {
    provide: { supabase }
  }
})