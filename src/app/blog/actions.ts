"use server";

import { z } from "zod";
import { env } from "~~/env";

export const subscribe = async (formData: FormData) => {
  const email = z.string().email().safeParse(formData.get("email"));
  const turnstileToken = formData.get("cf-turnstile-response");

  if (!email.success) {
    return { error: "invalid email", success: false };
  }

  if (
    typeof turnstileToken !== "string" ||
    turnstileToken.length === 0 ||
    turnstileToken.length > 2048
  ) {
    return { error: "turnstile verification failed", success: false };
  }

  const expectedHostnames = new Set(
    env.TURNSTILE_HOSTNAMES.split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );

  if (expectedHostnames.size === 0) {
    return {
      error: "turnstile verification is not configured",
      success: false,
    };
  }

  let verification: {
    success?: boolean;
    action?: string;
    hostname?: string;
  };

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        signal: AbortSignal.timeout(10_000),
        body: new URLSearchParams({
          secret: env.CF_TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      },
    );

    if (!response.ok) {
      return { error: "turnstile verification failed", success: false };
    }

    verification = await response.json();
  } catch {
    return { error: "turnstile verification failed", success: false };
  }

  if (
    !verification ||
    verification.success !== true ||
    verification.action !== "newsletter" ||
    typeof verification.hostname !== "string" ||
    !expectedHostnames.has(verification.hostname)
  ) {
    return { error: "turnstile verification failed", success: false };
  }

  const response = await fetch("https://api.useplunk.com/v1/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.PLUNK_API_KEY}`,
    },
    body: JSON.stringify({ email: email.data, event: "user-subscribed" }),
  });

  if (response.ok) {
    return { success: true };
  }

  return { error: "failed to subscribe", success: false };
};
