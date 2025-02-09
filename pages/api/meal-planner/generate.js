import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { dietaryPreference } = req.body;
  const prompt = `Suggest a 7-day meal plan for someone who follows a ${dietaryPreference} diet. List breakfast, lunch, and dinner for each day.`;

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 300,
    });

    res.status(200).json({ plan: response.choices[0].text });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to generate meal plan" });
  }
}
