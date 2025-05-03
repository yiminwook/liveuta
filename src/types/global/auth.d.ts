import { Payload } from '../next-auth';

declare module '@auth/core/types' {
  interface User extends Payload {
    errorMessage?: string;
  }
}

declare module 'next-auth' {
  interface User extends Payload {
    errorMessage?: string;
  }

  interface Session {
    user: Payload & { accessToken: string };
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    user: Payload;
  }
}

export {};
