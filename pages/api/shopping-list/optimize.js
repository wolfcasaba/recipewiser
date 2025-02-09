import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { items } = req.body;
  const prompt = `You are an AI assistant helping users with grocery shopping. Optimize this list by merging duplicate ingredients and suggesting substitutions when needed: ${JSON.stringify(
    items
  )}`;

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
    });

    res.status(200).json({ optimizedList: response.choices[0].text });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to optimize shopping list" });
  }
}
