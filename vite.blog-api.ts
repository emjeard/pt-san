import type { IncomingMessage } from "node:http";
import { loadEnv } from "vite";
import { handleBlogApiRequest } from "./server/blogApi.mjs";

const readBody = async (request: IncomingMessage) => {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > 1_000_000) throw new Error("Request body is too large");
    chunks.push(buffer);
  }
  return Buffer.concat(chunks).toString("utf8");
};

export function blogApiPlugin() {
  return {
    name: "san-blog-api",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.split("?")[0].startsWith("/api/blog")) {
          next();
          return;
        }

        try {
          const headers = Object.fromEntries(
            Object.entries(req.headers).map(([key, value]) => [
              key.toLowerCase(),
              Array.isArray(value) ? value.join(", ") : value || "",
            ]),
          );
          const body = ["POST", "PUT", "PATCH"].includes(req.method || "")
            ? await readBody(req)
            : undefined;
          const result = await handleBlogApiRequest({
            method: req.method,
            url: `http://${req.headers.host || "localhost"}${req.url}`,
            headers,
            body,
            env: { ...process.env, ...env },
          });

          res.statusCode = result.status;
          for (const [key, value] of Object.entries(result.headers)) {
            res.setHeader(key, value as string);
          }
          res.end(result.body);
        } catch (error) {
          console.error("[vite-blog-api]", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Terjadi kesalahan pada layanan blog." }));
        }
      });
    },
  };
}

