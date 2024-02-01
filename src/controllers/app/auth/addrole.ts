import { Request, Response, NextFunction } from "express";
import users from "@src/models/users";
import { ErrorMessageCode, SuccessMessageCode } from "@src/utilities";
import bcrypt from "bcrypt";
import userroles from "@src/models/userroles";

const AddRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {

        await userroles.create(req.body);

        //generate jwt payload
        return res.json({
            statusCode: 200,
            success: true,
            messageCode: SuccessMessageCode.Success,
            displayMessage: "Role Added Successfully",
        });
    } catch (err) {
        next(err);
    }
};

export default AddRole;
