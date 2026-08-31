interface ApplicationEmbed {
  username: string;
  email: string;
  applicationId: string;
  answers: Record<string, string | string[]>;
  siteUrl: string;
}

/**
 * Sends a rich Discord embed to the configured webhook URL
 * when a new application is submitted.
 */
export async function notifyNewApplication({
  username,
  email,
  applicationId,
  answers,
  siteUrl,
}: ApplicationEmbed): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("[Discord] No DISCORD_WEBHOOK_URL configured, skipping notification.");
    return;
  }

  // Build a summary of key answers (first 3 text answers)
  const answerEntries = Object.entries(answers)
    .filter(([, v]) => typeof v === "string" && v.length > 0)
    .slice(0, 3);

  const fields = answerEntries.map(([key, value]) => ({
    name: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    value: String(value).slice(0, 200) + (String(value).length > 200 ? "..." : ""),
    inline: false,
  }));

  const embed = {
    title: "📋 New Application Submitted",
    color: 0x4baf4f, // Klaatzoo green
    fields: [
      { name: "👤 Username", value: username, inline: true },
      { name: "📧 Email", value: email, inline: true },
      { name: "🆔 Application ID", value: `\`${applicationId}\``, inline: false },
      ...fields,
    ],
    footer: {
      text: "Klaatzoo Network • Application System",
    },
    timestamp: new Date().toISOString(),
    url: `${siteUrl}/admin/applications/${applicationId}`,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Klaatzoo Applications",
        avatar_url: `${siteUrl}/images/logo.png`,
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      console.error(`[Discord] Webhook failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("[Discord] Webhook error:", error);
  }
}

/**
 * Sends a status update notification when staff changes an application's status.
 */
export async function notifyStatusChange({
  applicationId,
  username,
  newStatus,
  moderatorName,
  siteUrl,
}: {
  applicationId: string;
  username: string;
  newStatus: string;
  moderatorName: string;
  siteUrl: string;
}): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const statusColors: Record<string, number> = {
    PENDING: 0xfec106,
    UNDER_REVIEW: 0x2196f3,
    ACCEPTED: 0x4baf4f,
    REJECTED: 0xf44235,
  };

  const statusEmojis: Record<string, string> = {
    PENDING: "⏳",
    UNDER_REVIEW: "🔍",
    ACCEPTED: "✅",
    REJECTED: "❌",
  };

  const embed = {
    title: `${statusEmojis[newStatus] || "📋"} Application Status Updated`,
    color: statusColors[newStatus] || 0x9b27b0,
    fields: [
      { name: "👤 Applicant", value: username, inline: true },
      { name: "📊 New Status", value: newStatus.replace(/_/g, " "), inline: true },
      { name: "👮 Updated By", value: moderatorName, inline: true },
    ],
    footer: { text: "Klaatzoo Network • Application System" },
    timestamp: new Date().toISOString(),
    url: `${siteUrl}/admin/applications/${applicationId}`,
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Klaatzoo Applications",
        embeds: [embed],
      }),
    });
  } catch (error) {
    console.error("[Discord] Status webhook error:", error);
  }
}
