export { Request, NextFunction} from "express";
import { Response as ExpressResponse } from "express";




export interface Response extends ExpressResponse {
    sendErrorMessage : (messageCode: string, error_payload ?: any) => void
    sendSuccessMessage : (messageCode: string, payload ?: any) => void
}

type namespace  = string;
export interface MessagePattern {
    statusCode: number;
    message?: string;
    displayMessage: string;
    payload?: any;
    messageCode: namespace;
}

