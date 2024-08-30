import { MeasureType } from "./request.interface";

interface IMeasure {
  id: string;
  type: MeasureType;
  geminiValue: number;
  confirmedValue: number | null;
  createdAt: Date;
  hasConfirmed: boolean;
  customerId: string;
  imageUrl: string;
}

interface IMeasureResponse {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
}

interface IMeasureList {
  id: string;
  measures: IMeasure[];
}

export { IMeasure, IMeasureResponse, IMeasureList };
