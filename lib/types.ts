import { Session } from 'next-auth';
import { AppProps } from 'next/app';
import { EventType as EventTypeType } from '@prisma/client';
import { Component } from 'react';

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

export type ChildrenProps = {
  children?: JSX.Element;
};
export type HeaderProps = {
  title?: string;
} & ChildrenProps;

export type ButtonProps = {
  children?: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  className?: string;
  inverted?: boolean;
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
  registrationDeadline: Date;
  cancellationDeadline: Date;
  registrationList: string[];
  waitingList: string[];
  checkinId: string;
  checkinList: string[];
  isDraft: boolean;
};
