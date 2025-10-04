import useSWR from 'swr';
import { fetcher } from '../utils';
import { EventType, MultipleEventType, SingleEventType } from '@/types';

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
