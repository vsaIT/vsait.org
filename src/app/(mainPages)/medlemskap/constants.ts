import { MembershipTier, SummaryStep } from './types';

export const CONTACT_EMAIL = 'vsait@vsait.org';
export const VIPPS_NAME = 'VSAiT';
export const VIPPS_NUMBER = '[#830746]';

export const summarySteps: SummaryStep[] = [
  {
    title: '1. Betal med Vipps',
    description:
      'Velg enten kun for 1 semester eller hele året, og send beløpet til VSAiTs offisielle Vipps-bruker.',
    icon: 'wallet',
  },
  {
    title: '2. Send kvittering',
    description:
      'Ta et skjermbilde av Vipps-betalingen og send det på e-post til styret.',
    icon: 'envelope',
  },
  {
    title: '3. Vi registrerer deg',
    description:
      'Styret godkjenner betalingen og aktiverer medlemskapet på kontoen din.',
    icon: 'check',
  },
];

export const membershipTiers: MembershipTier[] = [
  {
    label: 'Medlemskap',
    price: '100',
    period: 'for ett semester',
    perks: ['Gjelder ut semesteret', 'Påmelding til arrangementer'],
    note: 'Passer deg som er på utveksling eller starter midt i året.',
  },
  {
    label: 'Medlemskap',
    price: '175',
    period: 'for hele studieåret',
    perks: [
      'Gjelder høst- og vårsemester',
      'Påmelding til alle arrangementer',
      'Du slipper å fornye til våren',
    ],
    note: 'Rimeligste alternativ over et helt studieår.',
    badge: 'Mest valgt',
  },
  {
    label: 'Arrangement',
    price: '100',
    period: 'Inngang til Tết og Tết Trung Thu',
    perks: ['Gjelder Tết (nyttårsfeiringen) og Tết Trung Thu (månefestivalen)', 'Betales i tillegg til medlemskap'],
    note: 'Tết er vår største feiring, og har egen inngangsbillett.',
  },
];

export const emailChecklist = [
  'Skjermbilde av Vipps-betalingen',
  'Fullt navn',
  'E-postadressen du registrerte kontoen med',
  'Om det gjelder ett semester eller hele året',
];
