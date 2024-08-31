import type { Request, Response } from "express";
import ERRORS from "../../../src/utils/errors";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import errorHandler from "../../../src/middlewares/errorHandler.middleware";

describe("Error handler middleware", () => {
  let res: Response;
  let req: Request;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    req = {} as Request;
  });

  Object.entries(ERRORS).forEach(([key, value]) => {
    it(`should handle ${key} error`, () => {
      const error = new Error(key);

      errorHandler(error, req, res);

      expect(res.status).toHaveBeenCalledWith(value.code);
      expect(res.json).toHaveBeenCalledWith({
        error_code: key,
        message: value.description,
      });
    });
  });
});
