import type { MeasureType } from "../interfaces/request.interface";
import type { IMeasureList } from "../interfaces/measure.interface";
import prisma from "../database";
import customError from "../utils/customError";

async function getCustomerMeasures(
  id: string,
  type: MeasureType,
): Promise<IMeasureList> {
  const measures = await prisma.customers.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      measures: {
        where: {
          type,
        },
      },
    },
  });

  if (!measures) {
    throw customError("CUSTOMER_NOT_FOUND");
  }

  if (!measures.measures) {
    throw customError("MEASURE_NOT_FOUND");
  }

  return measures;
}

async function getCustomerById(id: string) {
  const customer = await prisma.customers.findUnique({
    where: {
      id,
    },
  });

  return customer;
}

async function createCustomer(id: string) {
  const customer = await prisma.customers.create({
    data: {
      id,
    },
  });

  return customer;
}

const customerRepository = {
  getCustomerMeasures,
  getCustomerById,
  createCustomer,
};

export default customerRepository;
