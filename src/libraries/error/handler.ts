import CustomServerError from './customServerError';

interface TErrorHandlerReturn {
  status: number;
  message: string;
}

const errorHandler = (error: unknown): TErrorHandlerReturn => {
  // console.error(error);
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
