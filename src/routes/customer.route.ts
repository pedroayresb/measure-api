import express from "express";
import type { Response, Request, NextFunction } from "express";
import type { IListQuery, IListParams } from "../interfaces/request.interface";
import type { IListResponse } from "../interfaces/response.interface";

import customerController from "../controllers/customer.controller";

import checkMeasureType from "../middlewares/measureType.middleware";

const customerRoutes = express();

customerRoutes.get(
  "/:customer_code/list",
  checkMeasureType,
  (
    req: Request<IListParams, IListResponse, null, Required<IListQuery>>,
    res: Response<IListResponse>,
    next: NextFunction,
  ) => {
    customerController.getCustomerMeasures(req, res, next);
  },
);

export default customerRoutes;
