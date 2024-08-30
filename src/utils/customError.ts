import ERRORS from "./errors";

export default function customError(message: keyof typeof ERRORS): Error {
  return new Error(message);
}
