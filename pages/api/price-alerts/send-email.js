import sgMail from "@sendgrid/mail";
import { createClient } from "@supabase/supabase-js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  try {
    // Fetch price drops from the database
    const { data: priceDrops } = await supabase
      .from("price_history")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!priceDrops || priceDrops.length === 0) {
      return res.status(200).json({ message: "No price drops detected this week." });
    }

    const priceList = priceDrops
      .map((item) => `${item.name}: $${item.price} (New Price)`)
      .join("<br>");

    // Fetch subscribed users
    const { data: users } = await supabase.from("users").select("email");

    if (!users || users.length === 0) {
      return res.status(200).json({ message: "No users subscribed for alerts." });
    }

    // Send email to all users
    const msg = {
      to: users.map((user) => user.email),
      from: "alerts@recipewiser.com",
      subject: "📉 Weekly Price Drop Alerts - Save on Groceries!",
      html: `<h2>🔥 Price Drop Alert!</h2><p>Here are the latest grocery price drops:</p><ul>${priceList}</ul><p>Happy Shopping! 🛒</p>`,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: "Weekly price drop email sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
