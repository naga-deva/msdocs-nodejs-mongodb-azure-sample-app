/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express from "express";
import compression from "compression";
import path from "path";
import http from "http";
import timeout from "connect-timeout";

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.prod' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './.env.test' });
} else {
  console.log('dev....')
  dotenv.config({ path: './.env.dev' });
}

import morganLogger  from '@src/helpers/morgan'; 
import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
// dotenv.config({ path: "./libconfig.env" });

//Middlewares
import {middlewaresCors,expressResponseHandler,expressErrorHandler} from "@middlewares";

import swaggerUi from "swagger-ui-express";
import appSwaggerDocument from "@src/docs/swagger-app.json";
import "@src/docs/swagger.json";

//Routes
import ApiRouter from "@src/controllers";

//Models
import "@models";

//Helpers
import { successResponse, errorResponse } from "@src/utilities";
import helpers from "@src/helpers";
import {logObject} from "@src/utilities/common";
import connectDB from "./database";

//Importing Database(DB)
// import "@src/database";
connectDB()

export const app = express();


console.log(process.env.PORT)
console.log(process.env.DATABASE_CONNECTION_STRING)
const port = process.env.PORT || 3000;

// Express configuration
app.set("port", port);
app.use(middlewaresCors());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

// debug Error Api
app.use((req, res:any, next) => {
  const oldSend = res.send;

  // Override the res.send function to log the response body
  res.send = function (dataComing) {
    // Log the response body
    if (dataComing) {

      // Check if the content is valid JSON
      let data;
      try {
        data = JSON.parse(dataComing);
      } catch (error) {
        // If parsing fails, it might not be JSON
        console.log("Non-JSON content received");
        data = { error: true, additionalInfo: dataComing };
      }

      // Remove the payload property
      if (data && data.payload) {
        delete data.payload;
      }

      // Log the error details for 500 status code
      if (data.statusCode !== 200 && res.statusCode !== 200 ) {
        const line = '_'.repeat(100);
        console.log(line);
        console.log("\x1b[31m");
        logObject(data);
        console.log("\x1b[36m");
        console.log(' ǁ\n ǁ');
        console.log(" =======> For THIS API :\x1b[32m"); 
      }
    }

    // Call the original res.send function
    oldSend.apply(res, arguments);
  };

  next();
});

const options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: "/app/swagger.json",
        name: "Mobile App",
      },
      {
        url: "/hub/swagger.json",
        name: "base Hub",
      },
    ],
  },
};

app.use(morganLogger);
app.use(
  "/public",
  express.static(path.join(__dirname, "..", "public"), {
    maxAge: 31557600000,
  })
);

// app.get("/hub/swagger.json", (req, res) => {
//   // res.sendFile(path.join(__dirname, "./docs/swagger-hub.json"));
//   res.json(hubSwaggerDocument);
// });
app.get("/app/swagger.json", (req, res) => {
  // res.sendFile(path.join(__dirname, "./docs/swagger-hub.json"));
  res.json(appSwaggerDocument);
});
app.get("/app/asyncdocs.yaml", (req, res) => {
  res.sendFile(path.join(__dirname, "./../src/docs/asyncapi.yaml"));
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(appSwaggerDocument, options)
);

app.use(expressResponseHandler(successResponse, errorResponse));
app.use(timeout("40s"));
// app.use(middlewares.OpenApiValidator({ filePath: path.join(__dirname, "./docs/swagger.json") }));
app.use("/api", ApiRouter);
app.get("/app/asyncdocs.yaml", (req, res) => {

  res.sendFile(path.join(__dirname, "./../src/docs/asyncapi.yaml"));

});


app.use(expressErrorHandler());

export const server: any = http.createServer(app);



// io.use(middlewares.socketPayloadHandler(successResponse, errorResponse));
// io.use(middlewares.socketPayloadValidator(path.join(__dirname, "./../src/docs/asyncapi.yaml")));
//io.use(middlewares.cors());


// const Redisoptions = {
//   sentinels: [
//     { host: process.env.SENTINEL_HOST, port: Number(process.env.SENTINEL_PORT) },
//     { host: process.env.SENTINEL_HOST1, port: Number(process.env.SENTINEL_PORT1) },
//     { host: process.env.SENTINEL_HOST2, port: Number(process.env.SENTINEL_PORT2) }
//   ],
//   name: process.env.SENTINEL_NAME,
//   password: process.env.SENTINEL_PASSWORD,
//   sentinelPassword: process.env.SENTINEL_PASSWORD
// };


//const pubClient = new Redis("redis://:K2rX17Jww9wN@192.168.128.32:26380/mymaster");

// const pubClient = new Redis(Redisoptions);
// const subClient = pubClient.duplicate();

// io.adapter(createAdapter(pubClient, subClient));

// pubClient.on("error", (err) => {
// });

// pubClient.on("connect", (err) => {
//   console.log('Connected Successfully on Redis');
// });

// pubClient.on("ready", (err) => {
//   console.log('Redis is ready to use');
// });

// subClient.on("error", (err) => {
//   console.log('Error on subclient', err, err.message);
// });


// export const pubClient = createClient({ 
//   url: `redis://${process.env.REDISHOST}`, 
//   password: process.env.REDISPASSWORD });
// export const subClient = pubClient.duplicate();

// Promise.all([pubClient.connect(), subClient.connect()]).then(()=> {
//   console.log("PUB and SUB connected for Pod Sync")
//   io.adapter(createAdapter(pubClient, subClient));
// }).catch(function(err) {
//   console.log('Error connecting redis', err); // some coding error in handling happened
// });

// const onConnection = async (socket: Socket) => {
//   console.log('Socket Headers', socket.handshake.headers);
//   console.log('Socket Accessparams',socket.handshake.auth.accessParams);
//   createAccountSocketData(socket.handshake.auth.accessParams.accountId, socket.id, socket.handshake.auth.accessParams.appId, socket.handshake.headers.deviceid);
//   logger.info(socket.handshake);
//   socketAppController(io, socket);

//   socket.on("disconnect", (reason) => {
//     console.log('Time', new Date());
//     console.log("Socket Disconnected due to ", reason, socket.id, socket.handshake?.auth?.accessParams?.accountId)
//     console.log('Socket Disconnect',socket.handshake.headers);
//     updateAccountSocketData(socket.handshake.auth.accessParams.accountId, socket.id,"INACTIVE", socket.handshake.auth.accessParams.appId, socket.handshake.headers.deviceid);
//   });

//   socket.on("reconnect", (reason) => {
//     console.log('Time', new Date());
//     console.log("Socket reconnect due to ", reason, socket.id, socket.handshake?.auth?.accessParams?.accountId)
//   });
// };
// io.on("consnection", onConnection);


