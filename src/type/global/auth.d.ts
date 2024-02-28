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
      userLv: number;
      email: string;
      name: string;
      picture: string;
      provider: string;
      loginAt: string;
      accessToken: string;
      disabled: boolean;
    };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    user: {
      userLv: number;
      email: string;
      name: string;
      picture: string;
      provider: string;
      loginAt: string;
      accessToken: string;
      disabled: boolean;
    };
  }
}

export {};
