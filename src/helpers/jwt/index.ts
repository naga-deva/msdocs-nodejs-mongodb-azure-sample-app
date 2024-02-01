import jwt from "jsonwebtoken";

type payload = string | jwt.JwtPayload;

export const generateJwt = (payload : payload, secret: string) : string => {
    const expiresIn = (process.env.JWT_EXPIRE_TIME) ? process.env.JWT_EXPIRE_TIME : "30d"
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
};

export const generateRefreshToken = (payload : payload, secret: string) : string => {
    const expiresIn = (process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME) ? process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME : "60d"
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
};

export const validateJwt = (token : string, secret: string) : payload => {
    const decoded = jwt.verify(token, secret);
    return decoded;
};

export enum ErrorTypes  {
    TOKEN_EXPIRED_ERROR="TokenExpiredError",
    JSON_WEB_TOKEN_ERROR="JsonWebTokenError"
}
export default {generateJwt, generateRefreshToken, validateJwt, ErrorTypes};