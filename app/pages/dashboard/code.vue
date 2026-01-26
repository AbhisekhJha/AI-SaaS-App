<script setup lang="ts">
import { useGemini } from '~/composable/useGemini'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const prompt = ref('')
const { loading, error, result, generate } = useGemini('/api/ai-tools/code')

async function generateCode() {
  if (!prompt.value.trim() || loading.value) return
  await generate({ messages: prompt.value })
}

function copyToClipboard() {
  navigator.clipboard.writeText(result.value)
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-6">
    
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Code Generator</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Generate code with AI</p>
    </div>

  
    <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5 mb-5">
      <label class="block text-sm font-medium mb-2">Describe what you want</label>
      <UTextarea
        v-model="prompt"
        placeholder="e.g., Create a function that sorts an array in JavaScript..."
        :rows="4"
        class="w-full mb-4"
      />
      <UButton
        @click="generateCode"
        :loading="loading"
        :disabled="!prompt.trim()"
        block
        size="lg"
        class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
      >
        <UIcon name="i-heroicons-sparkles" class="w-5 h-5 mr-2" />
        Generate Code
      </UButton>
    </div>

    <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>


    <div v-if="result" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden">
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <span class="text-sm font-medium">Generated Code</span>
        <UButton size="sm" variant="ghost" @click="copyToClipboard">
          <UIcon name="i-heroicons-clipboard" class="w-4 h-4 mr-1" />
          Copy
        </UButton>
      </div>
      <pre class="p-4 overflow-x-auto text-sm bg-gray-900 text-gray-100"><code>{{ result }}</code></pre>
    </div>
  </div>
</template>
