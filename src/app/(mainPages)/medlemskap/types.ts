export type SummaryStep = {
  title: string;
  description: string;
  icon: 'wallet' | 'envelope' | 'check';
};

export type MembershipTier = {
  label: string;
  price: string;
  period: string;
  perks: string[];
  note: string;
  badge?: string;
};
