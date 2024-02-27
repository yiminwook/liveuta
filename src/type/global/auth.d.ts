declare module 'next-auth' {
  interface User {
    email: string;
    name: string;
    picture: string;
    provider: string;
    error?: string;
  }

  interface Session {
    user: {
      email: string;
      name: string;
      picture: string;
      provider: string;
      loginAt: string;
      accessToken: string;
    };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    user: {
      email: string;
      name: string;
      picture: string;
      provider: string;
      loginAt: string;
      accessToken: string;
    };
  }
}

export {};
