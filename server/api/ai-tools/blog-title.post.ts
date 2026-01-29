import { consumeAiUsage } from '../../utils/aiUsage';
import { openai } from '../../utils/openai'


export default defineEventHandler( async(event) => {
    const {blogTopic, blogCategory} = await readBody(event);

    if(!blogTopic || !String(blogTopic).trim()){
        throw createError({
            statusCode: 400,
            statusMessage: "Blog topic is required"
        });
    }
    if(!blogCategory || !String(blogCategory).trim()){
        throw createError({
            statusCode: 400,
            statusMessage: "Blog category is required"
        });
    }

    await consumeAiUsage(event)
    const prompt = `Generate 5 creative, catchy, and SEO-friendly blog title ideas for the keyword "${String(blogTopic).trim()}" in the ${String(blogCategory).trim()} category. Format each title on a new line with a number. Make them engaging and click-worthy.`;
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
        max_tokens: 400
    });
        return res.choices[0].message.content;
    });
