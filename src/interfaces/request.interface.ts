type MeasureType = "WATER" | "GAS";

interface IUploadRequest {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
}

interface IConfirmRequest {
  measure_uuid: string;
  confirmed_value: number;
}

interface IListParams {
  customer_code: string;
}

interface IListQuery {
  measure_type?: MeasureType | null;
}

export {
  IUploadRequest,
  IConfirmRequest,
  IListQuery,
  IListParams,
  MeasureType,
};
