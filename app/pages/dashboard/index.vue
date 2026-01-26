<script setup lang="ts">
import { sidebarRoutes } from '~~/constants/tools'

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
})

const features = sidebarRoutes[0].map(item => ({
  title: item.label,
  description: getDescription(item.label),
  icon: item.icon,
  to: item.to,
  color: getColor(item.label)
}))

function getDescription(label: string) {
  switch (label) {
    case 'Conversation':
      return 'Chat with AI assistant for any questions'
    case 'Code Generator':
      return 'Generate code snippets in any language'
    case 'AI Article Writer':
      return 'Write articles on any topic'
    case 'Blog Title Generator':
      return 'Generate catchy blog titles'
    default:
      return ''
  }
}

function getColor(label: string) {
  switch (label) {
    case 'Conversation':
      return 'from-blue-500 to-blue-600'
    case 'Code Generator':
      return 'from-emerald-500 to-emerald-600'
    case 'AI Article Writer':
      return 'from-violet-500 to-violet-600'
    case 'Blog Title Generator':
      return 'from-amber-500 to-amber-600'
    default:
      return 'from-red-500 to-red-600'
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8">
   
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold mb-2">
        Unleash the Power of <span class="text-red-500">AI</span>
      </h1>
      <p class="text-gray-500 dark:text-gray-400">Choose a tool to get started</p>
    </div>

    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <NuxtLink
        v-for="feature in features"
        :key="feature.title"
        :to="feature.to"
        class="group p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
      >
        <div class="flex items-start gap-4">
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shrink-0 group-hover:scale-110 transition-transform duration-300"
            :class="feature.color"
          >
            <UIcon :name="feature.icon" class="w-6 h-6 text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-lg mb-1 group-hover:text-red-500 transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ feature.description }}</p>
          </div>
          <UIcon 
            name="i-heroicons-arrow-right" 
            class="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300 mt-1" 
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
