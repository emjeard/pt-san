import {
  createHash,
  createHmac,
  timingSafeEqual,
} from "node:crypto";

const COOKIE_NAME = "san_blog_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

const encode = (value) => Buffer.from(value).toString("base64url");
const sign = (payload, secret) =>
  createHmac("sha256", secret).update(payload).digest("base64url");

const safeEqual = (left, right) => {
  const leftBuffer = createHash("sha256").update(String(left)).digest();
  const rightBuffer = createHash("sha256").update(String(right)).digest();
  return timingSafeEqual(leftBuffer, rightBuffer);
};

export const verifyAdminPassword = (candidate, configuredPassword) => {
  if (!configuredPassword || typeof candidate !== "string") return false;
  return safeEqual(candidate, configuredPassword);
};

export const createAdminSessionCookie = (secret, secure = true) => {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = encode(JSON.stringify({ exp: expiresAt }));
  const token = `${payload}.${sign(payload, secret)}`;
  const attributes = [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${SESSION_TTL_SECONDS}`,
  ];
  if (secure) attributes.push("Secure");
  return attributes.join("; ");
};

export const clearAdminSessionCookie = (secure = true) => {
  const attributes = [
    `${COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    "Max-Age=0",
  ];
  if (secure) attributes.push("Secure");
  return attributes.join("; ");
};

export const hasValidAdminSession = (cookieHeader, secret) => {
  if (!cookieHeader || !secret) return false;

  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);

  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload, secret))) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return Number.isFinite(parsed.exp) && parsed.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};
