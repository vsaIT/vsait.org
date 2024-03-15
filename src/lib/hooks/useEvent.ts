import useSWR from 'swr';
import { fetcher } from '../utils';
import { EventType } from '@/types';

export function useEvent(id: string) {
  const { data, error, isLoading } = useSWR<EventType>(
    `/api/events/${id}`,
    fetcher
  );

  return {
    event: data,
    isLoading,
    isError: error,
  };
}
