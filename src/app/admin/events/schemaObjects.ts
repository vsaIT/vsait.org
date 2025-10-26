import { EventType } from '@/types';
import { EventType as EventTypeOptions } from '@prisma/client';

export const sliderCheckboxes = [
  { id: 'isDraft', label: 'Kladd (ikke synlig for brukere)' },
  { id: 'isCancelled', label: 'Avlyst' },
];

export const eventTypeOptions: { value: EventTypeOptions; label: string }[] = [
  {
    value: 'OPEN',
    label: 'Åpent for alle',
  },
  {
    value: 'MEMBERSHIP',
    label: 'Medlemskap kreves',
  },
];

export type TimeDataInput = {
  name: string;
  attr: keyof Pick<
    EventType,
    'startTime' | 'endTime' | 'registrationDeadline' | 'cancellationDeadline'
  >;
  date: {
    label: string;
    type: string;
    defaultValue: string;
  };
};

export function getTimeDataInputs(defaultValue: string = ''): TimeDataInput[] {
  return [
    {
      name: 'Starttid:',
      attr: 'startTime' as const,
      date: {
        label: 'Dato',
        type: 'datetime-local',
        defaultValue,
      },
    },
    {
      name: 'Sluttid:',
      attr: 'endTime' as const,
      date: {
        label: 'Dato',
        type: 'datetime-local',
        defaultValue,
      },
    },
    {
      name: 'Registreringsfrist:',
      attr: 'registrationDeadline' as const,
      date: {
        label: 'Dato',
        type: 'datetime-local',
        defaultValue,
      },
    },
    {
      name: 'Avmeldingsfrist:',
      attr: 'cancellationDeadline' as const,
      date: {
        label: 'Dato',
        type: 'datetime-local',
        defaultValue,
      },
    },
  ];
}
