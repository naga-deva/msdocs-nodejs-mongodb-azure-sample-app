import express from "express";
import { AppRouter } from "./app";
const ApiRouter = express.Router();

ApiRouter.use("/app", AppRouter);
export default ApiRouter;
