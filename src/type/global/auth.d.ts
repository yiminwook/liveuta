declare module 'next-auth' {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
    };
  }
}

export {};
