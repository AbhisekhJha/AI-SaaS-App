<script setup lang="ts">
import { useAuth } from '~/composable/useAuth'

const { completeOAuth, errorMessage } = useAuth()

onMounted(async () => {
  try {
    await completeOAuth()
    await navigateTo('/dashboard')
  } catch {
    
  }
})
</script>

<template>
  <div class="min-h-screen bg-black text-white flex items-center justify-center p-4">
    <div class="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 text-center">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 mb-4">
        <UIcon name="i-heroicons-bolt" class="w-6 h-6 text-white" />
      </div>
      <h1 class="text-xl font-bold mb-2">Signing you in...</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Please wait while we finish authentication.</p>
      <UAlert
        v-if="errorMessage"
        color="error"
        variant="soft"
        :title="errorMessage"
        icon="i-heroicons-exclamation-triangle"
        class="mt-4 text-left"
      />
    </div>
  </div>
</template>

