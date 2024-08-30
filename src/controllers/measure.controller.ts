import type { Request, Response, NextFunction } from "express";
import type {
  IUploadRequest,
  IConfirmRequest,
} from "../interfaces/request.interface";
import type {
  IUploadResponse,
  IConfirmResponse,
} from "../interfaces/response.interface";
import measureService from "../services/measure.service";

async function createMeasure(
  req: Request<null, IUploadResponse, IUploadRequest>,
  res: Response<IUploadResponse>,
  next: NextFunction,
) {
  try {
    const { measure_type, measure_datetime, customer_code, image } = req.body;

    const measure = await measureService.uploadMeasure(
      measure_type,
      new Date(measure_datetime),
      customer_code,
      image,
    );

    res.status(200).json(measure);
  } catch (error) {
    next(error);
  }
}

async function confirmMeasure(
  req: Request<null, IConfirmResponse, IConfirmRequest>,
  res: Response<IConfirmResponse>,
  next: NextFunction,
) {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    await measureService.confirmMeasure(measure_uuid, confirmed_value);

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}

const measureController = {
  createMeasure,
  confirmMeasure,
};

export default measureController;
