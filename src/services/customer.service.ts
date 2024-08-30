import type { MeasureType } from "../interfaces/request.interface";
import { IListResponse } from "../interfaces/response.interface";
import customerRepository from "../repositories/customer.repository";

async function getCustomerMeasures(
  customerId: string,
  type: MeasureType,
): Promise<IListResponse> {
  const { id, measures } = await customerRepository.getCustomerMeasures(
    customerId,
    type,
  );

  return {
    customer_code: id,
    measures: measures.map((measure) => ({
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
