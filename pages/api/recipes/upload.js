import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, ingredients, steps } = req.body;
    const recipe = await prisma.recipe.create({ data: { title, ingredients, steps } });
    res.status(200).json(recipe);
  }
}
