import { Request, Response, NextFunction } from "express";
import { ErrorMessageCode } from "@src/utilities";
import helpers from "@src/helpers";
import users from "@src/models/users";

const validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        if (!req.header("authorization")) {
            throw new Error(ErrorMessageCode.TokenMising);
        }
        const token = req.header("authorization");
        const verify: any = await helpers.jwt.validateJwt(
            token,
            process.env.JWT_SECRET
        );
        const isUserExists = await users.findOne({
            _id: verify.userId,
            "tokens.token": token,
        });
        req.header["userInfo"] = isUserExists;
        if (!isUserExists) {
            throw new Error(ErrorMessageCode.InvalidToken);
        }
        next();
    } catch (err) {
        next(err);
    }
};

export default validateJwt;
