import { Request, Response, NextFunction } from "express";
import users from "@src/models/users";
import { ErrorMessageCode, SuccessMessageCode, utilities, } from "@src/utilities";
import bcrypt from "bcrypt";
import { generateAuthToken } from "@src/utilities/common";
import { OtpTypeEnum, UserStatusEnum } from "@src/models/types";
import { mailer } from "@src/helpers/emailer";
import otp from "@src/models/otp";

const Login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password } = req.body;

        // if (!(await utilities.isValidEmail(email)))
        //     throw new Error(ErrorMessageCode.InvalidEmail);

        const userexists = await users.findOne({ 
        $and: [
            {status: { $nin: [UserStatusEnum.DELETE] }, isVerified: true},
            {$or: [ { email }, { userName: email } ]}
        ]
        });
        if (!userexists) {
            throw new Error(ErrorMessageCode.AccountDoesNotExist);
        }

        const [isValid, { token, refreshToken }] = await Promise.all([
            bcrypt.compare(password, userexists.password),
            generateAuthToken(userexists)
        ]);

        if(!userexists.isVerified) {
            throw new Error(ErrorMessageCode.AccountNotVerified);
        }

        if (!isValid) throw new Error(ErrorMessageCode.IncorrectPassword);
        let otpObj = {
            otp: Math.floor(100000 + Math.random() * 900000).toString(),
            userId: userexists._id,
            otpType: OtpTypeEnum.LOGIN,
            expiry: Date.now() + 120000, // OTP valid for 2 minutes,
            otpVerified: false
        }
        await otp.create(otpObj)
        await mailer(userexists.email, userexists.userName, otpObj.otp).catch(console.error);
        return res.json({
            statusCode: 200,
            success: true,
            messageCode: SuccessMessageCode.LoginSuccess,
            displayMessage: "Logged in Successfully",
            payload: {
                id: userexists._id,
                token,
                refreshToken,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default Login;
