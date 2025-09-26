export enum ApplicationErrorEnum {
  NOT_FOUND = "NOT_FOUND",
  REQUIRED_FIELDS = "REQUIRED_FIELDS",
  FORBIDDEN = "FORBIDDEN",
}

export class ApplicationException extends Error {
  genericTypeError: ApplicationErrorEnum;
  stack?: string;
  statusCode: Record<ApplicationErrorEnum, number> = {
    [ApplicationErrorEnum.NOT_FOUND]: 404,
    [ApplicationErrorEnum.REQUIRED_FIELDS]: 400,
    [ApplicationErrorEnum.FORBIDDEN]: 500,
  };

  constructor(
    message: string,
    typeError: ApplicationErrorEnum,
    stack?: string
  ) {
    super(message);
    this.genericTypeError = typeError;
    this.stack = stack;
  }

  getHttpCode(): number {
    return this.statusCode[this.genericTypeError];
  }

  static with(
    message: string,
    typeError: ApplicationErrorEnum,
    stack?: string
  ): ApplicationException {
    return new ApplicationException(message, typeError, stack);
  }
}
