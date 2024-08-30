import type { Request, Response, NextFunction } from "express";
import type { IUploadRequest } from "../interfaces/request.interface";
import type { IUploadResponse } from "../interfaces/response.interface";
import customError from "../utils/customError";

async function validateImage(
  req: Request<null, IUploadResponse, IUploadRequest>,
  res: Response<IUploadResponse>,
  next: NextFunction,
) {
  const { image } = req.body;

  if (!image) {
    throw customError("INVALID_DATA");
  }

  if (!image.match(/data:image\/(png|jpeg|webp|heic|heif);base64,/)) {
    throw customError("INVALID_DATA");
  }

  next();
}

export default validateImage;
