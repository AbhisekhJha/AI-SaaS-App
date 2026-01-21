export default defineEventHandler( async(event) => {
    const {blogTopic, blogCategory} = await readBody(event);

    if(!blogTopic){
        throw createError({
            statusCode: 400,
            statusMessage: "Blog topic is required"
        });
    }
    if(!blogCategory){
        throw createError({
            statusCode: 400,
            statusMessage: "Blog category is required"
        });
    }

    const prompt = `Generate 5 creative, catchy, and SEO-friendly blog title ideas for the keyword "${blogTopic}" in the ${blogCategory} category. Format each title on a new line with a number. Make them engaging and click-worthy.`;
    const res = await openai.chat.completions.create({
        model: "gemini-3-flash-preview",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        max_completion_tokens: 5000
    });
        return res.choices[0].message.content;
    });
