import { Session } from 'next-auth';
import { Table } from '@tanstack/react-table';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Attendances, Event, Membership, User } from '@prisma/client';

export type AuthenticatedPage = {
  role?: string;
  redirectTo?: string; // redirect to this url
};

export type ExtendedComponentProps = {
  className?: string;
};

export type ApiResponseType = {
  ok: any;
  statusText: string | undefined;
  json(): ApiResponseType | PromiseLike<ApiResponseType>;
  status: number;
  message?: string;
};

export type AdminTableProps<T> = {
  table: Table<T>;
};

export type RegisteredUserType = {
  name: string;
  email: string;
  foodNeeds: string;
};

export type AttendingUserType = {
  id: string;
  name: string;
  email: string;
  foodNeeds: string;
  checked: boolean;
};

export type EventType = Event & {
  registrationList: string[];
  waitingList: string[];
  attendanceList: string[];
};

// export type EventType = {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   location: string;
//   maxRegistrations: number;
//   eventType: EventTypeType;
//   startTime: Date;
//   endTime: Date;
//   updatedAt: Date;
//   registrationDeadline: Date;
//   cancellationDeadline: Date;
//   registrationList: string[];
//   waitingList: string[];
//   checkinId: string;
//   checkinList: string[];
//   isDraft: boolean;
//   isCancelled: boolean;
// };

export type SelectProps<T extends FieldValues> = {
  options: {
    value: string;
    label: string;
  }[];
  id?: Path<T>;
  register?: UseFormRegister<T>;
};

export type AttendancesType = {
  user: UserType;
  event: EventType;
  createdAt: Date;
};

export type UserType = User & {
  password?: string;
  userAttendanceList: AttendancesType[];
  membership: Membership[];
};

export type CardProps = {
  user: UserType;
  session: Session | null;
};

export type MembershipType = Membership & {
  users: { id: string }[];
};
