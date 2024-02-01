import { Request, Response, NextFunction } from "express";
import { ErrorMessageCode, SuccessMessageCode, utilities } from "@src/utilities";
import helpers from "@src/helpers";
import users from "@src/models/users";


const logger = helpers.logger;

const generateOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        // const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        // Set the OTP code and expiry
        const user = req.header["userInfo"]
        const otp = {
            code: 12345,
            expiry: Date.now() + 120000, // OTP valid for 2 minutes
          };
      
          await users.updateOne({ _id: user._id }, { $set: { otp: otp } }).exec();

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

export default generateOtp;
