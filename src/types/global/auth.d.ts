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

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
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
