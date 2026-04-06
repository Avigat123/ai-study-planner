import OpenAI from "openai";


export const generatePlan = async (subject, days, difficulty) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("Missing OPENAI_API_KEY environment variable");
        }

        const client = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENAI_API_KEY
        });
        const prompt = `
Create a realistic ${days}-day study plan for ${subject}.
Difficulty: ${difficulty}.

Return ONLY a valid JSON array.
No explanation, no text.

Format:
[
  { "day": 1, "task": "..." }
]
`;

        const response = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        });

        const text = response.choices[0].message.content;

        // safely extract JSON
        const jsonMatch = text.match(/\[.*\]/s);
        if (!jsonMatch) throw new Error("Invalid AI response");

        return JSON.parse(jsonMatch[0]);

    } catch (err) {
        console.error("AI Error:", err);

        // fallback (VERY IMPORTANT)
        const errorReason = err.message || "Unknown error";
        return Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            task: `[AI Error: ${errorReason}] Study ${subject} - Day ${i + 1}`
        }));
    }
};