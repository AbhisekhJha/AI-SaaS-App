import OpenAI from "openai";

const config = useRuntimeConfig();

export const openai = new OpenAI({
    apiKey: config.geminiApiKey,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"


});

