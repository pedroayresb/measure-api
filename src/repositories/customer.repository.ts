import type { MeasureType } from "../interfaces/request.interface";
import type { IMeasureList } from "../interfaces/measure.interface";
import prisma from "../database";

async function getCustomerMeasures(
  id: string,
  type: MeasureType,
): Promise<IMeasureList | null> {
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
