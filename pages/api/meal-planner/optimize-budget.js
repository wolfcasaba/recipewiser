import OpenAI from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { budget, shoppingList } = req.body;

  if (!budget || budget <= 0) {
    return res.status(400).json({ message: "Invalid budget amount" });
  }

  if (!shoppingList || shoppingList.length === 0) {
    return res.status(400).json({ message: "Shopping list is empty" });
  }

  const prompt = `You are an AI meal planner that helps users optimize their grocery shopping list within a budget of $${budget}. Given this shopping list: ${JSON.stringify(
    shoppingList
  )}, suggest the best ways to reduce cost while keeping meal quality high.`;

  try {
    const response = await openai.Completion.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 200,
    });

    res.status(200).json({ optimizedPlan: response.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "Failed to optimize budget" });
  }
}
