import { v4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { ErrorMessageCode, SuccessMessageCode, utilities } from "@src/utilities";
import helpers from "@src/helpers";
import { generateAuthToken } from "@src/utilities/common";
import users from "@src/models/users";
import { OtpTypeEnum, UserStatusEnum } from "@src/models/types";
import bcrypt from "bcrypt";
import otp from "@src/models/otp";
import { Types } from "mongoose";
import { verifyOtp } from "@src/helpers/otp";

const logger = helpers.logger;

const VerifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const {email, otpCode, otpType} = req.body
        const user = await users.findOne({email, 
            status: { $nin: [UserStatusEnum.DELETE] }})
        if(!user) {
                throw new Error(ErrorMessageCode.AccountDoesNotExist);
        }
        console.log('user',user)

        const mostRecentExpiry = await verifyOtp(user, otpCode, otpType)
        if(otpType === OtpTypeEnum.REGISTER) {
            await users.updateOne( { _id: user._id },
                { isVerified: true })
        }
        await otp.updateOne( { _id: mostRecentExpiry._id },
            { otpVerified: true })
          // await user.save()
        const {token, refreshToken} = await generateAuthToken(user)

        return res.json({
            statusCode: 200,
            success: true,
            messageCode: SuccessMessageCode.OtpVerifySuccess,
            displayMessage: "OTP Verified Successfully",
            payload: {
                id: user._id,
                token,
                refreshToken
            }
        }); 
    } catch (err) {
        next(err);
    }
};

export default VerifyOtp;
