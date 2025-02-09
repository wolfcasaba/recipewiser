export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Shopping list is empty" });
  }

  try {
    const priceResults = [];

    for (const item of items) {
      const query = encodeURIComponent(item.name);

      // Fetch real-time prices from Walmart
      const walmartRes = await fetch(`https://api.walmart.com/v3/search?query=${query}&apiKey=${process.env.WALMART_API_KEY}`);
      const walmartData = await walmartRes.json();
      const walmartPrice = walmartData.items?.[0]?.price || "N/A";

      // Fetch real-time prices from Amazon
      const amazonRes = await fetch(`https://api.amazon.com/products?search=${query}&apiKey=${process.env.AMAZON_API_KEY}`);
      const amazonData = await amazonRes.json();
      const amazonPrice = amazonData.products?.[0]?.price || "N/A";

      // Fetch real-time prices from Instacart
      const instacartRes = await fetch(`https://api.instacart.com/v2/products/search?q=${query}&apiKey=${process.env.INSTACART_API_KEY}`);
      const instacartData = await instacartRes.json();
      const instacartPrice = instacartData.products?.[0]?.price || "N/A";

      priceResults.push({
        name: item.name,
        walmart: walmartPrice,
        amazon: amazonPrice,
        instacart: instacartPrice,
      });
    }

    res.status(200).json({ prices: priceResults });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch real-time prices" });
  }
}
