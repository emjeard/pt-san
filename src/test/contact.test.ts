import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  validateContactForm,
  isContactFormConfigured,
  submitContactForm,
} from "@/lib/contact";

describe("contact form validation", () => {
  it("requires name, contact method, project type, and message", () => {
    const result = validateContactForm({
      name: "",
      email: "",
      projectType: "",
      message: "",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeTruthy();
    expect(result.errors.email).toBeTruthy();
    expect(result.errors.projectType).toBeTruthy();
    expect(result.errors.message).toBeTruthy();
  });

  it("accepts WhatsApp without email", () => {
    const result = validateContactForm({
      name: "Ayu",
      email: "",
      whatsapp: "08123456789",
      projectType: "Mobile App",
      message: "Need consultation",
      formStartedAt: Date.now() - 5000,
    });
    expect(result.valid).toBe(true);
  });

  it("rejects honeypot fills", () => {
    const result = validateContactForm({
      name: "Ayu",
      email: "ayu@example.com",
      projectType: "Website",
      message: "Hello",
      website: "http://spam.test",
      formStartedAt: Date.now() - 5000,
    });
    expect(result.valid).toBe(false);
  });

  it("rejects submissions that are too fast", () => {
    const result = validateContactForm({
      name: "Ayu",
      email: "ayu@example.com",
      projectType: "Website",
      message: "Hello",
      formStartedAt: Date.now(),
    });
    expect(result.valid).toBe(false);
  });
});

describe("contact form submission", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses the default /api/contact endpoint", () => {
    expect(isContactFormConfigured()).toBe(true);
  });

  it("shows success only after a successful response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );

    await expect(
      submitContactForm({
        name: "Ayu",
        email: "ayu@example.com",
        projectType: "Website",
        message: "Hello",
        formStartedAt: Date.now() - 5000,
      }),
    ).resolves.toEqual({ ok: true });

    expect(fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("preserves a useful error when the API fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        json: async () => ({
          error: "Failed to send message. Please try again or contact us via WhatsApp.",
        }),
      }),
    );

    await expect(
      submitContactForm({
        name: "Ayu",
        email: "ayu@example.com",
        projectType: "Website",
        message: "Hello",
        formStartedAt: Date.now() - 5000,
      }),
    ).rejects.toThrow(/Failed to send message/i);
  });
});
