import { consumeAiUsage } from '../../utils/aiUsage'
import { openai } from '../../utils/openai'

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
                    content: "You are a code generator. You must answer only in markdown code snippets."
                },
                {
                    role: "user",
                    content: String(messages).trim()
                }

            ],
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 800
        });
        return res.choices[0].message.content;
    });
