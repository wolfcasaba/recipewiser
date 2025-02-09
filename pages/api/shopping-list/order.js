export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { items, service } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Shopping list is empty" });
  }

  try {
    let response;
    
    if (service === "instacart") {
      response = await fetch("https://api.instacart.com/v2/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.INSTACART_API_KEY}`,
        },
        body: JSON.stringify({ items }),
      });
    } else if (service === "amazon") {
      response = await fetch("https://api.amazon.com/fresh/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AMAZON_FRESH_API_KEY}`,
        },
        body: JSON.stringify({ items }),
      });
    } else {
      return res.status(400).json({ message: "Invalid service provider" });
    }

    const data = await response.json();
    res.status(200).json({ orderUrl: data.checkout_url });

  } catch (error) {
    res.status(500).json({ error: "Failed to process order" });
  }
}
