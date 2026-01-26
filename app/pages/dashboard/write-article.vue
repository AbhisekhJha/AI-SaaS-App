<script setup lang="ts">
import { useGemini } from '~/composable/useGemini'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const topic = ref('')
const length = ref(300)
const { loading, error, result, generate } = useGemini('/api/ai-tools/write-article')

const lengthOptions = [
  { label: 'Short', value: 300 },
  { label: 'Medium', value: 500 },
  { label: 'Long', value: 800 },
]

async function generateArticle() {
  if (!topic.value.trim() || loading.value) return
  await generate({ articleTopic: topic.value, articleTopicLength: length.value })
}

function copyToClipboard() {
  navigator.clipboard.writeText(result.value)
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-6">
   
    <div class="mb-6">
      <h1 class="text-2xl font-bold">AI Article Writer</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Generate articles with AI</p>
    </div>

   
    <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5 mb-5">
     
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Article Length</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="option in lengthOptions"
            :key="option.value"
            @click="length = option.value"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            :class="length === option.value 
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'"
          >
            {{ option.label }} ({{ option.value }} words)
          </button>
        </div>
      </div>

    
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Article Topic</label>
        <UInput
          v-model="topic"
          placeholder="e.g., The future of artificial intelligence..."
          size="lg"
          class="w-full"
        />
      </div>

      <UButton
        @click="generateArticle"
        :loading="loading"
        :disabled="!topic.trim()"
        block
        size="lg"
        class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
      >
        <UIcon name="i-heroicons-document-text" class="w-5 h-5 mr-2" />
        Generate Article
      </UButton>
    </div>


    <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>

 
    <div v-if="result" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden">
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <span class="text-sm font-medium">Generated Article</span>
        <UButton size="sm" variant="ghost" @click="copyToClipboard">
          <UIcon name="i-heroicons-clipboard" class="w-4 h-4 mr-1" />
          Copy
        </UButton>
      </div>
      <div class="p-5">
        <p class="whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300">{{ result }}</p>
      </div>
    </div>
  </div>
</template>
