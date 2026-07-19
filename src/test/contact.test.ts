import { describe, it, expect, beforeEach, vi } from "vitest";
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
    vi.unstubAllEnvs();
  });

  it("reports when endpoint is not configured", () => {
    expect(isContactFormConfigured()).toBe(false);
  });

  it("throws a clear error when endpoint is missing", async () => {
    await expect(
      submitContactForm({
        name: "Ayu",
        email: "ayu@example.com",
        projectType: "Website",
        message: "Hello",
        formStartedAt: Date.now() - 5000,
      }),
    ).rejects.toThrow(/not configured/i);
  });
});
