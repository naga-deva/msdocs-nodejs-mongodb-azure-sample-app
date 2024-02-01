import dotenv from "dotenv";
require('dotenv').config();
// app.js or server.js
// if (process.env.NODE_ENV !== 'production') {
//   console.log('dev')
//   dotenv.config({ path: './dev.env' });
// }
// dotenv.config({ path: "./.env" });
import { server, app } from "@src/app";
import helpers  from "@src/helpers";




// if (process.env.NODE_ENV !== 'production') {
// 	console.log('dev')
// 	dotenv.config({ path: './.env.dev' });
//   console.log(process.env.DATABASE_CONNECTION_STRING)
//   }

const logger = helpers.logger;

// database.authenticate().then(() => logger.info("SQL DB connected")).catch((err) => logger.error(err.message));
// cassandraClient.connect().then(() => logger.info("NOSQL DB connected")).catch((err) => logger.error(err.message));
import {
  Request,
  NextFunction,
  Response,
  MessagePattern } from "@express-types";
server.listen(app.get("port"), () => {
  logger.info(
    `Server is running at http://${process.env.HOST || "localhost"}:${app.get(
      "port"
    )} in ${app.get("env")} mode`
  );
  logger.info("Press CTRL+C to stop\n");
});
server.on("close", () => {
  logger.info("Server Closed Successfully");
});

process.on("SIGINT", () => {
  // database.close();
  process.exit(0);
});

