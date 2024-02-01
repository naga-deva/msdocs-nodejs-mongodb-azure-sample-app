import { Request, Response, NextFunction, MessagePattern } from "../../types";

export default (successMessages: MessagePattern[], errorMessages: MessagePattern[]) :  any => {

    const sm = {};
    successMessages.forEach(s => {
        sm[s.messageCode] = { ...s };
    });

    const em = {};
    errorMessages.forEach(e => {
        em[e.messageCode] = { ...e };
    });

  return (req: Request, res: Response, next: NextFunction) => {
    res.sendSuccessMessage = (messageCode: string, payload? : any) => {
        res.status(sm[messageCode]["statusCode"]).json({
            ...sm[messageCode],
            payload, 
            error: false,
            error_payload: null
        });
    };

    res.sendErrorMessage = (messageCode: string, error_payload? : any) => {
        res.status(em[messageCode]["statusCode"]).json({
            ...em[messageCode],
            payload:null,
            error: true,
            error_payload
        });
    };

    next();
  };
};
