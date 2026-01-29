import { computed } from 'vue'

export const useAiUsage = () => {
  const usage = useState<{ count: number; limit: number } | null>('ai-usage', () => null)

  const usagePercent = computed(() => {
    if (!usage.value) return 0
    return Math.min(100, Math.round((usage.value.count / usage.value.limit) * 100))
  })

  const limitReached = computed(() => {
    return usage.value ? usage.value.count >= usage.value.limit : false
  })

  async function refreshUsage() {
    try {
      usage.value = await $fetch('/api/ai-tools/usage')
    } catch {
      usage.value = null
    }
  }

  return { usage, usagePercent, limitReached, refreshUsage }
}

