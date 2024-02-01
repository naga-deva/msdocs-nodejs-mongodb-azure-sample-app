import logger from "@logger";
import emailer from "./emailer";
import storage from "./s3";
import jwt from "./jwt";
import imageprocessor from "./imageprocessor";

export default {
  logger,
  storage,
  jwt,
  emailer,
  // imageprocessor,
};
