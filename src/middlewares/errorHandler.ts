import type { NextFunction, Request, Response } from "express";

const ERRORS = {
  INVALID_DATA: {
    description: "Os dados fornecidos no corpo da requisição são inválidos",
    code: 400,
  },
  DOUBLE_REPORT: {
    description: "Já existe uma leitura para este tipo no mês atual",
    code: 409,
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
};

function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error);
  const err = ERRORS[error.name as keyof typeof ERRORS];
  res.status(err.code).json({ error_code: err.code, message: err.description });
  next();
}

export default errorHandler;
