import * as Sentry from "@sentry/nextjs";
import { replayIntegration } from "@sentry/replay";

Sentry.init({
  dsn: "https://cc0ad9b4f895804201d40dce5dcd8a1d@o4507955458998272.ingest.us.sentry.io/4507955461619712",
  enabled: process.env.NODE_ENV === "production",
  integrations: [replayIntegration()],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});
