export default class CustomServerError extends Error {
  public statusCode: number;
  public location?: string;

  constructor({ statusCode = 500, message, location }: { statusCode?: number; message: string; location?: string }) {
    super(message);
    this.statusCode = statusCode;
    this.location = location;
  }

  serializeErrorMessage() {
    return this.message;
  }
}
