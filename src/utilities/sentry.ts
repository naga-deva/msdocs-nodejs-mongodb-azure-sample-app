import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_CONFIG,
  tracesSampleRate: 1.0,
  environment: process.env.SENTRY_ENV
});

export default Sentry;