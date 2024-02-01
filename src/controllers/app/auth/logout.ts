import { v4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { ErrorMessageCode, SuccessMessageCode, utilities } from "@src/utilities";
import bcrypt from "bcrypt";
import helpers from "@src/helpers";
import users from "@src/models/users";

const logger = helpers.logger;

const Logout = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const token = req.header("authorization")
        const user = req.header["userInfo"]
        let tokens1 = user.tokens.filter((x) => {
            return x.token !== token
        })
        await users.updateOne({_id: user._id}, { tokens: tokens1 })

        return res.json({
            statusCode: 200,
            success: true,
            messageCode: SuccessMessageCode.LogoutSuccess,
            displayMessage: "Logged Out Successfully"
        }); 
    } catch (err) {
        next(err);
    }
};

export default Logout;
