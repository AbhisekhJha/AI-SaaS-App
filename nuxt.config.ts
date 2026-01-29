import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'nuxt-color-mode',
  },
    vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui',"nuxt-auth-utils"],
  runtimeConfig: {
  
    supabaseServiceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,
    geminiApiKey: process.env.NUXT_GEMINI_API_KEY,
    
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    },
  }
})