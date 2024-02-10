import { Role } from '@prisma/client';
import type { User as UserType, Membership } from '@prisma/client';

declare module 'next-auth' {
  interface User extends UserType {
    membership: Membership[];
    mappedMembership?: number[];

  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, UserType {
  }
}
