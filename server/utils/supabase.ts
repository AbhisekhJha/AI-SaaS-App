import { createClient } from '@supabase/supabase-js'

export const supabaseClient = () => {
  const config = useRuntimeConfig()
  
  return createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { 
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

export const supabaseClientPublic = () => {
  const config = useRuntimeConfig()
  
  return createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey, 
  )
}