import ICustomer from "../../src/interfaces/customer.interface";
import createCustomerMock from "./customer.mocks";
import createMeasureMock from "./measures.mocks";
import imageMock from "./image.mock";

const customersMocks = createCustomerMock({ quantity: 5 }) as ICustomer[];

const measuresMocks = createMeasureMock({
  quantity: 100,
  customerIds: customersMocks.map((customer) => customer.id),
});

const mocks = {
  customers: customersMocks,
  measures: measuresMocks,
  image: imageMock,
};

export default mocks;
