import { MeasureType } from "../interfaces/request.interface";
import measureRepository from "../repositories/measure.repository";
import customError from "../utils/customError";
import { IUploadResponse } from "../interfaces/response.interface";
import readMeasure from "../utils/readMeasure";
import customerService from "./customer.service";

async function checkMeasureType(type: MeasureType, createdAt: Date) {
  const measure = await measureRepository.getMeasureByFilters({
    type,
    createdAt: {
      gte: new Date(createdAt.getFullYear(), createdAt.getMonth(), 1),
      lt: new Date(createdAt.getFullYear(), createdAt.getMonth() + 1, 1),
    },
  });

  if (measure) {
    throw customError("DOUBLE_REPORT");
  }
}

async function checkCustomer(customerId: string) {
  const customer = await customerService.getCustomerById(customerId);

  if (!customer) {
    await customerService.createCustomer(customerId);
  }
}

async function checkConfirmedMeasure(id: string) {
  const measure = await measureRepository.getMeasureByFilters({
    id,
  });

  if (!measure) {
    throw customError("MEASURE_NOT_FOUND");
  }

  if (measure.hasConfirmed) {
    throw customError("CONFIRMATION_DUPLICATE");
  }
}

async function uploadMeasure(
  type: MeasureType,
  createdAt: Date,
  customerId: string,
  imageUrl: string,
): Promise<IUploadResponse> {
  await checkMeasureType(type, createdAt);

  await checkCustomer(customerId);

  const { geminiValue } = await readMeasure.read(imageUrl);

  if (Number.isNaN(geminiValue)) {
    throw customError("INVALID_DATA");
  }

  const {
    id: measure_uuid,
    geminiValue: measure_value,
    imageUrl: image_url,
  } = await measureRepository.createMeasure(
    type,
    Number(geminiValue),
    customerId,
    imageUrl,
  );

  return {
    measure_uuid,
    measure_value,
    image_url,
  };
}

async function confirmMeasure(id: string, confirmedValue: number) {
  await checkConfirmedMeasure(id);
  await measureRepository.confirmMeasure(id, confirmedValue);
}

const measureService = {
  uploadMeasure,
  confirmMeasure,
  checkCustomer,
  checkMeasureType,
  checkConfirmedMeasure,
};

export default measureService;
