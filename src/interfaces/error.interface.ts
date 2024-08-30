type ERROR_MESSAGES =
  | "INVALID_DATA"
  | "INVALID_TYPE"
  | "DOUBLE_REPORT"
  | "CONFIRMATION_DUPLICATE"
  | "MEASURE_NOT_FOUND"
  | "MEASURES_NOT_FOUND"
  | "CUSTOMER_NOT_FOUND";

type IErrors = {
  [key in ERROR_MESSAGES]: {
    description: string;
    code: number;
  };
};

export { IErrors, ERROR_MESSAGES };
