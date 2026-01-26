<script setup lang="ts">
import { useGemini } from '~/composable/useGemini'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const topic = ref('')
const category = ref('')
const { loading, error, result, generate } = useGemini('/api/ai-tools/blog-title')

const categories = ['Technology', 'Business', 'Health', 'Lifestyle', 'Travel', 'Food', 'Finance', 'Education']

async function generateTitle() {
  if (!topic.value.trim() || !category.value || loading.value) return
  await generate({ blogTopic: topic.value, blogCategory: category.value })
}

function copyToClipboard() {
  navigator.clipboard.writeText(result.value)
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-6">
   
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Blog Title Generator</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Generate catchy blog titles</p>
    </div>

   
    <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5 mb-5">
    
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Category</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="category = cat"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            :class="category === cat 
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'"
          >
            {{ cat }}
          </button>
        </div>
      </div>

     
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Blog Topic / Keyword</label>
        <UInput
          v-model="topic"
          placeholder="e.g., productivity tips for remote workers"
          size="lg"
          class="w-full"
        />
      </div>

      <UButton
        @click="generateTitle"
        :loading="loading"
        :disabled="!topic.trim() || !category"
        block
        size="lg"
        class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
      >
        <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 mr-2" />
        Generate Titles
      </UButton>
    </div>

 
    <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>

   
    <div v-if="result" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden">
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <span class="text-sm font-medium">Generated Titles</span>
        <UButton size="sm" variant="ghost" @click="copyToClipboard">
          <UIcon name="i-heroicons-clipboard" class="w-4 h-4 mr-1" />
          Copy All
        </UButton>
      </div>
      <div class="p-5">
        <p class="whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300">{{ result }}</p>
      </div>
    </div>
  </div>
</template>
