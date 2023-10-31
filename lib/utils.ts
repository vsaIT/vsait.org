import { AdminPageTitle, PageTitle } from './titleEnum';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const getMembershipYear = () => {
  const date = new Date();
  return date.getMonth() <= 8 ? date.getFullYear() - 1 : date.getFullYear();
};

const MONTH = [
  'jan.',
  'feb.',
  'mar.',
  'apr.',
  'mai',
  'jun.',
  'jul.',
  'aug.',
  'sep.',
  'okt.',
  'nov.',
  'des.',
];

export const getLocaleDatetimeString = (cdate: Date) => {
  const date = new Date(cdate);
  return `${String(date.getDate()).padStart(2, '0')}. ${
    MONTH[date.getMonth()]
  } ${date.getFullYear()}, ${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
};

export const normalize = (value: string) => {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
export const getLocaleDateString = (cdate: Date) => {
  const date = new Date(cdate);
  return `${String(date.getDate()).padStart(2, '0')}. ${
    MONTH[date.getMonth()]
  } ${date.getFullYear()}`;
};

export function mapPageTitle(path: string): string {
  if (path.startsWith('/admin')) {
    const adminPath = path.slice(6);
    switch (adminPath) {
      case '':
        return AdminPageTitle.admin;
      case '/statistics':
        return AdminPageTitle.stats;
      case '/users':
      case '/users/[userid]':
      case '/users/[userid]/edit':
        return AdminPageTitle.users;
      case '/memberships':
      case '/memberships/[year]':
      case '/memberships/[year]/edit':
        return AdminPageTitle.membership;
      case '/events':
      case '/events/new':
      case '/events/[eventid]':
      case '/events/[eventid]/edit':
        return AdminPageTitle.event;
      default:
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
    case '/events/[eventid]':
      return PageTitle.event;
    case '/events/checkin/[eventid]':
      return PageTitle.checkin;
    // Errors
    case '/404':
      return PageTitle.error404;
    case '/500':
      return PageTitle.error500;
    case '/403':
      return PageTitle.error403;
    default:
      return 'Could not find page title';
  }
}
