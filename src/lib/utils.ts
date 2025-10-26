import { ApiResponseType } from '@/types';

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const json = await response.json();
  return json;
};

export const postFetcher = async <T>(
  url: string,
  data: unknown
): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};

export async function putFetcher<T>(url: string, data: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json: T = await response.json();
  if (!response.ok) {
    throw new Error((json as ApiResponseType).message);
  }
  return json;
}

export async function deleteFetcher(url: string): Promise<ApiResponseType> {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json: ApiResponseType = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
}

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

export function exclude<T>(obj: T | null, keys: string[]) {
  if (!obj) return null;
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  );
}

/**
 * Converts an ISO datetime string to a 'YYYY-MM-DDTHH:MM' string
 * in the 'Europe/Oslo' timezone.
 * @param {Date} date - The input ISO datetime string (e.g., '2018-06-12T17:30:00.000Z').
 * @returns {string} The formatted datetime string (e.g., '2018-06-12T19:30').
 */
export function isoToOsloTimestring(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23', // Use 24-hour format
    timeZone: 'Europe/Oslo',
  };

  // Use a Norwegian locale ('no-NO') for ISO-like date order (dd.mm.yyyy)
  // The goal is an ISO-like output, so we need to process the locale-specific parts
  const formattedString = new Intl.DateTimeFormat('sv-SE', options).format(
    date
  );

  // The 'sv-SE' (Swedish) locale is used as it produces a format close to
  // 'YYYY-MM-DD HH:MM', which we can then easily adapt.
  // Example: '2018-06-12 19:30' -> '2018-06-12T19:30'
  return formattedString.replace(' ', 'T');
}

/**
 * Converts a datetime string from the 'Europe/Oslo' timezone to a UTC ISO string.
 * @param osloTimeString - A datetime string in the format 'YYYY-MM-DDTHH:MM' representing time in the 'Europe/Oslo' timezone.
 * @returns The corresponding UTC ISO string.
 */
export function osloTimeStringToUtcIso(osloTimeString: string) {
  console.log(osloTimeString);
  const date = new Date(osloTimeString + ':00+02:00'); // Adding seconds and timezone offset for Oslo (CET/CEST)
  console.log(date.toISOString());
  return date.toISOString();
}
