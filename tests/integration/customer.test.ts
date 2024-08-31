import mocks from "../mocks";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { Request, Response } from "express";
import {
  IListParams,
  IListQuery,
} from "../../src/interfaces/request.interface";
import { IListResponse } from "../../src/interfaces/response.interface";
import customerController from "../../src/controllers/customer.controller";
import { faker } from "@faker-js/faker";
import ICustomer from "../../src/interfaces/customer.interface";
import customerRepository from "../../src/repositories/customer.repository";
import { IMeasure } from "../../src/interfaces/measure.interface";

describe("Customers", () => {
  describe("List customers", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should throw an error if the customer does not exist", async () => {
      const customerCode = faker.string.uuid();
      const measureType = faker.helpers.arrayElement(["WATER", "GAS"]);

      const req = {
        params: {
          customer_code: customerCode,
        },
        query: {
          measure_type: measureType,
        },
      } as Request<IListParams, IListResponse, null, Required<IListQuery>>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IListResponse>;

      const next = jest.fn();

      await customerController.getCustomerMeasures(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("CUSTOMER_NOT_FOUND"));
    });

    it("should throw an error if the user has no measures", async () => {
      const customerCode = faker.helpers.arrayElement(
        mocks.customers as ICustomer[],
      ).id;
      const measureType = faker.helpers.arrayElement(["WATER", "GAS"]);

      const req = {
        params: {
          customer_code: customerCode,
        },
        query: {
          measure_type: measureType,
        },
      } as Request<IListParams, IListResponse, null, Required<IListQuery>>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IListResponse>;

      const next = jest.fn();

      customerRepository.getCustomerMeasures = jest.fn(async () => {
        return {
          id: customerCode,
          measures: [],
        };
      });

      await customerController.getCustomerMeasures(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("MEASURE_NOT_FOUND"));
    });

    it("should return a list of the customer measures", async () => {
      const customerCode = faker.helpers.arrayElement(
        mocks.customers as ICustomer[],
      ).id;

      const req = {
        params: {
          customer_code: customerCode,
        },
        query: {},
      } as Request<IListParams, IListResponse, null, Required<IListQuery>>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IListResponse>;

      const next = jest.fn();

      const { measures } = mocks as { measures: IMeasure[] };

      customerRepository.getCustomerMeasures = jest.fn(async () => ({
        id: customerCode,
        measures: measures.filter(
          (measure) => measure.customerId === customerCode,
        ),
      }));

      await customerController.getCustomerMeasures(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        customer_code: customerCode,
        measures: measures
          .filter((measure) => measure.customerId === customerCode)
          .map((measure) => ({
            measure_uuid: measure.id,
            measure_datetime: measure.createdAt,
            measure_type: measure.type,
            has_confirmed: measure.hasConfirmed,
            image_url: measure.imageUrl,
          })),
      });
    });

    it("should return a list of the customer measures with a specific type", async () => {
      const customerCode = faker.helpers.arrayElement(
        mocks.customers as ICustomer[],
      ).id;
      const measureType = faker.helpers.arrayElement(["WATER", "GAS"]);

      const req = {
        params: {
          customer_code: customerCode,
        },
        query: {
          measure_type: measureType,
        },
      } as Request<IListParams, IListResponse, null, Required<IListQuery>>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response<IListResponse>;

      const next = jest.fn();

      const { measures } = mocks as { measures: IMeasure[] };

      customerRepository.getCustomerMeasures = jest.fn(async () => ({
        id: customerCode,
        measures: measures.filter(
          (measure) =>
            measure.customerId === customerCode && measure.type === measureType,
        ),
      }));

      await customerController.getCustomerMeasures(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        customer_code: customerCode,
        measures: measures
          .filter(
            (measure) =>
              measure.customerId === customerCode &&
              measure.type === measureType,
          )
          .map((measure) => ({
            measure_uuid: measure.id,
            measure_datetime: measure.createdAt,
            measure_type: measure.type,
            has_confirmed: measure.hasConfirmed,
            image_url: measure.imageUrl,
          })),
      });
    });
  });
});
