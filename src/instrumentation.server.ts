import * as Sentry from "@sentry/nextjs";
import { env } from "~~/env";

Sentry.init({
  dsn: "https://cc0ad9b4f895804201d40dce5dcd8a1d@o4507955458998272.ingest.us.sentry.io/4507955461619712",
  enabled: env.NODE_ENV === "production",
  tracesSampleRate: 1,
  debug: false,
  // onRequestError: 
});
