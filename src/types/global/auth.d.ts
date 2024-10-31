declare module 'next-auth' {
  interface Session {
    user: {
      userLv: number;
      email: string;
      name: string | null | undefined;
      image: string | null | undefined;
      provider: string;
      loginAt: string;
      accessToken: string;
    };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    user: {
      userLv: number;
      email: string;
      name: string | null | undefined;
      image: string | null | undefined;
      provider: string;
      loginAt: string;
      accessToken: string;
    };
  }
}

export {};
