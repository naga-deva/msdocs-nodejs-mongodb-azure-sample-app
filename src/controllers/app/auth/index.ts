import express, { Router } from "express";
import validateJwt from "@src/middlewares/validatejwt";

import Signup from "./signup";
import Login from "./login";
import Logout from "./logout";
import ChangePassword from "./changepassword";
import AddRole from "./addrole";
import VerifyOtp from "./verifyotp";
import generateOtp from "./generateotp";
import ForgotPassword from "./forgotpassword";
import ResetPassword from "./resetpassword";


export const AutheticationRouter: Router = express.Router();

AutheticationRouter.post("/signup", Signup);
AutheticationRouter.post("/login", Login);
AutheticationRouter.get("/logout", validateJwt, Logout);
AutheticationRouter.post("/changepassword", validateJwt, ChangePassword);
AutheticationRouter.post("/forgotpassword",  ForgotPassword);
AutheticationRouter.post("/addrole", AddRole);
AutheticationRouter.post("/verifyOtp", VerifyOtp);
AutheticationRouter.post("/generateotp", generateOtp);
AutheticationRouter.post("/resetpassword", ResetPassword);





