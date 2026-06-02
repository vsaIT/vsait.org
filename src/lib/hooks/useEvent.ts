import { MultipleEventType, SingleEventType } from '@/types';
import useSWR from 'swr';
import { fetcher } from '../utils';

export function useEvent(id: string) {
  const { data, error, isLoading } = useSWR<SingleEventType>(
    `/api/events/${id}`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}

export function useEvents(query: string = '') {
  const { data, error, isLoading } = useSWR<MultipleEventType>(
    `/api/events?${query}`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}

export type ArchivedEvent = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  startTime: string;
  location: string;
  eventType: 'OPEN' | 'MEMBERSHIP';
};

export function useEventArchive() {
  const { data, error, isLoading } = useSWR<{ events: ArchivedEvent[] }>(
    '/api/events/archive',
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
