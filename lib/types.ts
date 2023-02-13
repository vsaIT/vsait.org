import { Session } from 'next-auth';
import { AppProps } from 'next/app';
import { EventType as EventTypeType } from '@prisma/client';
import { Component, HTMLProps } from 'react';
import { Table } from '@tanstack/react-table';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export type AuthenticatedPage = {
  role?: string;
  redirectTo?: string; // redirect to this url
};
export type ExtendedPageProps = {
  requiresAuth?: boolean;
  auth?: AuthenticatedPage;
  layout?: Component;
};

export type ExtendedAppProps = AppProps & {
  Component: ExtendedPageProps;
  pageProps: { auth?: boolean; session?: Session };
};

export type ExtendedComponentProps = {
  className?: string;
};

export type ChildrenProps = {
  children?: JSX.Element;
} & ExtendedComponentProps;

export type HeaderProps = {
  title?: string;
} & ChildrenProps;

export type ButtonProps = {
  children?: JSX.Element;
  onClick?: () => void;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  inverted?: boolean;
} & Omit<HTMLProps<HTMLButtonElement>, 'onClick'>;

export type AdminTableProps<T> = {
  table: Table<T>;
};

export type ApiResponseType = {
  statusCode: number;
  message: string;
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

export type EventType = {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  maxRegistrations: number;
  eventType: EventTypeType;
  startTime: Date;
  endTime: Date;
  updatedAt: Date;
  registrationDeadline: Date;
  cancellationDeadline: Date;
  registrationList: string[];
  waitingList: string[];
  checkinId: string;
  checkinList: string[];
  isDraft: boolean;
  isCancelled: boolean;
};

export type SelectProps<T extends FieldValues> = {
  options: {
    value: string;
    label: string;
  }[];
  id?: Path<T>;
  register?: UseFormRegister<T>;
};

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  foodNeeds: string;
  student: string;
  publicProfile: boolean;
  membership: {
    year: number;
  }[];
  profileIconSeed: string;
  userAttendanceList?: { event: EventType }[];
};
export type CardProps = {
  user: UserType;
  session: Session | null;
};
