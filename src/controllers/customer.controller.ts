import type { Request, Response, NextFunction } from "express";
import type {
  IListParams,
  IListQuery,
  MeasureType,
} from "../interfaces/request.interface";
import type { IListResponse } from "../interfaces/response.interface";
import customerService from "../services/customer.service";

async function getCustomerMeasures(
  req: Request<IListParams, IListResponse, null, Required<IListQuery>>,
  res: Response<IListResponse>,
  next: NextFunction,
) {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query as { measure_type: MeasureType };

    const measures = await customerService.getCustomerMeasures(
      customer_code,
      measure_type,
    );
    res.status(200).json(measures);
  } catch (error) {
    next(error);
  }
}

const customerController = {
  getCustomerMeasures,
};

export default customerController;
