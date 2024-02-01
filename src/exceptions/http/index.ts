export enum httpStatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  ACCESS_DENIED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

class BaseError extends Error {
  statusCode: httpStatusCodes;
  error:boolean;
  constructor(name: string, statusCode: httpStatusCodes, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.error = true;
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends BaseError {
  error: boolean;
  constructor(
    message: string,
    name = "NOT_FOUND",
    statusCode = httpStatusCodes.NOT_FOUND,
    ) {
      super(name, statusCode, message);
      this.error = true;
  }
}

export class InternalServertError extends BaseError {
  constructor(
    message: string,
    name = "INTERNAL_SERVER_ERROR",
    statusCode = httpStatusCodes.INTERNAL_SERVER
  ) {
    super(name, statusCode, message);
    this.error = true;
  }
}

export class ForbiddenError extends BaseError {
  constructor(
    message: string,
    name = "FORBIDDEN",
    statusCode = httpStatusCodes.FORBIDDEN
  ) {
    super(name, statusCode, message);
    this.error = true;
  }
}

export class BadRequestError extends BaseError {
  constructor(
    message: string,
    name = "INVALID_REQUEST",
    statusCode = httpStatusCodes.BAD_REQUEST
  ) {
    super(name, statusCode, message);
    this.error = true;
  }
}
export class AccessError extends BaseError {
  constructor(
    message: string,
    name = "ACCESS_DENIED",
    statusCode = httpStatusCodes.ACCESS_DENIED
  ) {
    super(name, statusCode, message);
    this.error = true;
  }
}





