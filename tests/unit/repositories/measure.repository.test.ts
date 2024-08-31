import { PrismaClient } from "@prisma/client";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import measureRepository from "../../../src/repositories/measure.repository";

import prisma from "../../../src/database";

describe("Measures", () => {
  jest.mock("../../../src/database", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
  }));

  const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    mockReset(prismaMock);
  });

  it("confirmMeasure", async () => {
    const measureId = faker.string.uuid();
    const confirmedValue = faker.number.int();

    await measureRepository.confirmMeasure(measureId, confirmedValue);

    expect(prismaMock.measures.update).toHaveBeenCalledWith({
      where: {
        id: measureId,
      },
      data: {
        confirmedValue,
        hasConfirmed: true,
      },
    });
  });

  it("getMeasureByFilters", async () => {
    const filters = {
      id: faker.string.uuid(),
    };

    await measureRepository.getMeasureByFilters(filters);

    expect(prismaMock.measures.findFirst).toHaveBeenCalledWith({
      where: filters,
    });
  });
});
