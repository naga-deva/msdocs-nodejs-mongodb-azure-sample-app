import express, { Router } from "express";

import GetOptions from "./getlanguagescoreoptions";
import GetuserRoles from "./getuserRoles";

export const UtilsRouter: Router = express.Router();

UtilsRouter.get("/getlanguagescoreoptions/:questionId/:testname", GetOptions);
UtilsRouter.get("/getuserroles", GetuserRoles);
