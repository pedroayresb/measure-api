import type { MeasureType } from "../interfaces/request.interface";
import { IListResponse } from "../interfaces/response.interface";
import customerRepository from "../repositories/customer.repository";
import customError from "../utils/customError";

async function getCustomerMeasures(
  customerId: string,
  type: MeasureType,
): Promise<IListResponse> {
  const measures = await customerRepository.getCustomerMeasures(
    customerId,
    type,
  );

  if (!measures) {
    throw customError("CUSTOMER_NOT_FOUND");
  }

  if (!measures.measures || measures.measures.length === 0) {
    throw customError("MEASURE_NOT_FOUND");
  }

  return {
    customer_code: measures.id,
    measures: measures.measures.map((measure) => ({
      measure_uuid: measure.id,
      measure_datetime: measure.createdAt,
      measure_type: measure.type,
      has_confirmed: measure.hasConfirmed,
      image_url: measure.imageUrl,
    })),
  };
}

async function getCustomerById(customerId: string) {
  const customer = await customerRepository.getCustomerById(customerId);

  return customer;
}

async function createCustomer(customerId: string) {
  const customer = await customerRepository.createCustomer(customerId);

  return customer;
}

const customerService = {
  getCustomerMeasures,
  getCustomerById,
  createCustomer,
};

export default customerService;
