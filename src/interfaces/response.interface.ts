import { IMeasureResponse } from "./measure.interface";

interface IUploadResponse {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
}

interface IConfirmResponse {
  success: true;
}

interface IListResponse {
  customer_code: string;
  measures: IMeasureResponse[];
}

export { IUploadResponse, IConfirmResponse, IListResponse };
