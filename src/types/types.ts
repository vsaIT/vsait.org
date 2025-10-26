import { Session } from 'next-auth';
import { Table } from '@tanstack/react-table';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Event, Membership, User } from '@prisma/client';

export type AuthenticatedPage = {
  role?: string;
  redirectTo?: string; // redirect to this url
};

export type ExtendedComponentProps = {
  className?: string;
};

export type ApiResponseType = {
  ok: boolean;
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

export type SingleEventType = {
  event: EventType;
  registrations: RegisteredUserType[];
  hasRegistered: boolean;
  hasMembership: boolean;
};

export type MultipleEventType = {
  events: EventType[];
  page: number;
  pages: number;
};

export type EventType = Event & {
  registrationList?: string[];
  waitingList?: string[];
  attendanceList?: string[];
  _count?: {
    registrationList: number;
    waitingList: number;
  };
};

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
