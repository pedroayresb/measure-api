import { Router } from "express";
import type { Response, Request, NextFunction } from "express";
import type {
  IUploadRequest,
  IConfirmRequest,
} from "../interfaces/request.interface";
import type {
  IUploadResponse,
  IConfirmResponse,
} from "../interfaces/response.interface";

import measureController from "../controllers/measure.controller";

const measureRouter = Router();

measureRouter.post(
  "/upload",
  (
    _req: Request<null, IUploadResponse, IUploadRequest>,
    res: Response<IUploadResponse>,
    next: NextFunction,
  ) => {
    measureController.createMeasure(_req, res, next);
  },
);
measureRouter.patch(
  "/confirm",
  (
    _req: Request<null, IConfirmResponse, IConfirmRequest>,
    res: Response<IConfirmResponse>,
    next: NextFunction,
  ) => {
    measureController.confirmMeasure(_req, res, next);
  },
);

export default measureRouter;
