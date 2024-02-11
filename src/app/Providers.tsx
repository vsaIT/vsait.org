"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient();

export default function Providers({ children }: { children: JSX.Element | JSX.Element[]}) {
    return (
        <SessionProvider refetchInterval={5 * 60}>
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}