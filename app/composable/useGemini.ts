import { onMounted, ref } from 'vue'
import { useAiUsage } from './useAiUsage'

export function useGemini(apiPath: string) {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref<string>('')
  const { usage, usagePercent, limitReached, refreshUsage } = useAiUsage()

  async function generate(body: Record<string, any>) {
    loading.value = true
    error.value = null
    result.value = ''
    try {
      const res = await $fetch(apiPath, {
        method: 'POST',
        body
      })
      result.value = res as string
    } catch (e: any) {
      error.value = e?.data?.statusMessage || e.message || 'Something went wrong'
    } finally {
      loading.value = false
      await refreshUsage()
    }
  }

  onMounted(() => {
    refreshUsage()
  })

  return { loading, error, result, generate, usage, usagePercent, limitReached }
}
