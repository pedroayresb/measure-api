import type { Request, Response } from "express";
import type {
  IListParams,
  IListQuery,
} from "../../../src/interfaces/request.interface";
import type { IListResponse } from "../../../src/interfaces/response.interface";
import { jest, describe, it, expect } from "@jest/globals";
import checkMeasureType from "../../../src/middlewares/measureType.middleware";

describe("Measure Type middleware", () => {
  ["WATER", "GAS"].forEach((type) => {
    it(`should pass for ${type} measure type`, () => {
      const req = {
        query: {
          measure_type: type,
        },
      } as Request<IListParams, IListResponse, null, IListQuery>;

      const next = jest.fn();

      checkMeasureType(req, {} as Response<IListResponse>, next);

      expect(next).toHaveBeenCalled();
    });
  });

  it("should throw an error for an invalid measure type", () => {
    const req = {
      query: {
        measure_type: "INVALID",
      },
    };

    const next = jest.fn();

    checkMeasureType(
      req as unknown as Request<IListParams, IListResponse, null, IListQuery>,
      {} as Response<IListResponse>,
      next,
    );

    expect(next).toHaveBeenCalledWith("INVALID_TYPE");
  });
});
