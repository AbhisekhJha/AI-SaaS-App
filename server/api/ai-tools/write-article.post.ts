export default defineEventHandler( async(event) => {
    const {articleTopic, articleTopicLength} = await readBody(event);

    if(!articleTopic){
        throw createError({
            statusCode: 400,
            statusMessage: "Article topic is required"
        });
    }
    const wordCount = articleTopicLength ? articleTopicLength : 300;
    const prompt = `Write a detailed article about "${articleTopic}". The article must be approximately ${wordCount} words long. Include an introduction, main body with key points, and a conclusion. Do not cut off abruptly.`;
    const res = await openai.chat.completions.create({
        model: "gemini-3-flash-preview",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        max_completion_tokens: Math.max(wordCount * 2, 1000)
    });
        return res.choices[0].message.content;
    });
