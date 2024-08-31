import { IMeasure } from "../../src/interfaces/measure.interface";
import { faker } from "@faker-js/faker";
import imageMock from "./image.mock";

export default function createMeasureMock(opts?: {
  quantity: number;
  singleMeasure?: boolean;
  customerIds?: string[];
}): IMeasure | IMeasure[] {
  if (opts?.singleMeasure) {
    return {
      id: faker.string.uuid(),
      type: "WATER",
      geminiValue: faker.number.float(),
      confirmedValue: faker.number.float(),
      createdAt: faker.date.recent(),
      hasConfirmed: true,
      customerId:
        opts.customerIds && opts.customerIds.length > 0
          ? opts.customerIds[0]
          : faker.string.uuid(),
      imageUrl: imageMock,
    };
  }

  return Array.from({ length: opts?.quantity ?? 1 }, (_, index) => ({
    id: faker.string.uuid(),
    type: ["WATER", "GAS"][index % 2] as "WATER" | "GAS",
    geminiValue: faker.number.float(),
    confirmedValue: faker.number.float(),
    createdAt: faker.date.recent(),
    hasConfirmed: true,
    customerId:
      opts?.customerIds && opts.customerIds.length > 0
        ? opts.customerIds[index % opts.customerIds.length]
        : faker.string.uuid(),
    imageUrl: imageMock,
  }));
}
