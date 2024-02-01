import express from "express";
import { AutheticationRouter } from "./auth";




export const AppRouter = express.Router();
AppRouter.use("/auth", AutheticationRouter);




