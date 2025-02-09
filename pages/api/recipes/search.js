import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { ingredients } = req.body;
    const prompt = `Suggest a recipe using: ${ingredients.join(", ")}`;

    try {
      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt,
        max_tokens: 100,
      });

      res.status(200).json({ recipe: response.choices[0].text });
    } catch (error) {
      console.error("OpenAI API error:", error);
      res.status(500).json({ error: "Failed to generate recipe." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
