/**
 * Vite middleware that handles POST /api/contact in local development
 * using Resend (same logic as the Netlify Function).
 */
import { loadEnv } from "vite";
import {
  readJsonBody,
  sendContactViaResend,
} from "./server/contactMail.mjs";

export function contactApiPlugin() {
  return {
    name: "san-contact-api",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/api/contact") {
          next();
          return;
        }

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        try {
          const body = await readJsonBody(req);
          const result = await sendContactViaResend(body, {
            apiKey: env.RESEND_API_KEY || process.env.RESEND_API_KEY,
            toEmail:
              env.CONTACT_TO_EMAIL ||
              process.env.CONTACT_TO_EMAIL ||
              "kontak@sansolution.tech",
            fromEmail:
              env.RESEND_FROM_EMAIL ||
              process.env.RESEND_FROM_EMAIL ||
              "SAN Solution <kontak@sansolution.tech>",
          });

          res.statusCode = result.status || (result.ok ? 200 : 500);
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify(
              result.ok ? { ok: true } : { error: result.error || "Request failed" },
            ),
          );
        } catch (error) {
          console.error("[contact-api]", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Unexpected server error" }));
        }
      });
    },
  };
}
