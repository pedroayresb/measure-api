import mocks from "../mocks";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { Request, Response } from "express";
import {
  IUploadRequest,
  IConfirmRequest,
} from "../../src/interfaces/request.interface";
import {
  IUploadResponse,
  IConfirmResponse,
} from "../../src/interfaces/response.interface";
import measureController from "../../src/controllers/measure.controller";
import { faker } from "@faker-js/faker";
import { IMeasure } from "../../src/interfaces/measure.interface";
import measureService from "../../src/services/measure.service";
import customerRepository from "../../src/repositories/customer.repository";
import { mockDeep } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import customerService from "../../src/services/customer.service";
import measureRepository from "../../src/repositories/measure.repository";
import readMeasure from "../../src/utils/readMeasure";

describe("Measures", () => {
  describe("Create measure", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should throw error if measure type is already reported this month", async () => {
      const mockedMeasure = faker.helpers.arrayElement(
        mocks.measures as IMeasure[],
      );

      const req = {
        body: {
          measure_type: mockedMeasure.type,
          measure_datetime: mockedMeasure.createdAt,
          customer_code: mockedMeasure.customerId,
          image: mocks.image,
        },
      } as Request<null, IUploadResponse, IUploadRequest>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IUploadResponse>;

      const next = jest.fn();

      measureRepository.getMeasureByFilters = jest.fn(
        async () => mockedMeasure,
      );

      await measureController.createMeasure(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("DOUBLE_REPORT"));
    });

    it("should throw error if geminiValue is NaN", async () => {
      const req = {
        body: {
          measure_type: faker.helpers.arrayElement(["GAS", "WATER"]),
          measure_datetime: faker.date.future(),
          customer_code: faker.string.uuid(),
          image: mocks.image,
        },
      } as Request<null, IUploadResponse, IUploadRequest>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IUploadResponse>;

      const next = jest.fn();

      measureRepository.getMeasureByFilters = jest.fn(async () => null);

      readMeasure.read = jest.fn(async () => ({
        geminiValue: NaN,
      }));

      await measureController.createMeasure(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("INVALID_DATA"));
    });

    it("should call createCustomer if customer does not exist", async () => {
      const req = {
        body: {
          measure_type: faker.helpers.arrayElement(["GAS", "WATER"]),
          measure_datetime: faker.date.future(),
          customer_code: faker.string.uuid(),
          image: mocks.image,
        },
      } as Request<null, IUploadResponse, IUploadRequest>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IUploadResponse>;

      const next = jest.fn();

      customerService.getCustomerById = jest.fn(async () => null);
      customerService.createCustomer = jest.fn(async (customerId: string) => ({
        id: customerId,
      }));

      readMeasure.read = jest.fn(async () => ({
        geminiValue: faker.number.int(),
      }));

      measureRepository.getMeasureByFilters = jest.fn(async () => null);

      await measureController.createMeasure(req, res, next);

      expect(customerService.createCustomer).toHaveBeenCalled();
      expect(customerService.createCustomer).toHaveBeenCalledWith(
        req.body.customer_code,
      );
    });

    it("should create measure", async () => {
      const req = {
        body: {
          measure_type: faker.helpers.arrayElement(["GAS", "WATER"]),
          measure_datetime: faker.date.future(),
          customer_code: faker.string.uuid(),
          image: mocks.image,
        },
      } as Request<null, IUploadResponse, IUploadRequest>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IUploadResponse>;

      const next = jest.fn();

      measureService.checkCustomer = jest.fn(async () => {});

      jest.mock("../../src/utils/readMeasure", () => ({
        default: jest.fn(),
      }));

      customerRepository.getCustomerById = jest.fn(async () => ({
        id: req.body.customer_code,
      }));

      measureService.uploadMeasure = jest.fn(async () => ({
        measure_uuid: faker.string.uuid(),
        measure_value: faker.number.int(),
        image_url: mocks.image,
      }));

      jest.mock("../../src/database", () => ({
        __esModule: true,
        default: mockDeep<PrismaClient>(),
      }));

      await measureController.createMeasure(req, res, next);

      expect(measureService.uploadMeasure).toHaveBeenCalled();
      expect(measureService.uploadMeasure).toHaveBeenCalledWith(
        req.body.measure_type,
        req.body.measure_datetime,
        req.body.customer_code,
        req.body.image,
      );
    });
  });
  describe("Confirm measure", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should throw error if measure does not exist", async () => {
      const req = {
        body: {
          measure_uuid: faker.string.uuid(),
          confirmed_value: faker.number.int(),
        },
      } as Request<null, IConfirmResponse, IConfirmRequest>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IConfirmResponse>;

      const next = jest.fn();

      measureRepository.getMeasureByFilters = jest.fn(async () => null);

      await measureController.confirmMeasure(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("MEASURE_NOT_FOUND"));
    });

    it("should throw error if measure has already been confirmed", async () => {
      const mockedMeasure = faker.helpers.arrayElement(
        mocks.measures as IMeasure[],
      );

      const req = {
        body: {
          measure_uuid: mockedMeasure.id,
          confirmed_value: faker.number.int(),
        },
      } as Request<null, IConfirmResponse, IConfirmRequest>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IConfirmResponse>;

      const next = jest.fn();

      measureRepository.getMeasureByFilters = jest.fn(
        async () => mockedMeasure,
      );

      await measureController.confirmMeasure(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("CONFIRMATION_DUPLICATE"));
    });

    it("should confirm measure", async () => {
      const req = {
        body: {
          measure_uuid: faker.string.uuid(),
          confirmed_value: faker.number.int(),
        },
      } as Request<null, IConfirmResponse, IConfirmRequest>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IConfirmResponse>;

      const next = jest.fn();

      measureRepository.getMeasureByFilters = jest.fn(
        async () =>
          ({
            id: req.body.measure_uuid,
            hasConfirmed: false,
          }) as IMeasure,
      );

      measureRepository.confirmMeasure = jest.fn(async () => {});

      await measureController.confirmMeasure(req, res, next);

      expect(measureRepository.confirmMeasure).toHaveBeenCalled();
      expect(measureRepository.confirmMeasure).toHaveBeenCalledWith(
        req.body.measure_uuid,
        req.body.confirmed_value,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
