import useSWR from 'swr';
import { fetcher } from '../utils';
import { MembershipType } from '@/types';

export function useMemberships() {
  const { data, error, isLoading } = useSWR<MembershipType[]>(
    `/api/memberships`,
    fetcher
  );

  return {
    memberships: data,
    isLoading,
    isError: error,
  };
}
