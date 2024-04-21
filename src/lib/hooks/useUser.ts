import { UserType } from '@/types';
import useSWR from 'swr';
import { fetcher } from '../utils';

export function useUser(id: string | undefined) {
  const { data, error, isLoading } = useSWR<UserType>(
    `/api/user/${id}`,
    fetcher,
    { refreshInterval: 1000 * 60 * 10 } // 10 minutes
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
