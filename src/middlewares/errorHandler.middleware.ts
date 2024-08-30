import type { Request, Response } from "express";
import { ERROR_MESSAGES } from "../interfaces/error.interface";
import ERRORS from "../utils/errors";

function errorHandler(error: Error, _req: Request, res: Response) {
  if (ERRORS[error.message as ERROR_MESSAGES]) {
    res.status(ERRORS[error.message as ERROR_MESSAGES].code).json({
      error_code: error.message,
      message: ERRORS[error.message as ERROR_MESSAGES].description,
    });
  }

  res.status(ERRORS.INVALID_DATA.code).json({
    error_code: error.message,
    message: error,
  });
}

export default errorHandler;
