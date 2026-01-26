export default defineEventHandler( async(event) => {
    const {messages} = await readBody(event);

    if(!messages){
        throw createError({
            statusCode: 400,
            statusMessage: "Messages are required"
        });
    }
    const res = await openai.chat.completions.create({
        model: "gemini-3-flash-preview",
        messages: [
            {
                role: "system",
                    content: "You are a code generator. You must answer only in markdown code snippets."
                },
                {
                    role: "user",
                    content: messages
                }

            ]
        });
        return res.choices[0].message.content;
    });
