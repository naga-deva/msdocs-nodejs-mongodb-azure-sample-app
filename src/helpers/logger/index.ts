import winston, { format, createLogger } from "winston";

const customColor= 36
const customColorizer = format((info, opts) => {
  // Colorize the log level
  let levelColor;
  if (info.level === 'warn') {
    levelColor = 33; // ANSI color code for yellow
  } else if (info.level === 'error') {
    levelColor = 31; // ANSI color code for red
  } else if (info.level === 'info') {
    levelColor = 32; // ANSI color code for green
  }

  if (levelColor) {
    info.message = `\x1b[25m\x1b[${levelColor}m${info.message}\x1b[0m`;
  }

  // Colorize the entire log message
  info. level= `\x1b[1m\x1b[${customColor}m${info.level.toUpperCase()}\x1b[0m`;

  return info;
});

const options: winston.LoggerOptions = {
  format: format.combine(
    customColorizer(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.message}` +
        (info.splat !== undefined ? `${info.splat}` : " "),
    ),
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.LOGGING_LEVEL || "info",
    }),
    new winston.transports.File({
      filename: "./logs/application.log",
      maxsize: 5_242_880,
      maxFiles: 100,
      tailable: true,
      zippedArchive: true,
    }),
  ],
};

const logger = createLogger(options);

export default logger;