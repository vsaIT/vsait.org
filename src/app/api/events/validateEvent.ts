import { base64ToBlob } from '@/lib/imageBlobUtil';
import { EventType } from '@prisma/client';

export const EVENT_TIME_FIELDS = [
  'startTime',
  'endTime',
  'registrationDeadline',
  'cancellationDeadline',
] as const;
type EventTimeField = (typeof EVENT_TIME_FIELDS)[number];
export type EventTimes = Record<EventTimeField, Date>;

const TIME_LABELS: Record<EventTimeField, string> = {
  startTime: 'Starttid',
  endTime: 'Sluttid',
  registrationDeadline: 'Registreringsfrist',
  cancellationDeadline: 'Avmeldingsfrist',
};

// The column sizes in schema.prisma
const TITLE_MAX = 500;
const DESCRIPTION_MAX = 12000;
const LOCATION_MAX = 100;

// SVG is left out on purpose
const IMAGE_DATA_URL = /^data:image\/(png|jpe?g|webp|gif|avif);base64,/;

export type EventFields = {
  title?: string;
  description?: string;
  location?: string;
  eventType?: EventType;
  maxRegistrations?: number;
  isDraft?: boolean;
  isCancelled?: boolean;
} & Partial<EventTimes>;

export type ImageChange =
  | { kind: 'keep' }
  | { kind: 'clear' }
  | { kind: 'upload'; blob: Blob };

type ParsedEvent = {
  fields: EventFields;
  image: ImageChange;
  errors: string[];
};

const isMissing = (value: unknown) =>
  value === undefined || value === null || value === '';

export function parseEventBody(
  body: Record<string, unknown>,
  { isCreate }: { isCreate: boolean }
): ParsedEvent {
  const errors: string[] = [];
  const fields: EventFields = {};

  const requiredText = (
    field: 'title' | 'location',
    label: string,
    max: number
  ) => {
    const value = body[field];
    if (value === undefined && !isCreate) return;
    if (typeof value !== 'string' || !value.trim()) {
      errors.push(`${label} må fylles ut`);
    } else if (value.trim().length > max) {
      errors.push(`${label} kan være maks ${max} tegn`);
    } else {
      fields[field] = value.trim();
    }
  };
  requiredText('title', 'Tittel', TITLE_MAX);
  requiredText('location', 'Sted', LOCATION_MAX);

  if (typeof body.description === 'string') {
    if (body.description.length > DESCRIPTION_MAX) {
      errors.push(`Beskrivelsen kan være maks ${DESCRIPTION_MAX} tegn`);
    } else {
      fields.description = body.description;
    }
  } else if (body.description !== undefined && body.description !== null) {
    errors.push('Beskrivelsen er ugyldig');
  } else if (isCreate) {
    fields.description = '';
  }
  if (!isMissing(body.eventType)) {
    if (body.eventType === 'OPEN' || body.eventType === 'MEMBERSHIP') {
      fields.eventType = body.eventType;
    } else {
      errors.push('Ugyldig arrangementstype');
    }
  }

  if (!isMissing(body.maxRegistrations)) {
    const value = Number(body.maxRegistrations);
    if (!Number.isInteger(value) || value < 0) {
      errors.push('Maks antall påmeldinger må være et helt tall, 0 eller mer');
    } else {
      fields.maxRegistrations = value;
    }
  }

  for (const field of ['isDraft', 'isCancelled'] as const) {
    const value = body[field];
    if (value === undefined || value === null) continue;
    if (typeof value !== 'boolean') {
      errors.push(`Ugyldig verdi for ${field}`);
    } else {
      fields[field] = value;
    }
  }

  for (const field of EVENT_TIME_FIELDS) {
    const value = body[field];
    if (isMissing(value)) {
      if (isCreate) errors.push(`${TIME_LABELS[field]} må fylles ut`);
      continue;
    }
    const date =
      typeof value === 'string' || typeof value === 'number'
        ? new Date(value)
        : new Date(NaN);
    if (Number.isNaN(date.getTime())) {
      errors.push(`${TIME_LABELS[field]} er ikke en gyldig dato`);
    } else {
      fields[field] = date;
    }
  }

  // A data URL is a newly picked file
  let image: ImageChange = { kind: 'keep' };
  if (body.image === null) {
    image = { kind: 'clear' };
  } else if (typeof body.image === 'string' && body.image.startsWith('data:')) {
    if (!IMAGE_DATA_URL.test(body.image)) {
      errors.push('Bildet må være PNG, JPG, WebP, GIF eller AVIF');
    } else {
      try {
        image = { kind: 'upload', blob: base64ToBlob(body.image) };
      } catch {
        errors.push('Bildet kunne ikke leses');
      }
    }
  } else if (body.image !== undefined && typeof body.image !== 'string') {
    errors.push('Bildet er ugyldig');
  }

  return { fields, image, errors };
}

// Checks that the four times make sense together
export function checkEventTimes(times: EventTimes): string[] {
  const errors: string[] = [];
  if (times.endTime <= times.startTime) {
    errors.push('Sluttid må være etter starttid');
  }
  if (times.registrationDeadline > times.endTime) {
    errors.push(
      'Registreringsfristen kan ikke være etter at arrangementet er slutt'
    );
  }
  if (times.cancellationDeadline > times.endTime) {
    errors.push(
      'Avmeldingsfristen kan ikke være etter at arrangementet er slutt'
    );
  }
  return errors;
}

// The 400 response for a body that failed validation.
export const validationMessage = (errors: string[]) => errors.join('. ') + '.';
