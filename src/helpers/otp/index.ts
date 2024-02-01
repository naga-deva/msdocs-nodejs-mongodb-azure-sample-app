import otp from "@src/models/otp";
import { ErrorMessageCode } from "@src/utilities/response";
import { Types } from "mongoose";

export async function verifyOtp(user, otpCode, otpType) {
    let otpDetails: any = await otp.find({userId: new Types.ObjectId(user._id)}).exec();
    otpDetails.forEach(item => {
        item.expiry = new Date(item.expiry);
      });
    
    otpDetails = otpDetails.filter(item => {
        const currentTime = Date.now();
        return currentTime < item.expiry && item.otpType === otpType;
    });

    if (otpDetails.length === 0) {
        throw new Error(ErrorMessageCode.InvalidOtp);
    }
      // Sort the array based on expiry in descending order
    otpDetails.sort((a, b) => b.expiry - a.expiry);
    console.log('otpDetails', otpDetails)
    const mostRecentExpiry = otpDetails[0];
      console.log('-mostres', mostRecentExpiry)

    const currentTime = Date.now();
    if (currentTime >= mostRecentExpiry.expiry) {
        throw new Error(ErrorMessageCode.OtpExpired);
        // Continue with the verification process
      }
    if(mostRecentExpiry.otp !== otpCode) {
        throw new Error(ErrorMessageCode.InvalidOtp);
    }
    return mostRecentExpiry._id
}