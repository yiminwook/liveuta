import CustomServerError from './customServerError';

/** statusCode: 400 */
export default class BadReqError extends CustomServerError {
  constructor(message: string) {
    super({ statusCode: 400, message });
  }
}
