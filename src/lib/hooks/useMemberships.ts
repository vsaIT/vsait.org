import useSWR from 'swr';
import { fetcher } from '../utils';
import { Membership } from '@prisma/client';

export function useMemberships() {
  const { data, error, isLoading } = useSWR<Membership[]>(
    `/api/memberships`,
    fetcher
  );

  return {
    memberships: data,
    isLoading,
    isError: error,
  };
}
