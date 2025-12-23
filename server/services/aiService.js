const Groq = require('groq-sdk');
require('dotenv').config();

/**
 * Initialize Groq client. 
 * We use a helper function to ensure we always have the latest process.env value.
 */
const getGroqClient = () => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === 'dummy_key') {
        return null;
    }
    return new Groq({ apiKey });
};

async function generateResponse(query, context) {
    const groq = getGroqClient();

    // 1. Check if the API key is missing
    if (!groq) {
        console.warn("[AIService] No GROQ_API_KEY found. Falling back to mock response.");
        return `I'm currently in offline mode. Based on my records: ${context.map(c => c.text).join(', ')}`;
    }

    try {
        // 2. Prepare context. If no context found by knowledgeService, provide a fallback.
        const contextText = context.length > 0
            ? context.map(c => `- ${c.text}`).join('\n')
            : "No specific company records found for this query.";

        const systemPrompt = `You are an AI assistant for Kenmark ITan Solutions.
Answer user queries using ONLY the information provided in the context below.
If the information is not present in the context, politely say "I don't have that information yet."
Always stay professional and concise.

Context:
${contextText}`;

        console.log("Context sent to AI:", context.map(c => c.text));

        // 3. Call the Groq API
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: query }
            ],
            model: "llama-3.3-70b-versatile", // Ensure this model is active in your Groq console
            temperature: 0.5,
            max_tokens: 1024,
        });

        return completion.choices[0]?.message?.content || "I couldn't generate a response.";

    } catch (error) {
        // 4. Enhanced Error Handling for common Groq issues
        console.error("AI Service Error:", error.status, error.message);

        if (error.status === 401) {
            return "Authentication Error: Please check if your Groq API key is valid.";
        }
        if (error.status === 429) {
            return "I'm receiving too many requests right now. Please try again in a moment.";
        }
        if (error.status === 404) {
            return "The AI model is currently unavailable. Please contact support.";
        }

        return `I'm having trouble processing that request. Error: ${error.message}`;
    }
}

module.exports = { generateResponse };