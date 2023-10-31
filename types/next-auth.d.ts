import { Role } from '@prisma/client';
import type { User as UserType, Membership } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    id: string;
    role: Role;
    firstName: string;
    lastName: string;
    email: string;
    membership: number[];
    profileIconSeed: string;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      firstName: string;
      lastName: string;
      email: string;
      membership: number[];
      profileIconSeed: string;
    };
  }
}
