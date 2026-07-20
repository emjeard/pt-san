import { sendContactViaResend } from "../../server/contactMail.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/**
 * Netlify Function: POST /.netlify/functions/contact
 * Also exposed as /api/contact via redirects.
 */
export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let payload = {};
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const result = await sendContactViaResend(payload, {
    apiKey: process.env.RESEND_API_KEY,
    toEmail: process.env.CONTACT_TO_EMAIL || "kontak@sansolution.tech",
    fromEmail:
      process.env.RESEND_FROM_EMAIL || "SAN Solution <kontak@sansolution.tech>",
  });

  return {
    statusCode: result.status || (result.ok ? 200 : 500),
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(
      result.ok ? { ok: true } : { error: result.error || "Request failed" },
    ),
  };
};
