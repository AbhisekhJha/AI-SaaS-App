import type { H3Event } from 'h3'
import type { Stream } from 'openai/streaming'

export function createStreamingResponse(
  event: H3Event,
  stream: Stream<any>
) {
  setResponseHeader(event, 'Content-Type', 'text/event-stream')
  setResponseHeader(event, 'Cache-Control', 'no-cache')
  setResponseHeader(event, 'X-Accel-Buffering', 'no')

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''
        if (content) {
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`)
          )
        }
      }
      controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
      controller.close()
    }
  })
}
