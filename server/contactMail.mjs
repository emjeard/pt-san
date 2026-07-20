/**
 * Shared contact-mail helper for Vite middleware and Netlify Functions.
 * Uses Resend HTTP API — API key must stay server-side only.
 */

const MIN_SUBMISSION_MS = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @typedef {object} ContactPayload
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [whatsapp]
 * @property {string} [company]
 * @property {string} [projectType]
 * @property {string} [projectStage]
 * @property {string} [preferredContact]
 * @property {string} [message]
 * @property {string} [website]
 * @property {number} [formStartedAt]
 */

/**
 * @param {ContactPayload} data
 * @returns {{ ok: true, data: Required<Pick<ContactPayload, 'name' | 'projectType' | 'message'>> & ContactPayload } | { ok: false, status: number, error: string }}
 */
export function validateContactPayload(data) {
  if (!data || typeof data !== "object") {
    return { ok: false, status: 400, error: "Invalid request body" };
  }

  if (typeof data.website === "string" && data.website.trim()) {
    return { ok: false, status: 400, error: "Invalid submission" };
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const whatsapp = String(data.whatsapp ?? "").trim();
  const projectType = String(data.projectType ?? "").trim();
  const message = String(data.message ?? "").trim();
  const company = String(data.company ?? "").trim();
  const projectStage = String(data.projectStage ?? "").trim();
  const preferredContact = String(data.preferredContact ?? "").trim();

  if (!name) return { ok: false, status: 400, error: "Name is required" };
  if (!email && !whatsapp) {
    return { ok: false, status: 400, error: "Email or WhatsApp is required" };
  }
  if (email && !EMAIL_RE.test(email)) {
    return { ok: false, status: 400, error: "Invalid email address" };
  }
  if (!projectType) {
    return { ok: false, status: 400, error: "Project type is required" };
  }
  if (!message) return { ok: false, status: 400, error: "Message is required" };

  if (data.formStartedAt) {
    const started = Number(data.formStartedAt);
    if (Number.isFinite(started) && Date.now() - started < MIN_SUBMISSION_MS) {
      return { ok: false, status: 400, error: "Please wait a moment before submitting" };
    }
  }

  return {
    ok: true,
    data: {
      name,
      email,
      whatsapp,
      company,
      projectType,
      projectStage,
      preferredContact,
      message,
    },
  };
}

/**
 * @param {ContactPayload} data
 * @returns {string}
 */
function buildHtml(data) {
  const rows = [
    ["Nama", data.name],
    ["Email", data.email || "—"],
    ["WhatsApp", data.whatsapp || "—"],
    ["Perusahaan", data.company || "—"],
    ["Jenis proyek", data.projectType],
    ["Tahap proyek", data.projectStage || "—"],
    ["Preferensi kontak", data.preferredContact || "—"],
  ];

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #DEE7E3;color:#61706A;width:160px;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #DEE7E3;color:#17201D;">${escapeHtml(String(value))}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;color:#17201D;">
      <h1 style="font-size:20px;margin:0 0 16px;">Inquiry baru — SAN Solution</h1>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #DEE7E3;border-radius:12px;">
        ${table}
      </table>
      <h2 style="font-size:16px;margin:24px 0 8px;">Pesan</h2>
      <p style="white-space:pre-wrap;line-height:1.6;background:#F7F9F8;border:1px solid #DEE7E3;border-radius:12px;padding:16px;">${escapeHtml(data.message || "")}</p>
    </div>
  `;
}

/**
 * @param {string} value
 */
function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * @param {ContactPayload} raw
 * @param {{ apiKey?: string; toEmail?: string; fromEmail?: string }} env
 */
export async function sendContactViaResend(raw, env) {
  const apiKey = env.apiKey?.trim();
  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error: "Email service is not configured. Please try WhatsApp or email instead.",
    };
  }

  const validated = validateContactPayload(raw);
  if (!validated.ok) return validated;

  const data = validated.data;
  const toEmail = (env.toEmail || "kontak@sansolution.tech").trim();
  const fromEmail =
    (env.fromEmail || "SAN Solution <kontak@sansolution.tech>").trim();

  const subject = `Inquiry SAN Solution — ${data.projectType} — ${data.name}`;

  const payload = {
    from: fromEmail,
    to: [toEmail],
    subject,
    html: buildHtml(data),
    text: [
      `Nama: ${data.name}`,
      `Email: ${data.email || "—"}`,
      `WhatsApp: ${data.whatsapp || "—"}`,
      `Perusahaan: ${data.company || "—"}`,
      `Jenis proyek: ${data.projectType}`,
      `Tahap proyek: ${data.projectStage || "—"}`,
      "",
      data.message,
    ].join("\n"),
  };

  if (data.email) {
    payload.reply_to = data.email;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let detail = "";
    try {
      const body = await response.json();
      detail = body?.message || body?.error || "";
    } catch {
      // ignore
    }
    console.error("[contact] Resend error", response.status, detail);
    return {
      ok: false,
      status: 502,
      error: "Failed to send message. Please try again or contact us via WhatsApp.",
    };
  }

  return { ok: true, status: 200 };
}

/**
 * Read JSON body from a Node IncomingMessage-like request.
 * @param {import('http').IncomingMessage} req
 */
export async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  return JSON.parse(raw);
}
