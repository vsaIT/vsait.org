const BaseTitle = 'VSAiT | ';

export enum PageTitle {
  home = BaseTitle + 'Hjemmeside',
  about = BaseTitle + 'Om VSAiT',
  org = BaseTitle + 'For bedrifter',
  guidelines = BaseTitle + 'Retningslinjer',
  login = BaseTitle + 'Innlogging',
  register = BaseTitle + 'Opprett bruker',
  profile = BaseTitle + 'Profil',
  error500 = BaseTitle + '500',
  error404 = BaseTitle + '404',
  forgotPassword = BaseTitle + 'Glemt passord',
  resetPassword = BaseTitle + 'Tilbakestill passord',
  event = BaseTitle + 'Arrangementer',
  checkin = BaseTitle + 'Check-in',
}

const AdminBaseTitle = 'VSAiT | Administrasjon ';

export enum AdminPageTitle {
  admin = AdminBaseTitle,
  stats = BaseTitle + 'Statistikk',
  users = AdminBaseTitle + 'Medlemmer',
  membership = AdminBaseTitle + 'Medlemsskap',
  event = AdminBaseTitle + 'Arrangementer',
}
