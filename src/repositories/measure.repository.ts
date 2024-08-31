import prisma from "../database";
import type { MeasureType } from "../interfaces/request.interface";
import type { Prisma } from "@prisma/client";

async function createMeasure(
  type: MeasureType,
  geminiValue: number,
  customerId: string,
  imageUrl: string,
) {
  const measure = await prisma.measures.create({
    data: {
      type,
      geminiValue,
      confirmedValue: null,
      customerId,
      imageUrl,
      hasConfirmed: false,
    },
  });

  return measure;
}

async function confirmMeasure(id: string, confirmedValue: number) {
  await prisma.measures.update({
    where: {
      id,
    },
    data: {
      confirmedValue,
      hasConfirmed: true,
    },
  });
}

async function getMeasureByFilters(filters: Prisma.MeasuresWhereInput) {
  const measure = await prisma.measures.findFirst({
    where: filters,
  });

  return measure;
}

const measureRepository = {
  createMeasure,
  confirmMeasure,
  getMeasureByFilters,
};

export default measureRepository;
