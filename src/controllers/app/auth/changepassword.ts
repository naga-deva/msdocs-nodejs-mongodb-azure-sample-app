import { Request, Response, NextFunction } from "express";
import users from "@src/models/users";
import { ErrorMessageCode, SuccessMessageCode } from "@src/utilities";
import bcrypt from "bcrypt";

const ChangePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userinfo = req.header["userInfo"];

        // Check Account Exist
        const user = await users.findById({
            _id: userinfo._id,
        });
        if (!user) throw new Error(ErrorMessageCode.AccountDoesNotExist);

        const isValid = await bcrypt.compare(oldPassword, user.password);
        if (!isValid) throw new Error(ErrorMessageCode.IncorrectPassword);
        

        if (oldPassword === newPassword) {
            throw new Error(ErrorMessageCode.SamePassword);
        }
        const hashedPassword = await bcrypt.hash(
            newPassword,
            parseInt(process.env.BCRYPT_SALT_ROUNDS)
        );
        await users
            .updateOne(
                {
                    _id: userinfo._id,
                },
                { password: hashedPassword }
            )
            .exec();
        //generate jwt payload
        return res.json({
            statusCode: 200,
            success: true,
            messageCode: SuccessMessageCode.Success,
            displayMessage: "Password changed Successfully",
        });
    } catch (err) {
        next(err);
    }
};

export default ChangePassword;
