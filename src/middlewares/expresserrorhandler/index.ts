import { Response, Request, NextFunction, ErrorRequestHandler  } from "express";

export type ErrorResponse = {
  reqId?: string;
  statusCode: number;
  category?: string;
  code?: number | string;
  name?: string;
  message?: string;
  error?: boolean;
  additionalInfo?: string | string[];
};

export const expressErrorHandler = () : ErrorRequestHandler  => {
 return (err: any, req: Request, res: Response, next: NextFunction): any => {
    const errorResponse: ErrorResponse = {
      statusCode: err && err.statusCode || err.name === "Bad Request" ? 400 : 500,
      name: err.name || "Invalid request",
      message: err ? err.message : "Something went wrong!",
      error: true,
      additionalInfo : err ? err.message : []
    };
    return res.status(err.statusCode || 500).json(errorResponse);
  };
};

export default expressErrorHandler;
