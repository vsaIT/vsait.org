import { ApiResponseType } from '@/types';

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const json = await response.json();
  return json;
};

export const postFetcher = async (
  url: string,
  data: unknown
): Promise<ApiResponseType> => {
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

export const putFetcher = async (
  url: string,
  data: unknown
): Promise<ApiResponseType> => {
  const response = await fetch(url, {
    method: 'PUT',
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
