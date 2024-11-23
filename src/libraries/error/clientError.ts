type TClientErrorOption = {};

export default class ClientError extends Error {
  constructor(public message: string, {}: TClientErrorOption = {}) {
    // web경로에서 발생하는 에러는 client side error로 간주합니다.
    // production 환경에서만 Client Side Error로 표시합니다.
    super(process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'Client Side Error' : message);
  }
}
