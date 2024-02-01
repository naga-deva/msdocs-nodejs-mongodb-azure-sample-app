// import { ErrorMessage, SuccessMessage } from "../messages";
// import { ResponseObject } from "../types";
import { MessagePattern } from "../types"; 
export enum SuccessMessageCode {
    LoginSuccess = "LOGIN_SUCCESS",
    LogoutSuccess = "LOGOUT_SUCCESS",
    SignupSuccess = "SIGNEDUP_SUCCESS",
    OtpSuccess = "OTP_SEND_SUCCESS",
    OtpVerifySuccess = "OTP_VERIFIED_SUCCESS",
    AssessmentAlreadyInprogress = "ASSESSMENT_ALREADY_INPROGRESS",
    
    FormInprogress = "FORM_INPROGRESS",  
    Success = "SUCCESS",
    FileUploadSuccess = "FILE_UPLOADED_SUCCESSFULLY"
}

export enum ErrorMessageCode {
    InvalidEmail = "INVALID_EMAIL",
    PhoneNumberAlreadyExist = "PHONE_ALREADY_EXISTS",
    EmailAlreadyExist = "EMAIL_ALREADY_EXISTS",
    UserAlreadyExist = "USER_ALREADY_EXISTS",
    AccountDoesNotExist = "ACCOUNT_DOES_NOT_EXIST",
    InvalidPostType = "POST_TYPE_INVALID",
    AccountNotVerified = "ACCOUNT_NOT_VERIFIED",
    UserIdRequired = "USER_ID_REQUIRED",
    InvalidOtp = "INVALID_OTP",
    OtpExpired = "OTP_EXPIRED",
    InvalidToken = "INVALID_TOKEN",
    TokenMising = "JWT_TOKEN_REQUIRED",
    IncorrectPassword = "INCORRECT_PASSWORD",
    SamePassword = "SAME_PASSWORD",
	PAYMENT_INTENT_CREATION_FAILED = "PAYMENT_INTENT_CREATION_FAILED",
	PAYMENT_INTENT_ALREADY_CONFIRMED = "PAYMENT_INTENT_ALREADY_CONFIRMED",

    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"

}
export const successResponse: MessagePattern[] = [
 
    {
        statusCode: 200,
        message: "Success",
        displayMessage: "Login Successfully",
        messageCode: SuccessMessageCode.LoginSuccess
    },
    {
        statusCode: 200,
        message: "Success",
        displayMessage: "Otp Sent Successfully",
        messageCode: SuccessMessageCode.OtpSuccess
    },
];



export const errorResponse: MessagePattern[] = [
    {
        statusCode: 400,
        message: ErrorMessageCode.AssessmentAlreadyInprogress,
        displayMessage: "Assessment Inprogress",
        messageCode: SuccessMessageCode.AssessmentAlreadyInprogress
    },
    {
        statusCode: 500,
        message: ErrorMessageCode.SamePassword,
        displayMessage: "Old Password and New Password are Same!",
        messageCode: SuccessMessageCode.OtpSuccess
    },
    {
        statusCode: 500,
        message: ErrorMessageCode.IncorrectPassword,
        displayMessage: "You have entered Invalid Password",
        messageCode: ErrorMessageCode.IncorrectPassword
    },
]