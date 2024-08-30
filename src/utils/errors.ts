import { IErrors } from "../interfaces/error.interface";

const ERRORS = {
  INVALID_DATA: {
    description: "Os dados fornecidos no corpo da requisição são inválidos",
    code: 400,
  },
  DOUBLE_REPORT: {
    description: "Já existe uma leitura para este tipo no mês atual",
    code: 409,
  },
  CUSTOMER_NOT_FOUND: {
    description: "Cliente não encontrado",
    code: 404,
  },
  MEASURE_NOT_FOUND: {
    description: "Leitura não encontrada",
    code: 404,
  },
  CONFIRMATION_DUPLICATE: {
    description: "Leitura já confirmada",
    code: 409,
  },
  INVALID_TYPE: {
    description: "Parâmetro measure type diferente de WATER ou GAS",
    code: 400,
  },
  MEASURES_NOT_FOUND: {
    description: "Nenhum registro encontrado",
    code: 404,
  },
} as IErrors;

export default ERRORS;
