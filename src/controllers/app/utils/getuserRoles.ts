import helpers from "@src/helpers";
import { v4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import users from "@src/models/users";
import { ErrorMessageCode, SuccessMessageCode, utilities } from "@src/utilities";
import assessment from "@src/models/assessment";
import useranswers from "@src/models/useranswers";
import cleanDeep from "clean-deep";
import userroles from "@src/models/userroles";

const logger = helpers.logger;

const GetuserRoles = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {

        const data = await userroles.find().exec()
        return res.json({
            statusCode: 200,
            success: true,
            message: SuccessMessageCode.Success,
            displayMessage: "Retrieved Successfully",
            payload: data
        }); 
    } catch (err) {
        next(err);
    }
};

export default GetuserRoles;