'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, createStore } from 'jotai';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();
const store = createStore();

export default function Providers({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Provider store={store}>
      <SessionProvider refetchInterval={5 * 60}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </Provider>
  );
}
