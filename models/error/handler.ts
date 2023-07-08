import CustomServerError from '@/models/error/customServerError';

interface ErrorHandlerReturnType {
  status: number;
  message: string;
}
const errorHandler = (error: unknown): ErrorHandlerReturnType => {
  console.error(error);
  let unknownErr = error;

  if (error instanceof CustomServerError === false) {
    unknownErr = new CustomServerError({
      statusCode: 499,
      message: 'unknown error',
    });
  }

  const { statusCode, serializeErrorMessage } = unknownErr as CustomServerError;
  return { status: statusCode, message: serializeErrorMessage.bind(unknownErr)() };
};

export default errorHandler;
