import type { User as UserType, Membership } from '@prisma/client';
import { AttendancesType } from '.';

declare module 'next-auth' {
  interface User extends UserType {
    membership: Membership[];
    userAttendanceList: AttendancesType[];
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, UserType {}
}
