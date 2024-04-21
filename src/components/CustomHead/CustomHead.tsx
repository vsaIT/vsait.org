'use client';
import { usePathname } from 'next/navigation';

import { AdminPageTitle, PageTitle } from './titleEnum';

export function mapPageTitle(path: string): string {
  if (path.startsWith('/admin')) {
    const adminPath = path.slice(6);
    if (adminPath === '') {
      return AdminPageTitle.admin;
    } else if (adminPath.startsWith('/statistics')) {
      return AdminPageTitle.stats;
    } else if (adminPath.startsWith('/users')) {
      return AdminPageTitle.users;
    } else if (adminPath.startsWith('/memberships')) {
      return AdminPageTitle.membership;
    } else if (adminPath.startsWith('/events')) {
      return AdminPageTitle.event;
    } else {
      return 'Could not find admin page title';
    }
  }
  switch (path) {
    // Basics
    case '/':
      return PageTitle.home;
    case '/login':
      return PageTitle.login;
    case '/register':
      return PageTitle.register;
    case '/profile':
      return PageTitle.profile;
    case '/organization':
      return PageTitle.org;
    case '/retningslinjer':
      return PageTitle.guidelines;
    case '/forgot':
      return PageTitle.forgotPassword;
    case '/forgot/[resetid]':
      return PageTitle.resetPassword;
    // Events
    case '/events':
      return PageTitle.event;
    // Errors
    case '/404':
      return PageTitle.error404;
    case '/500':
      return PageTitle.error500;
    case '/403':
      return PageTitle.error403;
    default:
      if (path.startsWith('/events/')) return PageTitle.event;
      if (path.startsWith('/events/checkin/')) return PageTitle.checkin;

      return 'Could not find page title';
  }
}

export default function CustomHead(): JSX.Element {
  const pathParam = usePathname();
  const title = mapPageTitle(pathParam);
  return (
    <head>
      <title>{title}</title>
      <meta
        name='description'
        content='Vietnamese Student Association in Trondheim'
      />
      <link rel='icon' href='/favicon.ico' />
    </head>
  );
}
