import cron from "node-cron";

const sendWeeklyEmails = async () => {
  try {
    await fetch("http://localhost:3000/api/price-alerts/send-email", {
      method: "POST",
    });
    console.log("✅ Weekly price drop email sent successfully!");
  } catch (error) {
    console.error("❌ Failed to send weekly email:", error);
  }
};

// Schedule job to run every Monday at 9 AM
cron.schedule("0 9 * * MON", () => {
  console.log("⏰ Running weekly price drop email job...");
  sendWeeklyEmails();
});

export default sendWeeklyEmails;
