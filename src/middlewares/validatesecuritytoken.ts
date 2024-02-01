import {  NextFunction, ErrorRequestHandler  } from "express";
import { Request } from '../../src/types'
import  Response from '../middlewares/expresspayloadhandler'
import { ErrorMessageCode } from "../utilities";



const validateWebhook = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try{
        if(!req.header("webhooktoken")) {
            // return res.sendErrorMessage(ErrorMessageCode.MissingWebhookToken)
        } 
        const token = req.header("webhooktoken")
        const security_token = 'dkdjf@SECURITYTOKEN&&4352';
        if (token !== security_token) {
                // return res.sendErrorMessage(ErrorMessageCode.InvalidSecurityToken)

        }
        // const verify: any = await helpers.jwt.validateJwt(token, process.env.JWT_SECRET)
        // req.header["webhookinfo"] = verify;
        // console.log('--> verify', verify)
        // const isUserExists = await userAccountsService.findByUserAccountWithApp("accountId", verify.accountId, verify.appId)
        // console.log('isUserExists', isUserExists)
        // if(isUserExists.length){
        //     if(verify) {
        //         const UserData = await userAccountsService.findToken(token);
        //         if(UserData) {
        //         return res.sendErrorMessage(ErrorMessageCode.TokenExpired)
        //         }
        // }
        // } else {
        //     return res.sendErrorMessage(ErrorMessageCode.TokenExpired)
        // }
        next(); 

    } catch(err) {
        next(err);
    }
  
};


export default validateWebhook;
