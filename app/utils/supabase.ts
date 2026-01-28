import { createClient } from '@supabase/supabase-js'

export const supabaseBrowserClient = () => {
  const config = useRuntimeConfig()

  return createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    }
  )
}

