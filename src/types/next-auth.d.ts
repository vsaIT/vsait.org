import type { User as UserType, Membership } from '@prisma/client';
import { AttendancesType, RegistrationsType } from '.';

declare module 'next-auth' {
  interface User extends UserType {
    membership: Membership[];
    userAttendanceList: AttendancesType[];
    userRegistrationList: RegistrationsType[];
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, UserType {}
}
