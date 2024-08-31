import { faker } from "@faker-js/faker";
import ICustomer from "../../src/interfaces/customer.interface";

export default function createCustomerMock(opts?: {
  quantity: number;
  singleCustomer?: boolean;
}): ICustomer | ICustomer[] {
  if (opts?.singleCustomer) {
    return {
      id: faker.string.uuid(),
    };
  }

  return Array.from({ length: opts?.quantity ?? 1 }, () => ({
    id: faker.string.uuid(),
  }));
}
