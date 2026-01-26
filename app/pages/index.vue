<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-black text-white overflow-hidden">
    
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
      <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] " />
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-900/30 rounded-full blur-[100px] " />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-950/20 rounded-full blur-[150px]" />
    </div>

    
    <nav class="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
      <Logo />
      <NuxtLink to="/auth/login">
        <UButton color="neutral" variant="ghost" class="text-white/80 hover:text-white">
          Sign In
        </UButton>
      </NuxtLink>
    </nav>

   
    <main class="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32">
      
      <div class="mb-8 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm">
        <span class="text-sm text-red-400 font-medium">✨ Powered by Advanced AI</span>
      </div>

      
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-center max-w-5xl leading-tight mb-6">
        <span class="bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
          Unleash the Power of
        </span>
        <br />
        <span class="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
          Artificial Intelligence
        </span>
      </h1>

      
      <p class="text-lg md:text-xl text-neutral-400 text-center max-w-2xl mb-12 leading-relaxed">
        Generate code, write articles, generate blog title and chat with AI. 
        Simple, fast, and incredibly powerful.
      </p>

      
      <div class="flex flex-col sm:flex-row gap-4 mb-20">
        <NuxtLink to="/auth/register">
          <UButton 
            size="xl" 
            class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/40 hover:scale-105"
          >
            Get Started Free
            <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 ml-2" />
          </UButton>
        </NuxtLink>
        <NuxtLink to="/auth/login">
          <UButton 
            size="xl" 
            variant="outline"
            class="border-neutral-700 text-white hover:bg-white/5 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Sign In
          </UButton>
        </NuxtLink>
      </div>

     
    </main>

 
    <footer class="relative z-10 text-center py-8 border-t border-neutral-800/50">
      <p class="text-neutral-500 text-sm">
        Built with Nuxt & AI · {{ new Date().getFullYear() }}
      </p>
    </footer>
  </div>
</template>

