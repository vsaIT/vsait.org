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
  endTime: string;
  location: string;
  eventType: 'OPEN' | 'MEMBERSHIP';
  maxRegistrations: number;
  registrations: number;
  sourceId: number | null;
};

export type ArchiveListResponse = {
  events: ArchivedEvent[];
  page: number;
  pages: number;
};

// Paginated list of past events from the archive.
export function useEventArchive(query: string = '') {
  const { data, error, isLoading, mutate } = useSWR<ArchiveListResponse>(
    `/api/events/archive?${query}`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}

// A single archived past event, for its detail page.
export function useEventArchiveItem(id: string) {
  const { data, error, isLoading, mutate } = useSWR<{ event: ArchivedEvent }>(
    id ? `/api/events/archive/${id}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}
