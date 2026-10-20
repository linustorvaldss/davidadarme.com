/* @ts-check */

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
await import("./src/env.js");

import { withSentryConfig } from "@sentry/nextjs/config";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  transpilePackages: ["next-mdx-remote"],

  env: {
    NEXT_PUBLIC_CF_R2_BUCKET_URL:
      process.env.NEXT_PUBLIC_CF_R2_BUCKET_URL,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_CF_R2_BUCKET_URL ?? "",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

const sentryConfig = {
  org: "david-0e",
  project: "davidadarme",
  url: "https://sentry.io/",

  // Only print logs for uploading source maps in CI.
  silent: !process.env.CI,

  // Upload more source maps for better stack traces.
  widenClientFileUpload: true,

  // Annotate React components in breadcrumbs and session replay.
  reactComponentAnnotation: {
    enabled: true,
  },

  // Hide source maps from generated client bundles.
  hideSourceMaps: true,

  // Remove Sentry logger statements from bundles.
  disableLogger: true,

  // Automatically instrument Vercel Cron Monitors.
  automaticVercelMonitors: true,
};

export default withSentryConfig(config, sentryConfig);