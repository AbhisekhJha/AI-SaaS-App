import { consumeAiUsage } from '../../utils/aiUsage'
import { openai } from '../../utils/openai'

export default defineEventHandler( async(event) => {
    const {articleTopic, articleTopicLength} = await readBody(event);

    if(!articleTopic || !String(articleTopic).trim()){
        throw createError({
            statusCode: 400,
            statusMessage: "Article topic is required"
        });
    }
    const wordCount = articleTopicLength ? articleTopicLength : 300;
    await consumeAiUsage(event)
    const prompt = `Write a detailed article about "${String(articleTopic).trim()}". The article must be approximately ${wordCount} words long. Include an introduction, main body with key points, and a conclusion. Do not cut off abruptly.`;
    const res = await openai.chat.completions.create({
        model: "gemini-3-flash-preview",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: Math.max(wordCount * 2, 800)
    });
        return res.choices[0].message.content;
    });
