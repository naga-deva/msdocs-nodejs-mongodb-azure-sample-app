import { v4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { ErrorMessageCode, SuccessMessageCode, utilities } from "@src/utilities";
import helpers from "@src/helpers";
import { generateAuthToken } from "@src/utilities/common";
import users from "@src/models/users";
import { UserStatusEnum } from "@src/models/types";
import bcrypt from "bcrypt";
import { verifyOtp } from "@src/helpers/otp";
import otp from "@src/models/otp";

const logger = helpers.logger;

const ResetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const {password, email, otpCode, otpType} = req.body;
        // const userdetails = req.header["userInfo"]
        const user = await users.findOne({email: email, 
            status: { $nin: [UserStatusEnum.DELETE] }})
        if(!user) {
                throw new Error(ErrorMessageCode.AccountDoesNotExist);
            }
        const mostRecentExpiry = await verifyOtp(user, otpCode, otpType)
        await otp.updateOne( { _id: mostRecentExpiry._id },
            { otpVerified: true })
        const hashedPassword = await bcrypt.hash(
                password,
                parseInt(process.env.BCRYPT_SALT_ROUNDS)
            );
        await users.updateOne( { _id: user._id },
            { password: hashedPassword })
          // await user.save()

        return res.json({
            statusCode: 200,
            success: true,
            messageCode: SuccessMessageCode.LoginSuccess,
            displayMessage: "Password Reset Successfully",
            payload: {
            }
        }); 
    } catch (err) {
        next(err);
    }
};

export default ResetPassword;
