<script setup lang="ts">
import { useGemini } from '~/composable/useGemini'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const message = ref('')
const messages = ref<{ role: string; content: string }[]>([])
const { loading, error, result, generate } = useGemini('/api/ai-tools/conversation')

async function sendMessage() {
  if (!message.value.trim() || loading.value) return
  messages.value.push({ role: 'user', content: message.value })
  await generate({ messages: message.value })
  if (result.value) messages.value.push({ role: 'assistant', content: result.value })
  message.value = ''
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-6 h-[calc(100vh-8rem)] flex flex-col">
  
    <div class="mb-4">
      <h1 class="text-2xl font-bold">Conversation</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Chat with AI assistant</p>
    </div>

    
    <div class="flex-1 flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden">
     
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
       
        <div v-if="messages.length === 0" class="h-full flex items-center justify-center">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 text-white" />
            </div>
            <p class="text-gray-500 dark:text-gray-400">Start a conversation</p>
          </div>
        </div>

    
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="flex"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[80%] px-4 py-3 rounded-2xl"
            :class="msg.role === 'user' 
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'"
          >
            {{ msg.content }}
          </div>
        </div>

        
        <div v-if="loading" class="flex justify-start">
          <div class="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl">
            <div class="flex gap-1">
              <span class="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
              <span class="w-2 h-2 bg-red-500 rounded-full animate-bounce" style="animation-delay: 0.1s" />
              <span class="w-2 h-2 bg-red-500 rounded-full animate-bounce" style="animation-delay: 0.2s" />
            </div>
          </div>
        </div>

        
        <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>
      </div>

      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex gap-3">
          <UInput
            v-model="message"
            placeholder="Type your message..."
            class="flex-1"
            size="lg"
            @keyup.enter="sendMessage"
            :disabled="loading"
          />
          <UButton
            @click="sendMessage"
            :loading="loading"
            :disabled="!message.trim()"
            size="lg"
            class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
          >
            <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5" />
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
