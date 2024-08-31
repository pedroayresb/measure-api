import type { Request, Response } from "express";
import type { IUploadRequest } from "../../../src/interfaces/request.interface";
import type { IUploadResponse } from "../../../src/interfaces/response.interface";
import validateImage from "../../../src/middlewares/validImage.middleware";
import { jest, describe, it, expect } from "@jest/globals";

// async function validateImage(
//   req: Request<null, IUploadResponse, IUploadRequest>,
//   res: Response<IUploadResponse>,
//   next: NextFunction,
// ) {
//   const { image } = req.body;

//   if (!image) {
//     throw customError("INVALID_DATA");
//   }

//   if (!image.match(/data:image\/(png|jpeg|webp|heic|heif);base64,/)) {
//     throw customError("INVALID_DATA");
//   }

//   next();
// }

// export default validateImage;

describe("Valid Image middleware", () => {
  it("should pass for valid image", () => {
    const req = {
      body: {
        image: "data:image/png;base64,base64encodedimage",
      },
    } as Request<null, IUploadResponse, IUploadRequest>;

    const next = jest.fn();

    validateImage(req, {} as Response<IUploadResponse>, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw an error for an invalid image", () => {
    const req = {
      body: {
        image: "data:image/invalid;base64,base64encodedimage",
      },
    } as Request<null, IUploadResponse, IUploadRequest>;

    const next = jest.fn();

    expect(() =>
      validateImage(req, {} as Response<IUploadResponse>, next),
    ).rejects.toThrow("INVALID_DATA");
  });

  it("should throw an error for an empty image", () => {
    const req = {
      body: {},
    } as Request<null, IUploadResponse, IUploadRequest>;

    const next = jest.fn();

    expect(() =>
      validateImage(req, {} as Response<IUploadResponse>, next),
    ).rejects.toThrow("INVALID_DATA");
  });
});
