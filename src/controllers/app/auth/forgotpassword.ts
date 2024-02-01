import { Request, Response, NextFunction } from "express";
import users from "@src/models/users";
import { ErrorMessageCode, SuccessMessageCode } from "@src/utilities";
import { mailer } from "@src/helpers/emailer";
import { OtpTypeEnum } from "@src/models/types";
import otp from "@src/models/otp";

const ForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email } = req.body;

    // Check Account Exist
    const user = await users.findOne({
      email,
    });
    if (!user) throw new Error(ErrorMessageCode.AccountDoesNotExist);

    // email content here
    let otpObj = {
      otp: Math.floor(100000 + Math.random() * 900000).toString(),
      userId: user._id,
      otpType: OtpTypeEnum.FORGOT_PASSWORD,
      expiry: Date.now() + 120000, // OTP valid for 2 minutes,
      otpVerified: false
  }
    await otp.create(otpObj)
    await mailer(email, user.userName, otpObj.otp).catch(console.error);

    // await sendMailForForgotPassword(email, otpCode);

    //generate jwt payload
    return res.json({
      statusCode: 200,
      success: true,
      messageCode: SuccessMessageCode.Success,
      displayMessage: "Reset Password OTP Verification Sent Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default ForgotPassword;
