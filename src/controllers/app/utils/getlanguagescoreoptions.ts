import helpers from "@src/helpers";
import { v4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import users from "@src/models/users";
import { ErrorMessageCode, SuccessMessageCode, utilities } from "@src/utilities";
import { Getoptions } from "@src/service/options";

const logger = helpers.logger;

const GetOptions = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const questionId = req.params.questionId
        const testname = req.params.testname
        let obj = await Getoptions(questionId, testname)
        return res.json({
            statusCode: 200,
            success: true,
            messageCode: SuccessMessageCode.Success,
            displayMessage: "Success!",
            payload: obj
        }); 
    } catch (err) {
        next(err);
    }
};

export default GetOptions;