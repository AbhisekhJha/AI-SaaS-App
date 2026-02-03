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
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.statusMessage || 'Request failed')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const { content } = JSON.parse(line.slice(6))
              if (content) {

                for (const char of content) {
                  result.value += char
                  await new Promise(r => setTimeout(r, 5))
                }
              }
            } catch {}
          }
        }
      }
    } catch (e: any) {
      error.value = e?.message || 'Something went wrong'
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
