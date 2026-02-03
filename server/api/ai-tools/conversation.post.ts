import { consumeAiUsage } from '../../utils/aiUsage'
import { openai } from '../../utils/openai'
import { createStreamingResponse } from '../../utils/streaming'

export default defineEventHandler( async(event) => {
    const {messages} = await readBody(event);

    if(!messages || !String(messages).trim()){
        throw createError({
            statusCode: 400,
            statusMessage: "Messages are required"
        });
    }
    await consumeAiUsage(event)
    const res = await openai.chat.completions.create({
        model: "gemini-3-flash-preview",
        messages: [
            {
                role: "system",
                    content: "You are a helpful assistant."
                },
                {
                    role: "user",
                    content: String(messages).trim()
                },

        ],
        temperature: 0.8,
        max_tokens: 2000,
        stream: true
    })

    return createStreamingResponse(event, res)
})
