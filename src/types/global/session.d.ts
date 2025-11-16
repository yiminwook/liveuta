declare global {
  type TSession = {
    accessToken: string;
    expiresAt: Date;
    email: string;
  };
}

export {};
