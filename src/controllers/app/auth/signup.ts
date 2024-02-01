import { Request, Response, NextFunction } from "express";
import users from "@src/models/users";
import { ErrorMessageCode, SuccessMessageCode, utilities, } from "@src/utilities";
import { OtpTypeEnum, UserStatusEnum } from "@src/models/types";
import bcrypt from "bcrypt";
import userroles from "@src/models/userroles";
import otp from "@src/models/otp";
import { mailer } from "@src/helpers/emailer";

const Signup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { email, password } = req.body;


        // Validate Email Id
        if (!(await utilities.isValidEmail(email)))
            throw new Error(ErrorMessageCode.InvalidEmail);

        if(!req.body.roleName) {
            throw new Error('Role Name required')
        }

        // Check Email Is Exists
        const emailExists = await users.findOne({ email, status: { $nin: [UserStatusEnum.DELETE] }});

        if (emailExists && (emailExists.isVerified==true)) {
            throw new Error(ErrorMessageCode.EmailAlreadyExist);
        } else if(emailExists && (emailExists.isVerified==false)) {
            console.log('--> dupica')
            await users.updateOne( { _id: emailExists._id },
                { $set: req.body })
            return await returnObj(emailExists, res)
        }

        const phoneExists = await users.findOne({phoneNumber: req.body.phoneNumber, status: { $nin: [UserStatusEnum.DELETE] }});

        if (phoneExists && (phoneExists.isVerified==true)) {
            throw new Error(ErrorMessageCode.PhoneNumberAlreadyExist);
        } else if(phoneExists && (phoneExists.isVerified==false)) {
            await users.updateOne( { phoneNumber: req.body.phoneNumber },
                { $set: req.body })
            return await returnObj(phoneExists, res)
        }

        // role 
        const roleDetails = await userroles.findOne({name: req.body.roleName });


        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.BCRYPT_SALT_ROUNDS)
        );
        req.body.roleId= roleDetails._id
        req.body.password = hashedPassword;
        
      
        // Set the OTP code and expiry
        // req.body.otp = {
        //   code: 12345,
        //   expiry: Date.now() + 120000, // OTP valid for 2 minutes
        // };
    
        // await users.updateOne({ email }, { $set: { otp: otpDetails } }).exec();
        req.body.isVerified = false
        let returnresult = await users.create(req.body);
        console.log('-returnresult', returnresult)
        await returnObj(returnresult, res)

    } catch (err) {
        next(err);
    }
};

export default Signup;


async function returnObj(returnresult, res) {
    let otpObj = {
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
        userId: returnresult._id,
        otpType: OtpTypeEnum.REGISTER,
        expiry: Date.now() + 120000, // OTP valid for 2 minutes,
        otpVerified: false
    }
    await otp.create(otpObj)
    await mailer(returnresult.email, returnresult.userName, otpObj.otp).catch(console.error);
    return res.json({
        statusCode: 200,
        success: true,
        messageCode: SuccessMessageCode.SignupSuccess,
        displayMessage: "Signed up Successfully",
        payload: {},
    });
}
