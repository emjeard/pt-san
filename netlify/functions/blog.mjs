import { handleBlogApiRequest } from "../../server/blogApi.mjs";

export const handler = async (event) => {
  const headers = Object.fromEntries(
    Object.entries(event.headers || {}).map(([key, value]) => [key.toLowerCase(), value || ""]),
  );
  const result = await handleBlogApiRequest({
    method: event.httpMethod,
    url: event.rawUrl || `https://${headers.host || "localhost"}${event.path || "/"}`,
    headers,
    body: event.body,
    env: process.env,
  });

  return {
    statusCode: result.status,
    headers: result.headers,
    body: result.body,
  };
};

