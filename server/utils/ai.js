import OpenAI from "openai";


export const generatePlan = async (subject, days, difficulty) => {
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

    try {
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
        return Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            task: `Study ${subject} - Day ${i + 1}`
        }));
    }
};