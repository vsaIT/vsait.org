import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    id: string;
    role: Role;
    firstName: string;
    lastName: string;
    email: string;
    membership: number[];
  }
  interface Session {
    user: {
      id: string;
      role: Role;
      firstName: string;
      lastName: string;
      email: string;
      membership: number[];
    };
  }
}
