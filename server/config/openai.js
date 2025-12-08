

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY,
    baseURL: process.env.GROQ_API_KEY 
        ? "https://api.groq.com/openai/v1"
        : "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export default openai;
