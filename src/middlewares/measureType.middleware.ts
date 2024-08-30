import type { Request, Response, NextFunction } from "express";
import type { IListParams, IListQuery } from "../interfaces/request.interface";
import type { IListResponse } from "../interfaces/response.interface";

export default async function checkMeasureType(
  req: Request<IListParams, IListResponse, null, IListQuery>,
  _res: Response<IListResponse>,
  next: NextFunction,
) {
  const { measure_type } = req.query;
  if (
    measure_type &&
    !["WATER", "GAS"].some(
      (type) => type.toLowerCase() === measure_type.toLowerCase(),
    )
  ) {
    next("INVALID_TYPE");
  }

  next();
}
